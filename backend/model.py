from pydantic import BaseModel

class customer(BaseModel):
    email:str
    password:str
    # id : str = None