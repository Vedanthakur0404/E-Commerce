import json
import uuid
import pymongo

client = pymongo.MongoClient('mongodb://localhost:27017')
db = client['DummyProducts']
collection = db['products']


def save_all_dummy_data_to_db(arr):
    for i in arr:
        i['_id'] = str(uuid.uuid4())
        print(i)
        collection.insert_one(i)
    
    return arr

def get_all_categories_from_db():
    categories = set()
    products = collection.find({})
    for i in products:
        categories.add(i["brand"])
    category_design = []
    for i in categories:
        value = "value"
        label = "label"
        checked = "checked"
        category_map = {value:i, label:i, checked:False}
        category_design.append(category_map)
    return (category_design)

def get_all_dummy_data_from_db():
    arr = []
    dummy_products = collection.find({})
    for i in dummy_products:
        arr.append(i)
    return arr

def get_by_categories_from_db(categories_list):
    print(categories_list)
    products = []
    for i in categories_list:
        product_from_cat = collection.find({'category' : i})
        for j in product_from_cat:
            products.append(j)
    return products
        