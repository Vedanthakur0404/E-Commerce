from typing import List
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware 

from db import (
    save_all_dummy_data_to_db,
    get_all_dummy_data_from_db,
    get_by_categories_from_db
)
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

@app.post('/getCategories')
async def get_by_categories(page:str , categories:str | None = None  ):
    print(page)
    if categories == None or categories == "" or categories == " ": 
        response, maxlength = get_all_dummy_data_from_db(page=page)
    else:
        myarr = categories.split(",")
        response, maxlength = get_by_categories_from_db(myarr, page)
    return {"data":response, "maxlength" : maxlength}



if __name__ == '__main__':
    import uvicorn
    uvicorn.run('main:app', host='0.0.0.0', port = 3001, reload=True)