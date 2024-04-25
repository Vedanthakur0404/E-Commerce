import json
import uuid
import pymongo
import uuid
from model import customer

client = pymongo.MongoClient('mongodb://localhost:27017')
db = client['DummyProducts']
collection = db['products']
collection_customer = db['custombers']
collection_cart = db['cart']
collection_orders = db['orders']


from pymongo.errors import DuplicateKeyError



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
        data = {"products":products[start:], "maxlength":maxlength, "brands":all_categories, "category":categories_list}

        return data
    # all_categories = get_all_brands_from_db(products[start:end])

    return {"products": products[start: end], "maxlength": maxlength, "brands":all_categories,  "category":categories_list}

def get_product_by_id_from_db(id):
    product = collection.find_one({'id': id})
    data = product
   
    return data


def add_customer_from_db(userData):
    id = str(uuid.uuid4())
    collection_customer.create_index([("email", 1)], unique=True)
    try:
        collection_customer.insert_one({"email":userData.email, "password":userData.password, "id":id})
        return userData
    except DuplicateKeyError:
        #print("Error: Email already exists")
        return None



def get_user_from_db(userData):
    ans = collection_customer.find_one({'email':userData.email, 'password':userData.password})
    return ans

def insert_address_in_db(user_id, address):
    address.address_id = str(uuid.uuid4())
    address_dict = address.dict()
    collection_customer.update_one({"id": user_id},
            {"$addToSet": {"address": address_dict}}
            ,upsert=True
            )
    addressSet = collection_customer.find_one({"id": user_id}, {'address':1, '_id':0})
    print(addressSet)
    return address

def get_address_from_db(user_id):
    addressSet = collection_customer.find_one({"id": user_id}, {'address':1, '_id':0})
    return addressSet

def insert_product_in_cart(user_id, product_id):
    product = get_product_by_id_from_db(product_id)
    # print(['99999999999999', product])
    data = collection_cart.find_one({'user_id' : user_id})
    # data = 90
    if data == None:
        # print("ooooooooooooo")
        cart = [product]
        # print(product)
        collection_cart.insert_one({'user_id':user_id, 'cart':cart})
    else:
        result = collection_cart.update_one(
            {"user_id": user_id},
            {"$push": {"cart": product}}
            
        )

    return "Done"

def get_product_from_cart(user_id):
    ans =  collection_cart.find_one({'user_id':user_id})
    # print(ans)
    return ans["cart"]

def remove_product_in_cart(user_id, prod_id):
    collection_cart.update_one(
         {"user_id": user_id},
    {"$pull": {"cart": {"id": prod_id}}}
    )
    return get_product_from_cart(user_id)

def empty_product_in_cart(user_id):
    collection_cart.update_one({"user_id":user_id},{
        "$set": { "cart": [] } })
    
def get_cart_length_from_db(user_id):
    result = list(collection_cart.aggregate( [
    {"$match": {"user_id":user_id}},  # Match the document(s) based on criteria
    {"$project": {"array_length": {"$size": "$cart"}}}  # Calculate the length of the array field
    ]))
    return result[0]["array_length"]
    

def insert_order_in_DB(orders):
    orders = orders.dict()
    collection_orders.insert_one(orders)
    empty_product_in_cart(orders['user_id'])
    return 'done'
    