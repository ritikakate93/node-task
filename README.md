#  my nodejs Task

## project structure 
  
- `Controllers/` -  logic
- `Routes/` - API route definitions
- `Models/` - Mongoose schemas
- `Middlewares/` - Auth, error handling, etc.
- `Data/` - Sample MongoDB collections in json
- `NodeJSTaskApi.postman_collection.json` - Postman collection file


## get clone from repo

# git clone url <your-repo-url>
# cd project-name

## install dependency
# npm install

## copy sample .env.example file and create new .env file

# run server
# npm start

## Import Postman Collection "NodeJSTaskApi.postman_collection.json"

## import data into MongoDB using mongoimort command
- mongoimport --uri="your_connection_string" --collection=admin --file=Data/admin.json
- mongoimport --uri="your_connection_string" --collection=seller --file=Data/seller.json
- mongoimport --uri="your_connection_string" --collection=products --file=Data/products.json


