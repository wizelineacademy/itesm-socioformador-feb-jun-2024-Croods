FROM python:3.11-slim-bullseye

WORKDIR /knowapi

COPY requirements.txt .

RUN pip3 install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "app:app", "--reload"]

EXPOSE 8000