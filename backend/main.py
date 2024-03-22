from typing import List
from fastapi import FastAPI
from fastapi import Query
from fastapi.middleware.cors import CORSMiddleware 
from db import (
    save_all_dummy_data_to_db,
    get_all_dummy_data_from_db,
    get_by_categories_from_db,
    get_product_by_id_from_db,
    add_customer_from_db,
    get_user_from_db
)
from model import customer

app = FastAPI()

origins = ['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)


# @app.post("/saveAllData")
# async def saveDummyData():
#     ans = dummy_data["products"]
#     data =  save_all_dummy_data_to_db(ans)
#     return {"done":data}

# @app.get("/getAllCategories")
# async def get_all_categories():
#     response = get_all_categories_from_db()
#     return response

@app.get('/getalldata')
def getDummyData(page):
    response, maxlength  = get_all_dummy_data_from_db(page)
    return {"data":response, "maxlength" : maxlength}

@app.get('/getProduct/{id}')
def getProductById(id):
    id = int(id)
    response = get_product_by_id_from_db(id)
    print(response)
    return response

@app.post('/getCategories')
async def get_by_categories(page:str , categories:str | None = None, brands:str | None = None  ):
    print(page, categories, brands)
    if categories == None or categories == "" or categories == " ": 
        response= get_all_dummy_data_from_db(page=page)
    else:
        categories_list = categories.split(",")
        brands_list = []
        if(brands != None and brands != "" and brands != " " and brands != 'undefined'):
            brands_list = brands.split(",")
        response = get_by_categories_from_db(categories_list, page, brands_list)
    return response

@app.post('/users')
async def add_customer(userData:customer):
    print("okk", userData)
    response = add_customer_from_db(userData)
    if response:
        return {'data':response, 'success':True}
    return {'success':False}

@app.post('/users/login')
async def get_user(userData:customer):
    print("okk", userData)
    response = get_user_from_db(userData)
    print("response is ", response)
    if response != None:
        response = customer(**response)
        return {'data' : response, 'success':True}
    else:
        print("Not Found", response)
    return {'success':False}


if __name__ == '__main__':
    import uvicorn
    uvicorn.run('main:app', host='0.0.0.0', port = 3001, reload=True)