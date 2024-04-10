import boto3
import os
from dotenv import load_dotenv

def load_secrets():
    try:
        session = boto3.session.Session()
        client = session.client(service_name=os.environ["AWS_REGION"])
        os.environ["OPENAI_API_KEY"] = client.get_secret_value(
            SecretId="OPENAI_API_KEY"
        )["SecretString"]
        os.environ["SERPER_API_KEY"] = client.get_secret_value(
            SecretId="SERPER_API_KEY"
        )["SecretString"]
        print("Retrieved secrets from AWS Secrets Manager")
    except Exception as e:
        load_dotenv(".env")
        print("Loaded .env due to exception: %s", e)
        