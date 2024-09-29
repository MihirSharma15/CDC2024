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

import random
import string

def generate_random_password(length=10):
    characters = string.ascii_letters + string.digits + string.punctuation
    return ''.join(random.choice(characters) for _ in range(length))

def generate_random_uid():
    return ''.join(random.choice(string.digits) for _ in range(8))

def create_user(first_name, last_name, ratings):
    username = f"{first_name.lower()}{last_name.lower()}"
    email = f"{username}@gmail.com"
    password = generate_random_password()
    uid = generate_random_uid()

    # Check if username or uid exists in Firestore (ensure uniqueness)
    user_ref = db.collection('users').where('username', '==', username).stream()
    if any(user_ref):
        print(f"Username {username} already exists. Skipping user.")
        return

    user_uid_ref = db.collection('users').document(uid).get()
    if user_uid_ref.exists:
        print(f"UID {uid} already exists. Skipping user.")
        return

    # Add user document to Firestore
    db.collection('users').document(uid).set({
        'uid': uid,
        'username': username,
        'email': email,
        'password': password,
        'instagram': f'@{username}',
        'name': first_name.capitalize()
    })

    # Add individual ratings to Firestore under 'rankings'
    db.collection('rankings').document(uid).set({
        **ratings
    })

    return

def create_multiple_users(names):
    for name in names:
        username = name
        email = f"{name}@example.com"
        password = f"{name}p"
        create_user(username, email, password)

# create_multiple_users()

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

def get_buddies(uid):
    users_ref = db.collection('users')
    users = users_ref.stream()

    user_data = {}
    uid_to_username = {}

    # Map UID to username
    for user in users:
        data = user.to_dict()
        current_uid = user.id
        if 'username' in data:
            uid_to_username[current_uid] = data['username']

    # Check if the target UID exists
    if uid not in uid_to_username:
        print("User not found.")
        return []

    # Fetch user rankings
    rankings_ref = db.collection('rankings')
    rankings = rankings_ref.stream()

    # Store rankings in user_data
    for ranking in rankings:
        data = ranking.to_dict()
        current_uid = ranking.id
        user_data[current_uid] = [data.get(str(i), 0) for i in range(24)]  

    # Ensure the target user has rankings
    if uid not in user_data:
        print("User rankings not found.")
        return []

    # Prepare target user's ranking vector
    target_vector = user_data[uid]

    # Build attribute matrix, skipping users with missing rankings
    attribute_matrix = np.array([user_data[other_uid] for other_uid in uid_to_username if other_uid != uid and other_uid in user_data])
    uid_list = [other_uid for other_uid in uid_to_username if other_uid != uid and other_uid in user_data]

    # Use NearestNeighbors to find 10 closest neighbors
    knn_attributes = NearestNeighbors(n_neighbors=10).fit(attribute_matrix)
    _, indices = knn_attributes.kneighbors([target_vector])

    # Retrieve closest neighbors and their most similar attributes
    closest_neighbors = []
    for i in indices[0]:
        neighbor_uid = uid_list[i]
        neighbor_username = uid_to_username[neighbor_uid]
        neighbor_vector = user_data[neighbor_uid]

        differences = np.abs(np.array(target_vector) - np.array(neighbor_vector))
        most_similar_idx = np.argsort(differences)[:2]  # Get two most similar attributes

        closest_neighbors.append([
            neighbor_uid,
            neighbor_username,
            int(most_similar_idx[0]),  
            int(most_similar_idx[1])   
        ])

    print(closest_neighbors)
    return closest_neighbors

get_buddies("00970189")