import asyncio
import time
import openai
from openai import OpenAI
from .config.config import OPENAI_MODEL_NAME, MAX_TOKENS, TEMPERATURE, INDEX_K
from .prompt_repo import rag, get_prompts, get_sub_topics_prompt
import os


async def run_prompt(vectorstore, prompt, key):
    openai.api_key = os.getenv("OPENAI_API_KEY")
    docs = await vectorstore.asimilarity_search(prompt, k=INDEX_K)
    context = "".join(doc.page_content for doc in docs)

    full_prompt = rag.format(context=context, question=prompt)

    client = OpenAI()
    
    try:
        response = await client.chat.completions.create(
            model=OPENAI_MODEL_NAME,
            temperature=TEMPERATURE,
            messages=[
                {"role": "system", "content": "You're a very helpful assistant"},
                {"role": "user", "content": full_prompt},
            ],
        )
        return key, response.choices[0].message.content.replace("\n", "")
    except Exception as e:
        print(f"Error in OpenAI API call: {e}")
        return key, "Error"


# Runs the chain of prompts on the given tool
# phase: 1 = Sub-Topics, 2 = Categories, 3 = Info Loop
async def run_chain_on(tool, vectorstore, phase, categories=""):
    start = time.perf_counter()
    if phase == 1:
        prompts = get_sub_topics_prompt(tool)
    elif phase == 2:
        prompts = get_prompts(tool)
    else:
        prompts = get_prompts(tool)

    try:
        tasks = [run_prompt(vectorstore, prompt, key) for key, prompt in prompts]
        responses = await asyncio.gather(*tasks)

        # result = {MAIN_COLUMN: tool}
        # for key, value in responses:
        #     result[key] = value

        print("LLM a-calls took: %s seconds", time.perf_counter() - start)
        return responses
    except Exception as e:
        print("Error in run_chain_on: %s", e)
        # return {MAIN_COLUMN: tool, "Error": str(e)}
