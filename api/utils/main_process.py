import asyncio
import json
import time
from web_scraper import scrape_links_to_documents
from document_processor import resize_documents #create_vectorstore
# from .openai_interaction import run_chain_on
from google_serper import get_relevant_links
# from langchain_openai import OpenAIEmbeddings
# from langchain.vectorstores import FAISS
import logging
from config.config import CHUNK_SIZE, CHUNK_OVERLAP

logger = logging.getLogger(__name__)


async def main_process(event):
    try:
        message = json.loads(event["Records"][0]["body"])["value"]
        print(f"Researching on: {message}")

        links = set(get_relevant_links(message))
        print(f"Relevant links found on Google: {len(links)}")

        raw_documents = await scrape_links_to_documents(list(links))
        print(f"Documents: {len(raw_documents)}")

        documents = resize_documents(raw_documents, CHUNK_SIZE, CHUNK_OVERLAP)
        print(f"Split documents: {len(documents)}")

        # embeddings = OpenAIEmbeddings(disallowed_special=())
        # vectorstore = await create_vectorstore(FAISS, embeddings, documents)
        # print("Vector store created")

        # response = await run_chain_on(message, vectorstore)
        # print(f"Response: {response}")

    except Exception as e:
        print(f"Error in main_process: {e}")
