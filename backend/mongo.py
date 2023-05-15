"""
Code related to MongoDB connection
"""
from pymongo import MongoClient
import yaml

class Mongo:
    def __init__(self):
        filepath_params = "config.yaml"
        with open(filepath_params, "r") as f:
            self.dict_params = yaml.safe_load(f)
            
    def connect(self):
        self.client = MongoClient(self.dict_params["DATABASES"]["mongo"]["MONGODB_CONNECTION_STRING"])
        self.db = self.client["mimic"]
        
    def disconnect(self):
        if self.client:
            self.client.close()
            self.client = None
            self.db = None
            
    def get_database(self, dbname):
        return self.client[dbname]
    
    def insert_documents(self, collection, item, many=True):
        if many:
            collection.insert_many(item)
        else:
            collection.insert_one(item)