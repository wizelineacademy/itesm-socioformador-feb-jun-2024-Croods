OPENAI_MODEL_NAME = "TheBloke/Mistral-7B-v0.1-GGUF/mistral-7b-v0.1.Q5_K_M.gguf"
MAX_TOKENS = 1500
TEMPERATURE = 0.7

CHUNK_SIZE = 400
CHUNK_OVERLAP = 50
INDEX_K = 10

NUM_GEN_LINKS = 10
SCRAPE_TIMEOUT = 5
LINK_SEARCH_PROVIDER = 0 # 0: DuckDuckGo, 1: Serper (Google)
PROHIBITED_LINKS = [
  r"youtube\.com",
  r"wikipedia\.org"
]
