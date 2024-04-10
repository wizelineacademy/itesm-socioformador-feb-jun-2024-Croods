import os
from langchain_community.utilities import GoogleSerperAPIWrapper
from .config.config import NUM_GEN_LINKS, NUM_NEWS_LINKS

def get_organic_links(search, query):
    organic_links = []
    results = search.results(query)
    for element in results.get("organic", []):
        site_links = element.get("sitelinks", [])
        for link in site_links:
            if "youtube.com" not in link.get("link", ""):
                organic_links.append(link["link"])
    return organic_links

def get_news_links(search, query):
    news_links = []
    results = search.results(query)
    for element in results.get("news", []):
        news_links.append(element.get("link"))
    return news_links

def get_relevant_links(tool_name: str) -> list[str]:
    """Executes a Google search to get relevant urls for the tool."""
    try:
        search = GoogleSerperAPIWrapper(k=NUM_GEN_LINKS)
        links = get_organic_links(search, f"{tool_name}")

        # search = GoogleSerperAPIWrapper(k=NUM_NEWS_LINKS, type="news")
        # links += get_news_links(search, f"What is {tool_name} AI?")

        return links
    except Exception as e:
        print(e)
        return []