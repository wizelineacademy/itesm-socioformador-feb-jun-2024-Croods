FROM python:3.9-slim-buster

WORKDIR /knowapi

COPY requirements.txt .

RUN pip3 install -r requirements.txt

COPY . .

CMD ["uvicorn", "app:app", "--reload", "--host", "0.0.0.0", "--port", "5000"]

EXPOSE 5000