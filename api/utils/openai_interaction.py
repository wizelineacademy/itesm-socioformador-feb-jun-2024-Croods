import asyncio
import requests
import time
import openai
from openai import OpenAI
from .config.config import OPENAI_MODEL_NAME, MAX_TOKENS, TEMPERATURE, INDEX_K
from .prompt_repo import rag, get_prompts, get_sub_topics_prompt, get_final_categories_prompt, get_features_prompt
import os
import json

async def run_plx(initialPromt, objects, features):
    url = "https://api.perplexity.ai/chat/completions"

    payload = {
        "model": "sonar-medium-online",
        "messages": [
            {
                "role": "system",
                "content": "Be precise and concise. STRICTLY Return ONLY a dictionary with the GIVEN STRUCTURE."
            },
            {
                "role": "user",
                "content": f"""We are talking about the following objects: {objects}. Based on what each of them are in the context of '{initialPromt}', what they offer and the given information, please 
                            return a dictionary a description of the tool and the answers to following features for EACH of the objects: {features}. If description is not included, be sure to ALWAYS INCLUDE DESCRIPTION.
                            If no information is found on a category, retun "N/A" on that key.
                            ALWAYS RETURN NAME as a Category and be sure to include the name of the object as a value for the Categories key inside results.
                            Strictly return ONLY a dictionary with the following structure:""" + """

                            {
                                categories: [Name, "", "", ""],
                                results: [
                                    {
                                        Name: "",
                                        Description: "",
                                        Categories: [
                                            { Name: "Name", Value: "..." },
                                            { Name: "...", Value: "..." },
                                            { Name: "...", Value: "..." },
                                            ...
                                        ]
                                    }
                                ]
                            }
                            """
            }
        ]
    }

    headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "Authorization": "Bearer " + os.getenv("PERPLEXITY_API_KEY")
    }

    response = requests.post(url, json=payload, headers=headers)
    prev_response = response.json()['choices'][0]['message']['content'].replace("\n", "")

    print("Response from Perplexity: ", prev_response)

    try:
        finalAnswer = json.loads(prev_response)
        return finalAnswer
    except:
        print("Error in JSON parsing")
        return prev_response

async def run_prompt(vectorstore, prompt, key):
    openai.api_key = os.getenv("OPENAI_API_KEY")
    docs = await vectorstore.asimilarity_search(prompt, k=INDEX_K)
    context = "".join(doc.page_content for doc in docs)

    full_prompt = rag.format(context=context, question=prompt)

    client = OpenAI()
    
    try:
        response = client.chat.completions.create(
            model=OPENAI_MODEL_NAME,
            temperature=TEMPERATURE,
            messages=[
                {"role": "system", "content": "You're a very helpful assistant"},
                {"role": "user", "content": full_prompt},
            ],
        )
        return response.choices[0].message.content.replace("\n", "").split(",")
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
        prompts = get_final_categories_prompt(tool, categories)

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

async def run_simple_prompt(prompt):
    openai.api_key = os.getenv("OPENAI_API_KEY")
    client = OpenAI()
    try:
        response = client.chat.completions.create(
            model=OPENAI_MODEL_NAME,
            temperature=TEMPERATURE,
            messages=[
                {"role": "system", "content": "You're a very helpful assistant"},
                {"role": "user", "content": prompt},
            ],
        )
        return response.choices[0].message.content.replace("\n", "")
    except Exception as e:
        print(f"Error in OpenAI API call: {e}")
        return "Error"

async def get_features(givenTopic):
    prompt = get_features_prompt(givenTopic)
    context = prompt[0][0]
    question = prompt[0][1]
    features = await run_simple_prompt(question)
    return features
