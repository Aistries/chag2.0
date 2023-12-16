const IntaSend = require("intasend-node")

let intasend = new IntaSend(
  publishable_key='ISPubKey_test_7228a910-71f4-4338-93ce-ba7f784e2436',
  test_mode=false // set to false when going live
);

let collection = intasend.collection();
collection
   .mpesaStkPush({
  		first_name: 'Joe',
    	last_name: 'Doe',
    	email: 'joe@doe.com',
    	host: 'https://aistries.com',
  		amount: 10,
    	phone_number: '254715711306',
    	api_ref: 'test',
  })
  .then((resp) => {
  	// Redirect user to URL to complete payment
  	 console.log(`STK Push Resp:`,resp);
	})
  .catch((err) => {
     console.error(`STK Push Resp error:`,err);
  });