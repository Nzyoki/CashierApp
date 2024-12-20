//require('dotenv').config(); // to read values from .env file

document.getElementById('form').addEventListener("submit", async (event) => {
    event.preventDefault(); // to prevent default form submission and reloading of the page for immediate response upon clicking submit
    const paymentMethod = document.getElementById("paymentMethod").value; // to return the selected value option
    const queueInformation = document.getElementById("queueInfo");

    let queueInfo = ""; // an empty string for the queue info

    if (paymentMethod === "cash") {
        queueInfo = "Please go to cashier 1 or 2.";
    } else if (paymentMethod === "mpesa") {
        queueInfo = "Please go to cashier 3 or 4.";
        await mpesaPaymentInitiate(); // Await the STK push initiation
    }
    queueInformation.innerText = queueInfo; // Store the info for either mpesa or cash selection in one file
});

// Function to generate the auth token
const generateAuthToken = async () => {
    const url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
    const consumerKey = "WhOirPMyEMikA1L4tlMYBZUKsmF8rO9oR9Y9xMLTVMa0A3q1";
    const consumerSecret = "0dCZh4bJSNCHm6yVbVKiZHOkI1V5DR8AyJvJkxCeZM6DewuYwYa8kUrvxxsLc4xl";

    const response = await fetch(url, {
        method: "GET",
        headers: {
            'Authorization': `Basic ${btoa(consumerKey + ":" + consumerSecret)}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to generate auth token: ' + response.statusText);
    }

    const data = await response.json();
    console.log("Auth Token:", data.access_token);
    return data.access_token; // Return the access token
};

// Function to initiate M-Pesa payment
const mpesaPaymentInitiate = async () => {
    const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
    const authToken = await generateAuthToken(); // Await the auth token generation

    const headers = new Headers({
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
    });

    const body = JSON.stringify({
        "BusinessShortCode": "174379",
        "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMTYwMjE2MTY1NjI3", // CALL PASSWORD FROM .ENV FILE
        "Timestamp": new Date().toISOString().replace(/[-:]/g, '').slice(0, 14), //TIMESTAMP FORMAT TO READ CURRENT DATE AND TIME
        "TransactionType": "CustomerPayBillOnline",
        "Amount": "1",
        "PartyA": "254710630996", // sending money
        "PartyB": "174379",
        "PhoneNumber": "254710630996", // receiving Money
        "CallBackURL": "https://mydomain.com/pat",
        "AccountReference": "Test",
        "TransactionDesc": "Test"
    });

    const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: body,
    });

    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }

    const data = await response.json();
    console.log("Push STK:", data);
    // Provide user feedback based on the response
    if (data.ResponseCode === "0") {
        alert("STK Push initiated successfully!");
        addPaymentRecord(data); // Store the payment record
    } else {
        alert("Error: " + data.ErrorMessage);
    }
};

// CRUD operations for payment records
let paymentRecords = []; // an empty array to store the payment records

const addPaymentRecord = (paymentRecord) => {
    paymentRecords.push(paymentRecord); // to add the payment record to the array
};

const getPaymentRecords = () => {
    return paymentRecords; // to return the payment records
};

const updatePaymentRecord = (index, paymentRecord) => {
    paymentRecords[index] = paymentRecord; // to update the payment record     
};