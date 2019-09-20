"use strict";
const AWS = require('aws-sdk');
const dotenv = require("dotenv");
const awsCredentials = dotenv.config();

const s3 = new AWS.S3({
	accessKeyId: awsCredentials.parsed.AWS_ACCESS_KEY_ID,
	secretAccessKey: awsCredentials.parsed.AWS_SECRET_ACCESS_KEY, 
});


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
				fileData: { type: "object", optional: true } ,

			},
			handler(context) {
				console.log('params', context.params);
				console.log('context.meta.$multipart', context.meta.$multipart);
				const params = {
					Bucket: awsCredentials.parsed.S3_BUCKET_NAME,
					Body: context.meta,
					Key: "key",
				};
				s3.upload(params, (error, data) => {
					console.log(error, data);
				});

			}
		}
	},
	events: {

	},
	methods: {

	},
	created() {
		console.log("Assets service instance created");
	},
	started() {
	},
	stopped() {

	}
};