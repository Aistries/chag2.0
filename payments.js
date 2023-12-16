const IntaSend = require("intasend-node")

let intasend = new IntaSend(
  publishable_key='<INTASEND_PUBLISHABLE_KEY>',
  test_mode=true // set to false when going live
);

let collection = intasend.collection();
collection
   .mpesaStkPush({
  		first_name: 'Joe',
    	last_name: 'Doe',
    	email: 'joe@doe.com',
    	host: 'https://yourwebsite.com',
  		amount: 10,
    	phone_number: '254722000000',
    	api_ref: 'test',
  })
  .then((resp) => {
  	// Redirect user to URL to complete payment
  	 console.log(`STK Push Resp:`,resp);
	})
  .catch((err) => {
     console.error(`STK Push Resp error:`,err);
  });