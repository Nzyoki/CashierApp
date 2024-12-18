document.getElementById('form').addEventListener("submit", (event) => {
    event.preventDefault();//to prevent default form submission and reloading of the page for immediate response upon clicking submit
    const paymentMethod = document.getElementById("paymentMethod").value;// to return the selected value option
    const cash = document.getElementById("cash");
    const mpesa = document.getElementById("mpesa");
    const queueInformation = document.getElementById("queueInfo");
    //const queueInfo=document.getElementById("queueInfo");

    let queueInfo = [];// an empty array of the queue to show customer to which cashier they should go to


    if (paymentMethod === "cash") {
        queueInfo = "Please go to cashier A or B.";
        // cash.innerText=queueInfo;// update and stores queue info with cash,element cash will be having the new info to either go to cashier A or B
    }
    else if (paymentMethod === "mpesa") {
        queueInfo = "Please go to cashier C or D.";
        mpesaPaymentInitiate();
        //  mpesa.innerText=queueInfo;
    }
    queueInformation.innerText = queueInfo.join(", "); //Store the info for either mpesa or cash selection in one file
})


// using Daraja API 
const mpesaPaymentInitiate = () => {
    const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
    const authToken = "qjDGYarU4Igs4FnAePEpGv4P43x7";

    const headers = new Headers({
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
    });

    const body = JSON.stringify({
        "BusinessShortCode": "174379",
        "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMTYwMjE2MTY1NjI3",
        "Timestamp": "254710630996",
        "TransactionType": "CustomerPayBillOnline",
        "Amount": "1",
        "PartyA": "254710630996",    // sending money
        "PartyB": "174379",
        "PhoneNumber": "254710630996",    //receiving Money
        "CallBackURL": "https://mydomain.com/pat",
        "AccountReference": "Test",
        "TransactionDesc": "Test"
    })
}

fetch(url, {
    method: "POST",
    headers: headers,
    body: body,
})
    .then((r) => r.JSON())
    .then((data) => {
        console.log("Push STK:");
    })
    .catch(error => {
        console.log("Error sending STK");
    })


