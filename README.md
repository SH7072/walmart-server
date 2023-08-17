#MetaVerse

* Live service available at : ```walmart-server.onrender.com```




## Features

- Authenticate 
- Multiple Shops 
- buy items
- add to card
- Checkout
- Recieve confirmation of order

## Code Summary

The API is built using Node.js and Express.js, and connects to a MongoDB database for data storage.

The following endpoints are implemented:

    1. POST /api/users/sendCharacterData: send data of character
    
    2. GET /api/users/getCharacterData: retrieve data of character

    3. GET /api/users/getUserData/:id: retrieve user data

    4. GET /api/user: retrieves the authenticated user's profile.

    5. GET /api/products/getProducts: retrieve products

    6. GET /api/products/getProduct/:id: retrieve product data

    7. POST /api/products/addProduct: add a product

    8. POST /api/products/deleteProduct: delete a product

    9. GET /api/cart/addToCart/:productId: retrieve product from cart

    10. POST /api/cart//decQuantity/:productId: decrease product quantity from cart

    11. POST /api/cart/removeFromCart/:productId: remove product from cart

    12. POST /api/cart/cart_checkout: checkout

    13. GET /api/cart/getCart: retrieve cart



## Environment Variables


To run this project, you will need to add the following environment variables to your .env file


```
`DATABASE_STRING`

`MONGO_URI`

`JWT_SECRET`

`JWT_EXPIRES_IN` - specify the time after which the token should expire

`AUTH_COOKIE_EXPIRES_IN`

`MAIL_ID`

`MAIL_PASSWORD`
```

## To run on local system :

* GIT clone the repo from : ```https://github.com/SH7072/walmart-server/```

* To install the dependencies run : ```npm install```

* To start the server  : ```node app.js```

* Then the request can be sent to  : ```http://localhost:3232/```. 
