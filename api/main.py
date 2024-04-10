from fastapi import FastAPI
from pydantic import BaseModel
import os
from dotenv import load_dotenv

from utils.combinator import getResults

load_dotenv()

app = FastAPI()

@app.get("/")
def read_root():
  return {"Hello": "World"}


class SearchTopic(BaseModel):
  topic: str

@app.post("/search")
async def knowx_search(topic: SearchTopic):
  results = await getResults(topic.topic)
  return results

# Start server with "uvicorn main:app --reload"