const express = require("express");
const unirest = require('unirest');

const app = express();
const port = 3000;

const authorizationToken = 'Bearer re9GtMSQlYV6WHJD3mAJmdHQ5mbs';

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/process-payment", (req, res) => {
  const requestBody = {
    "BusinessShortCode": 174379,
    "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjMwODIzMDg0NjIw",
    "Timestamp": "20230823084620",
    "TransactionType": "CustomerPayBillOnline",
    "Amount": 1,
    "PartyA": 254708374149,
    "PartyB": 174379,
    "PhoneNumber": 254715711306,
    "CallBackURL": "https://mydomain.com/path",
    "AccountReference": "AndatiIndustries",
    "TransactionDesc": "Game payment" 
  };

  unirest
    .post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest')
    .headers({
      'Content-Type': 'application/json',
      'Authorization': authorizationToken
    })
    .send(JSON.stringify(requestBody))
    .end(response => {
      if (response.error) {
        console.error(response.error);
        res.status(500).send("An error occurred while processing the payment.");
      } else {
        console.log(response.raw_body);
        // You can customize the response as needed
        res.send("Payment request sent successfully!");
      }
    });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "payments.html");
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
