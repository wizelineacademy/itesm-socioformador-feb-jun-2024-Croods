import re
import aiohttp
from bs4 import BeautifulSoup
from langchain.docstore.document import Document
from typing import List, Any
import asyncio
from .config.config import SCRAPE_TIMEOUT

async def fetch(url, session):
    try:
        async with session.get(url, timeout=aiohttp.ClientTimeout(total=SCRAPE_TIMEOUT), ssl=False) as response:
            html = await response.text()
            return Document(page_content=html, metadata={"source": url})
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return None

async def scrape_links_to_documents(links: List[str]) -> List[Any]:
    if not links:
        raise Exception("No links to scrape.")
    
    async with aiohttp.ClientSession() as session:
        tasks = [fetch(url, session) for url in links]
        html_docs = await asyncio.gather(*tasks)

    return [process_document(doc) for doc in html_docs if doc and doc.page_content]

def process_document(doc):
    print(f"Parsing {doc.metadata['source']}")
    soup = BeautifulSoup(doc.page_content, "html.parser")
    clean_text = clean_html_text(soup)
    metadata = update_metadata(soup, doc.metadata)
    return Document(page_content=clean_text, metadata=metadata)

def clean_html_text(soup):
    text = soup.get_text(separator="\n", strip=True)
    return re.sub(r"\n{3,}|\s{2,}", "\n", text)

def update_metadata(soup, metadata):
    title = soup.find("title").get_text() if soup.find("title") else None
    description = soup.find("meta", attrs={"name": "description"}).get("content", "No description found.") if soup.find("meta", attrs={"name": "description"}) else None
    language = soup.find("html").get("lang", "No language found.") if soup.find("html") else None
    metadata.update({"title": title, "description": description, "language": language})
    return metadata