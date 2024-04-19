from fastapi import FastAPI, Form
from dotenv import load_dotenv

from utils.combinator import getDevResults, getTopicSubTopics, getCategories, getToolsInfoWithPlx
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

app = FastAPI()

origins = [
  "http://localhost:3000"
]

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

@app.get("/")
def read_root():
  return {"Hello": "World"}

@app.post("/search/initial")
async def knowx_initial_search(topic: str = Form(...)):
  results = await getTopicSubTopics(topic)
  return results

@app.post("/search/categories")
async def knowx_categories_search(topic: str = Form(...)):
  results = await getCategories(topic)
  return results

@app.post("/search")
async def knowx_search(topic: str = Form(...), tools: list = Form(...), categories: list = Form(...)):
  results = await getToolsInfoWithPlx(topic, tools, categories)
  return results

@app.post("/dev/search")
async def knowx_search(topic: str = Form(...)):
  results = await getDevResults(topic)
  return results