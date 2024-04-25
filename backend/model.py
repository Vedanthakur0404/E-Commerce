from pydantic import BaseModel

class customer(BaseModel):
    email:str
    password:str
    id : str = None

class address_model(BaseModel):
    user_id:str | None = None
    city: str
    email: str
    name: str
    phone: str
    pinCode:str
    state:str
    street: str
    address_id : str | None = None

class product(BaseModel):
    id:int
    category:str
    title:str
    price:float
    discountPercentage:float
    rating:float
    stock:int
    brand:str
    category:str
    thumbnail:str
    images:list[str]

class orders(BaseModel):
    order_id :str|None = None
    user_id:str
    address:address_model
    products:list[product]

