from fastapi import FastAPI, Form
from pydantic import BaseModel
import os
from dotenv import load_dotenv

from utils.combinator import getResults
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

@app.post("/search")
async def knowx_search(topic: str = Form(...)):
  results = await getResults(topic)
  return results

# Start server with "uvicorn main:app --reload"