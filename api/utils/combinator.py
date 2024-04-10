import asyncio
import json
import time
from .web_scraper import scrape_links_to_documents
from .document_processor import resize_documents, create_vectorstore
from .openai_interaction import run_chain_on
from .google_serper import get_relevant_links
# from langchain_openai import OpenAIEmbeddings
from langchain_mistralai import MistralAIEmbeddings
from langchain_community.vectorstores import faiss
# from langchain_community.embeddings import self_hosted_hugging_face
from langchain_community.embeddings import self_hosted, huggingface
import logging
from openai import OpenAI
from .config.config import CHUNK_SIZE, CHUNK_OVERLAP


async def getResults(givenTopic):
# try:
       # LAYER 1 --> Top Results
       links = set(get_relevant_links(givenTopic))
       raw_documents = await scrape_links_to_documents(list(links))
       documents = await resize_documents(raw_documents, CHUNK_SIZE, CHUNK_OVERLAP)
              # embeddings = OpenAIEmbeddings(disallowed_special=(), basePath="http://localhost:1234/v1")
              # embeddings = MistralAIEmbeddings(model="TheBloke/Mistral-7B-v0.1-GGUF/mistral-7b-v0.1.Q5_K_M.gguf")
              # client = huggingface.HuggingFaceEmbeddings
              # embeddings = self_hosted.SelfHostedEmbeddings(client=client, allow_dangerous_deserialization=True)
              # vectorstore = await create_vectorstore(faiss.FAISS, embeddings, documents)
              # vectorstore = await create_vectorstore(FAISS, embeddings, documents)
              # response = await run_chain_on(givenTopic, vectorstore)


              # LAYER 2 --> Categories List


              # LAYER 3 --> Info loop for each result
       # except:
       #        return {
       #             "error": "Something went wrong"  
       #        }



       return {
              "links": links,
              "raw_documents": raw_documents,
              "documents": documents
       }