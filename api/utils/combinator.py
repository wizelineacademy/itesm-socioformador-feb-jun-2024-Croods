from .web_scraper import scrape_links_to_documents
from .document_processor import resize_documents, create_vectorstore
from .openai_interaction import run_chain_on
from .google_serper import get_relevant_links
from langchain_community.vectorstores import faiss
from openai import OpenAI
from .config.config import CHUNK_SIZE, CHUNK_OVERLAP, LINK_SEARCH_PROVIDER

from sentence_transformers import SentenceTransformer, util

from .url_scraper import ddg_url_search

# Returns final results
async def getResults(givenTopic):
	# LAYER 1 --> Get sub-topic list
	relevantSubTopics = await getTopicSubTopics(givenTopic)

	# LAYER 2 --> Categories List

	# LAYER 3 --> Info loop for each result
 
	return {
		"subTopics": relevantSubTopics
	}


# PHASE 1: Scrape and find top tools of the given topic
# Returns: List[str] of names of top tools
async def getTopicSubTopics(givenTopic):
	# Get relevant links
	if (LINK_SEARCH_PROVIDER == 0):
		links = await ddg_url_search(givenTopic)
	else:
		links = set(get_relevant_links(givenTopic))

	# Get raw information from the links provided
	raw_documents = await scrape_links_to_documents(list(links))

	# Get the documents in chunks from the information provided
	documents = await resize_documents(raw_documents, CHUNK_SIZE, CHUNK_OVERLAP)
 
	# embeddings = OpenAIEmbeddings()
	# vectorstore = await create_vectorstore(faiss.FAISS, embeddings, documents)

	# response = await run_chain_on(givenTopic, vectorstore, 1)
 
	return {
		"links": links,
		"raw_documents": raw_documents,
		"documents": documents
	}


# PHASE 2: Get the categories of the given tool
# Returns: List[str] of categories to search for
async def getCategories(tool, vectorstore):
	return ["Foundation Models", "Cloud Services", "Mashup Tools", "Applications", "Data and Integration Services", "Infrastructure"]


# PHASE 3: Get the information loop for the given tool
# Returns: [{}]
async def getToolsInfo(tools, categories):
	toolsInfo = []
	
	for tool in tools:
		# Get relevant links
		if (LINK_SEARCH_PROVIDER == 0):
			links = await ddg_url_search(tool)
		else:
			links = set(get_relevant_links(tool))


		# Get raw information from the links provided
		raw_documents = await scrape_links_to_documents(list(links))

		# Get the documents in chunks from the information provided
		documents = await resize_documents(raw_documents, CHUNK_SIZE, CHUNK_OVERLAP)

		# embeddings = OpenAIEmbeddings()
		# vectorstore = await create_vectorstore(faiss.FAISS, embeddings, documents)

		# response = await run_chain_on(givenTopic, vectorstore, 3, categories)
		# toolsInfo.append(response)
		pass

	return toolsInfo