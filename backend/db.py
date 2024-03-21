import json
import uuid
import pymongo

client = pymongo.MongoClient('mongodb://localhost:27017')
db = client['DummyProducts']
collection = db['products']


def save_all_dummy_data_to_db(arr):
    for i in arr:
        i['_id'] = str(uuid.uuid4())
        collection.insert_one(i)
    
    return arr

def get_all_categories_from_db(products):
    categories = set()
    for i in products:
        categories.add(i["category"])
    category_design = []
    for i in categories:
        value = "value"
        label = "label"
        checked = "checked"
        category_map = {value:i, label:i, checked:False}
        category_design.append(category_map)
    return (category_design)

def get_all_brands_from_db(categories_list):
    categories = set()
    query = {
            'category': {'$in': categories_list},
        }
    all_products_by_given_categories = collection.find(query)
    for i in all_products_by_given_categories:
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
    all_categories = get_all_brands_from_db(arr)
    if len(arr) < end:
        data = {"arr":arr[start:], "maxlength":maxlength, "brands":all_categories}
        return data
    # all_categories = get_all_brands_from_db(arr[start:end])
    return {"products": arr[start: end], "maxlength": maxlength, "brands":all_categories}

def get_by_categories_from_db(categories_list, page, brands_list):

    products = []

    if len(brands_list) != 0:
        query = {
            'category': {'$in': categories_list},
            'brand': {'$in': brands_list}
        }
        result = collection.find(query)
    else:
        query = {
            'category': {'$in': categories_list}
        }
        result = collection.find(query)


    for j in result:
        products.append(j)
    page = int(page)
    start = (page-1) * 10
    end = page * 10
    
    maxlength = len(products)//10 
    if maxlength*10 != len(products):
        maxlength += 1
    all_categories = get_all_brands_from_db(categories_list)
    
    if len(products) < end:
        data = {"products":products[start:], "maxlength":maxlength, "brands":all_categories}

        return data
    # all_categories = get_all_brands_from_db(products[start:end])

    return {"products": products[start: end], "maxlength": maxlength, "brands":all_categories}

def get_product_by_id_from_db(id):
    product = collection.find_one({'id': id})
    data = product
   
    return data


        