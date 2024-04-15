import re
import time
import random
import aiohttp
import threading
from bs4 import BeautifulSoup
from langchain.docstore.document import Document
from typing import List, Any
import asyncio
from .config.config import SCRAPE_TIMEOUT

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys

import multiprocessing


# async def scrape_links_to_documents(links: List[str]) -> List[Any]:
#     if not links:
#         raise Exception("No links to scrape.")

#     chrome_options = Options()
#     chrome_options.add_argument("--headless")
#     chrome_options.timeouts = {"implicit": 3000, "pageLoad": 3000, "script": 3000}
#     # chrome_options.add_argument("--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3")
#     # chrome_options.add_argument("--disable-gpu")
#     # chrome_options.add_argument("--disable-software-rasterizer")
#     driver = webdriver.Chrome(options=chrome_options)
#     webdriver.

#     documents = []
#     for url in links:
#         print("PROCESSING URL:", url)
#         driver.get(url)
#         # mimic_human_behavior(driver)
#         html = driver.page_source
#         doc = process_document(html, url)
#         print ("DONE PROCESSING URL:", url)
#         if doc:
#             documents.append(doc)

#     driver.quit()
#     return documents

# # async def scrape_links_to_documents(links: List[str]) -> List[Any]:
# #     if not links:
# #         raise Exception("No links to scrape.")

# #     pool = multiprocessing.Pool()
# #     documents = pool.map(scrape_link, links)
# #     pool.close()
# #     pool.join()

# #     return [doc for doc in documents if doc]

# def scrape_link(url: str) -> Any:
#     chrome_options = Options()
#     chrome_options.add_argument("--headless")
#     driver = webdriver.Chrome(options=chrome_options)

#     print("PROCESSING URL:", url)
#     driver.get(url)
#     html = driver.page_source
#     doc = process_document(html, url)
#     driver.quit()
#     print ("DONE PROCESSING URL:", url)

#     return doc

# def mimic_human_behavior(driver):
#     actions = webdriver.ActionChains(driver)
#     actions.send_keys(Keys.SPACE)  # Simulate a keypress
#     actions.perform()
#     # random_sleep = random.randint(2, 5)  # Random delay between 2-5 seconds
#     # time.sleep(random_sleep)

# def process_document(html, url):
#     soup = BeautifulSoup(html, "html.parser")
#     clean_text = clean_html_text(soup)
#     metadata = update_metadata(soup, {"source": url})
#     return Document(page_content=clean_text, metadata=metadata)

# def clean_html_text(soup):
#     text = soup.get_text(separator="\n", strip=True)
#     return re.sub(r"\n{3,}|\s{2,}", "\n", text)

# def update_metadata(soup, metadata):
#     title = soup.find("title").get_text() if soup.find("title") else None
#     description = soup.find("meta", attrs={"name": "description"}).get("content", "No description found.") if soup.find("meta", attrs={"name": "description"}) else None
#     language = soup.find("html").get("lang", "No language found.") if soup.find("html") else None
#     metadata.update({"title": title, "description": description, "language": language})
#     return metadata

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