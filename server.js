const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const btoa = require('btoa');

const app = express();
const port = 3000; // Choose a port for your server

app.use(bodyParser.json());

app.post('/mpesa-stk-push', async (req, res) => {
  const mobileNumber = req.body.mobileNumber;
  const depositAmount = req.body.depositAmount;

  // Replace these placeholders with your actual Safaricom Daraja API credentials
  const consumerKey = '0QXJYNRzONgpMCM5G8pQdP38l1r5SXnH';
  const consumerSecret = 'PI2BdGlfjZmAchhQ';
  const lipaNaMpesaOnlinePasskey = 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919';
  const lipaNaMpesaOnlineShortcode = '174379';

  // Construct the URL for initiating the STK push
  const mpesaApiUrl = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';
  const accessTokenUrl = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';

  try {
    // Request access token
    const tokenResponse = await axios.get(accessTokenUrl, {
      headers: {
        'Authorization': 'Basic ' + btoa(consumerKey + ':' + consumerSecret),
      },
    });

    const accessToken = tokenResponse.data.access_token;

    // Request STK push
    const stkPushResponse = await axios.post(mpesaApiUrl, {
      'BusinessShortCode': lipaNaMpesaOnlineShortcode,
      'Password': btoa(lipaNaMpesaOnlineShortcode + lipaNaMpesaOnlinePasskey + Date.now()),
      'Timestamp': new Date().toISOString().slice(0, -1),
      'TransactionType': 'CustomerPayBillOnline',
      'Amount': depositAmount,
      'PartyA': mobileNumber,
      'PartyB': lipaNaMpesaOnlineShortcode,
      'PhoneNumber': mobileNumber,
      'CallBackURL': 'Your-Callback-URL',
      'AccountReference': 'Deposit to Play',
      'TransactionDesc': 'Deposit to Chickenhawk Air Games',
    }, {
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'application/json',
      },
    });

    console.log(stkPushResponse.data);
    res.status(200).json({ message: 'M-Pesa STK push initiated', data: stkPushResponse.data });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Error initiating M-Pesa STK push. Please try again.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
