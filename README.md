# CashierApp

This application solves the problem of queues in shopping centers by introducing different cashiers for different payment methods, For cash payments and mpesa payments.

-Languages used include HTML, CSS for styling and Javascript.
-Daraja API is used to send Push STK to customers who opt to pay with lipa na mpesa option

To generate auth key in postman, go to Daraja API documentation, select the auth part and pick the get URL. Use this in Postman and set the GET method, under auth, select Basic Auth. Username:use this consumer key and password :use consumer secret then send the request


To test the API, go to to postman, URL, POST the URL, go to AUTH, input Bearaer Auth and Token, in headers key:Content-Type and value use application/json
Body:input the request body

Github Repo:https://github.com/Nzyoki/CashierApp

The .env file contains the consumer key and consumer secret which are used to generate auth token in Postman