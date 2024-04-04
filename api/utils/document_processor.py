from langchain.text_splitter import RecursiveCharacterTextSplitter

def resize_documents(documents, chunk_size, overlap):

    splitter = RecursiveCharacterTextSplitter(
        separators=["\n", "\n", " ", ""],
        chunk_size=chunk_size,
        chunk_overlap=overlap,
        length_function=len,
    )
    return splitter.split_documents(documents)

async def create_vectorstore(index, embeddings, docs):
    vi = await index.afrom_documents(docs, embeddings)
    return vi