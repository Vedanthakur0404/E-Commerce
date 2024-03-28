from pydantic import BaseModel

class customer(BaseModel):
    email:str
    password:str
    id : str = None

class address_model(BaseModel):
    user_id:str
    city: str
    email: str
    name: str
    phone: str
    pinCode:str
    state:str
    street: str
    address_id : str | None = None
