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

app = Flask(__name__)

os.environ.setdefault("GCLOUD_PROJECT", "happytrails-bb859")

cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)

db = firestore.Client()

'''
def create_user(u, e, p):
    username = u
    email = e
    password = p

    if not username or not email or not password:
        print("empty field")
        return  # jsonify({"error": "empty field"}), 400
    
    individual_ratings = {f'A{i}': round(random.uniform(0, 5), 1) for i in range(1, 25)}

    user_ref = db.collection('users').document(username)
    user_ref.set({
        'username': username,
        'email': email,
        'password': password,
        **individual_ratings,  # Unpack individual ratings
        # **cluster_ratings      # Unpack cluster ratings
    })

    print("Added user")

    return  # jsonify({"success": "created user"}), 201
'''

def create_user(u, e, p):
    username = u
    email = e
    password = p

    if not username or not email or not password:
        print("empty field")
        return  # Return in case of any empty field

    uid = str(random.randint(100000, 999999))  # Generate a random uid (or use another method to create unique uids)

    # Create document in the 'users' collection
    user_ref = db.collection('users').document(uid)
    user_ref.set({
        'uid': uid,
        'username': username,
        'email': email,
        'password': password,  # In practice, don't store passwords in plaintext!
        'instagram': f'{username}_insta',  # Example field for Instagram
        'name': username.capitalize()
    })

    # Create document in the 'rankings' collection
    individual_ratings = {str(i): round(random.uniform(0, 5), 1) for i in range(24)}

    rankings_ref = db.collection('rankings').document(uid)
    rankings_ref.set({
        **individual_ratings  # Add the 24 attributes (0 through 23)
    })

    print(f"Added user {username} with uid {uid}")

    return  # Return success response if needed
'''
names = [
    "rachit", "mihir", "aastha", "niko",
    "rohit", "priya", "karan", "sara",
    "anjali", "deepak", "neha", "aman",
    "siddharth", "isha", "varun", "tina",
    "ankit", "simran", "shubham", "ravi",
    "divya", "abhishek", "pallavi", "akshay",
    "kavita", "raj", "nisha", "vijay",
    "komal", "anil", "pooja", "lata"
]
'''
'''
def create_multiple_users():
    for name in names:
        db.collection('users').document(name).delete()  # Delete existing document
    for name in names:
        username = name
        email = f"{name}e"
        password = f"{name}p"
        user_ref = db.collection('users').document(name)
        create_user(username, email, password)
'''
'''
def create_multiple_users():
    for name in names:
        db.collection('users').document(name).delete()  
        db.collection('rankings').document(name).delete() 

    for name in names:
        username = name
        email = f"{name}@example.com"
        password = f"{name}p"
        create_user(username, email, password)

create_multiple_users()
'''
'''
def get_buddies(username):
    users_ref = db.collection('users')
    users = users_ref.stream()

    user_data = {}
    all_users = []

    for user in users:
        data = user.to_dict()
        print(data)
        if 'username' in data:
            user_data[data['username']] = {
                'clusters': [data['C1'], data['C2'], data['C3'], data['C4'], data['C5']],
                'attributes': [data.get(f'A{i}', 0) for i in range(1, 25)]  # A1 through A24
            }
            all_users.append(data['username'])

    print(all_users)
    print(user_data)

    if username not in user_data:
        print("User not found.")
        return # jsonify({"error": "User not found"}), 404

    user_vector = user_data[username]['attributes']

    attribute_matrix = np.array([user_data[user]['attributes'] for user in all_users])
    knn_attributes = NearestNeighbors(n_neighbors=10).fit(attribute_matrix)
    _, indices = knn_attributes.kneighbors([user_vector])

    attribute_neighbors = [all_users[i] for i in indices[0] if all_users[i] != username]

    unique_neighbors = set(attribute_neighbors) # | set(cluster_neighbors)

    print(list(unique_neighbors))

    return 
'''

def get_buddies(username):
    users_ref = db.collection('users')
    users = users_ref.stream()

    user_data = {}
    all_users = []

    uid_to_username = {}

    for user in users:
        data = user.to_dict()
        uid = user.id
        if 'username' in data:
            uid_to_username[uid] = data['username']
            if data['username'] == username:
                target_uid = uid

    if not uid_to_username.get(target_uid, None):
        print("User not found.")
        return []

    rankings_ref = db.collection('rankings')
    rankings = rankings_ref.stream()

    for ranking in rankings:
        data = ranking.to_dict()
        uid = ranking.id
        user_data[uid] = [data.get(str(i), 0) for i in range(24)]  

    if target_uid not in user_data:
        print("User rankings not found.")
        return []

    target_vector = user_data[target_uid]
    attribute_matrix = np.array([user_data[uid] for uid in uid_to_username if uid != target_uid])
    uid_list = [uid for uid in uid_to_username if uid != target_uid]

    knn_attributes = NearestNeighbors(n_neighbors=10).fit(attribute_matrix)
    _, indices = knn_attributes.kneighbors([target_vector])

    closest_neighbors = []

    for i in indices[0]:
        neighbor_uid = uid_list[i]
        neighbor_username = uid_to_username[neighbor_uid]
        neighbor_vector = user_data[neighbor_uid]

        differences = np.abs(np.array(target_vector) - np.array(neighbor_vector))
        most_similar_idx = np.argsort(differences)[:2] 

        closest_neighbors.append([
            neighbor_uid,
            neighbor_username,
            most_similar_idx[0],  
            most_similar_idx[1]   
        ])

    print(closest_neighbors)
    return closest_neighbors

get_buddies("rachit")