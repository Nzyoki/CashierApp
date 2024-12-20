//require('dotenv').config();// to read values from .env file
//const fs=require('fs');// to read and write files
let config = {};
fetch('config.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => config = data)
    .catch(error => console.log("Error reading config file", error));

document.getElementById('form').addEventListener("submit", (event) => {
    event.preventDefault();//to prevent default form submission and reloading of the page for immediate response upon clicking submit
    const paymentMethod = document.getElementById("paymentMethod").value;// to return the selected value option
    const queueInformation = document.getElementById("queueInfo");

    let queueInfo = "";// an empty string for the queue info

    if (paymentMethod === "cash") {
        queueInfo = "Please go to cashier 1 or 2.";
    } else if (paymentMethod === "mpesa") {
        queueInfo = "Please go to cashier 3 or 4.";
    }
    queueInformation.innerText = queueInfo; //Store the info for either mpesa or cash selection in one file

    // Add a new payment record
    addPaymentRecord({ method: paymentMethod, info: queueInfo });
    displayPaymentRecords();
});

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

const deletePaymentRecord = (index) => {
    paymentRecords.splice(index, 1); // to delete the payment record
};

// Function to display payment records
const displayPaymentRecords = () => {
    const paymentRecordsList = document.getElementById("paymentRecordsList");
    if (!paymentRecordsList) {
        console.error("Element with ID 'paymentRecordsList' not found");
        return;
    }
    paymentRecordsList.innerHTML = ""; // Clear the list

    paymentRecords.forEach((record, index) => {
        const listItem = document.createElement("li");
        listItem.innerText = `Method: ${record.method}, Info: ${record.info}`;
        
        // Add update and delete buttons
        const updateButton = document.createElement("button");
        updateButton.innerText = "Update";
        updateButton.onclick = () => {
            const newMethod = prompt("Enter new payment method:", record.method);
            const newInfo = prompt("Enter new info:", record.info);
            if (newMethod && newInfo) {
                updatePaymentRecord(index, { method: newMethod, info: newInfo });
                displayPaymentRecords();
            }
        };

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.onclick = () => {
            deletePaymentRecord(index);
            displayPaymentRecords();
        };

        listItem.appendChild(updateButton);
        listItem.appendChild(deleteButton);
        paymentRecordsList.appendChild(listItem);
    });
};

// Initial display of payment records
displayPaymentRecords();