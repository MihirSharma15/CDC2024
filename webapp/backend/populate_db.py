import csv
import firebase_admin
import requests
import numpy as np
import os
import random
from flask import Flask, render_template, request, redirect, url_for, jsonify
from google.cloud import firestore
from firebase_admin import credentials
from sklearn.neighbors import NearestNeighbors
import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
from sklearn.decomposition import PCA
import random
from app import create_user, create_multiple_users
import names

os.environ.setdefault("GCLOUD_PROJECT", "happytrails-bb859")

cred = credentials.Certificate("serviceAccountKey.json")

db = firestore.Client()

def delete_collection(collection_ref, batch_size=10):
    docs = collection_ref.limit(batch_size).stream()
    deleted = 0

    for doc in docs:
        doc.reference.delete()
        deleted += 1

    if deleted >= batch_size:
        return delete_collection(collection_ref, batch_size)

delete_collection(db.collection('users'))
delete_collection(db.collection('rankings'))

print("everything gone")

def generate_unique_name():
    first_name = names.get_first_name()
    last_name = names.get_last_name()
    return first_name, last_name

def create_users_from_csv(csv_file):
    with open(csv_file, mode='r') as file:
        reader = csv.reader(file)
        next(reader)  
        
        for row in reader:
            first_name, last_name = generate_unique_name()
            ratings = {str(i): float(row[i]) for i in range(24)}
            create_user(first_name, last_name, ratings)

create_users_from_csv('Social_Science_Dataset.csv')