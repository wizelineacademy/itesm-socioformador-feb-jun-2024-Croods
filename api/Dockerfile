FROM python:3.11-slim-bullseye

WORKDIR /knowapi

COPY requirements.txt .

RUN pip3 install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "app:app", "--reload", "--host", "0.0.0.0", "--port", "8000"]

EXPOSE 8000