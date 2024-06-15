import re
from duckduckgo_search import AsyncDDGS
from .config.config import NUM_GEN_LINKS, PROHIBITED_LINKS

# Returns list of URLs from DuckDuckGo
async def ddg_url_search(topic):
  results = []

  # Use DuckDuckGo API to get results on the given topic (Returns: Dict['title', 'href', 'body'])
  ddgResults = AsyncDDGS(proxy=None).text(topic, max_results=NUM_GEN_LINKS)
  
  if len(ddgResults) != 0:
    # Clean up results, removing links in the prohibited list
    compiledLinks = [re.compile(pattern) for pattern in PROHIBITED_LINKS]

    results = [url['href'] for url in ddgResults if not any(pattern.search(url['href']) for pattern in compiledLinks)]
  
  return results
