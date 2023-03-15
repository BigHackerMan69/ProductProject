# python -m pip install requests

import json, requests


product:str = '{"no":"6jk", "name":"bread","price":15 }'

data = json.loads(product)
# res = requests.post(url = "http://localhost:3000/products", json = data )


print("inserted one record...")

key:str = '4pg'

res = requests.get(url = "http://localhost:3000/products/"+key)


print("found this record:" + res.text)


