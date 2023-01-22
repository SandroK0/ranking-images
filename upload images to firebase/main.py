import os
import pandas as pd
import firebase_admin
from firebase_admin import credentials,firestore


ROOT_PATH = f'{os.getcwd()}'
DEFAULT_FILE = f"{ROOT_PATH}/URLS.txt"

cred = credentials.Certificate(f"{ROOT_PATH}/ranking-724f7-firebase-adminsdk-tk5ro-aa9c28cd5d.json")
app = firebase_admin.initialize_app(cred)

db = firestore.client()

doc_ref = db.collection("images").document("2")
doc_ref.set({
    'test':'test',
})

def upload(id, url):
    doc_ref = db.collection("images").document(f"{id}")
    doc_ref.set({
        'url': f'{url}',
        'rating' : 800,
    })

def main():
    f = open(DEFAULT_FILE, 'r')
    id = 0
    for url in f:
        upload(id, url)
        id+=1

main()