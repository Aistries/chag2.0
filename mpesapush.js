const IntaSend = require("intasend-node")

let intasend = new IntaSend(
  publishable_key='ISPubKey_live_a9d742ed-20b9-401c-a31d-12abf1e8e68a',
  test_mode=false // set to false when going live
);

let collection = intasend.collection();
collection
   .mpesaStkPush({
  		first_name: 'Joe',
    	last_name: 'Doe',
    	email: 'joe@doe.com',
    	host: 'https://andati-industries.web.app/',
  		amount: 10,
    	phone_number: '254715711306',
    	api_ref: 'payment',
  })
  .then((resp) => {
  	// Redirect user to URL to complete payment
  	 console.log(`STK Push Resp:`,resp);
	})
  .catch((err) => {
     console.error(`STK Push Resp error:`,err);
  });