"use strict";
const AWS = require('aws-sdk');
const dotenv = require("dotenv");
const awsCredentials = dotenv.config()

const s3 = new AWS.S3({
	accessKeyId: awsCredentials.parsed.AWS_ACCESS_KEY_ID,
	secretAccessKey: awsCredentials.parsed.AWS_SECRET_ACCESS_KEY, 
});

const uploadFile = (data) => {
	console.log(data);
	   const params = {
		   Bucket: awsCredentials.parsed.S3_BUCKET_NAME, // pass your bucket name
		   Key: 'attachedFile', // file will be saved as testBucket/contacts.csv
		   Body: data, 
	   };
	   s3.upload(params, function(s3Err, data) {
		   if (s3Err) throw s3Err
		   console.log(`File uploaded successfully at ${data.Location}`)
	   });
  };
  
  uploadFile();

module.exports = {
	name: "assets",
	version: 1,
	settings: {

	},
	dependencies: [],
	actions: {
		upload: {
			cache: {
				keys: [],
			},
			params: {
				// payload: { type: "object", optional: false } ,

			},
			handler(broker) {
<<<<<<< HEAD
				console.log(broker.params)
				uploadFile(broker.params);
=======
				console.log(broker.params);
				const params = {
					Bucket: awsCredentials.parsed.S3_BUCKET_NAME,
					Body: broker.params,
					Key: "key",
				};
				s3.upload(params, (error, data) => {
					console.log(error, data);
				});

>>>>>>> f55b5518845c87dcbf7eac90f44701358512567a
			}
		}
	},
	events: {

	},
	methods: {

	},

	/**
	 * Service created lifecycle event handler
	 */
	created() {
		
		console.log("Assets service instance created");
	},

	/**
	 * Service started lifecycle event handler
	 */
	started() {
	},

	/**
	 * Service stopped lifecycle event handler
	 */
	stopped() {

	}
};