from .web_scraper import scrape_links_to_documents
from .document_processor import resize_documents, create_vectorstore
from .openai_interaction import run_chain_on, run_plx, get_features
from .google_serper import get_relevant_links
from langchain_community.vectorstores import faiss
from langchain_openai.embeddings import OpenAIEmbeddings
from openai import OpenAI
from .config.config import CHUNK_SIZE, CHUNK_OVERLAP, LINK_SEARCH_PROVIDER

from .url_scraper import ddg_url_search

# Returns final results
async def getDevResults(givenTopic):
	# LAYER 1 --> Get sub-topic list
	relevantSubTopics = await getTopicSubTopics(givenTopic)

	# LAYER 2 --> Categories List
	
	topicFeatures = await getFeatures(givenTopic)
	print(topicFeatures)

	# LAYER 3 --> Info loop for each result
	# finalAnswer = await getToolsInfo(relevantSubTopics['response'][0], "Price, Content Type, Devices")
	# finalAnswer = await run_plx(givenTopic, relevantSubTopics, "Description, Price, Ai Category, Licence type, Enterprise Category")

	finalAnswer = await run_plx(givenTopic, relevantSubTopics, topicFeatures)
 
	return {
		"subTopics": relevantSubTopics,
		"finalAnswer": finalAnswer
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
 
	embeddings = OpenAIEmbeddings(disallowed_special=())
	vectorstore = await create_vectorstore(faiss.FAISS, embeddings, documents)

	response = await run_chain_on(givenTopic, vectorstore, 1)
 
	return response[0]


# PHASE 2: Get the categories of the given tool
# Returns: List[str] of categories to search for
async def getCategories(tool):
	return ["Foundation Models", "Cloud Services", "Mashup Tools", "Applications", "Data and Integration Services", "Infrastructure"]

async def getFeatures(givenTopic):
	features = await get_features(givenTopic)
	return features


# PHASE 3: Get the information loop for the given tool with OpenAI
# Returns: [{}]
async def getToolsInfoWithOpenAI(tools, categories):
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

		embeddings = OpenAIEmbeddings()
		vectorstore = await create_vectorstore(faiss.FAISS, embeddings, documents)

		response = await run_chain_on(tool, vectorstore, 3, categories)
		toolsInfo.append(response)

	return toolsInfo


# PHASE 3: Get the information loop for the given tool with Perplexity
async def getToolsInfoWithPlx(givenTopic, tools, categories):
	finalAnswer = await run_plx(givenTopic, tools, categories)
	return finalAnswer