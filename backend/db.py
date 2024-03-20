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

def get_all_dummy_data_from_db(page):

    arr = []
    dummy_products = collection.find({})
    for i in dummy_products:
        arr.append(i)
    page = int(page)
    start = (page-1) * 10
    end = page * 10
    maxlength = len(arr)//10 
    if maxlength*10 != len(arr):
        maxlength += 1
    if len(arr) < end:
        return arr[start:], maxlength
    return arr[start: end], maxlength

def get_by_categories_from_db(categories_list, page):
    print(categories_list)
    products = []
    for i in categories_list:
        product_from_cat = collection.find({'category' : i})
        for j in product_from_cat:
            products.append(j)
    page = int(page)
    start = (page-1) * 10
    end = page * 10
    
    maxlength = len(products)//10 
    if maxlength*10 != len(products):
        maxlength += 1

    if len(products) < end:
        return products[start:], maxlength
    return products[start: end], maxlength

        