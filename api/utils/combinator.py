import asyncio
import json
import time
from .web_scraper import scrape_links_to_documents
from .document_processor import resize_documents #create_vectorstore
# from openai_interaction import run_chain_on
from .google_serper import get_relevant_links
# from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
import logging
from .config.config import CHUNK_SIZE, CHUNK_OVERLAP


async def getResults(givenTopic):
       links = set(get_relevant_links(givenTopic))
       raw_documents = await scrape_links_to_documents(list(links))
       documents = resize_documents(raw_documents, CHUNK_SIZE, CHUNK_OVERLAP)

       return {
              "links": links,
              "raw_documents": raw_documents,
              "documents": documents
       }