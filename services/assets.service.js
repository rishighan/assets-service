"use strict";

const aws = require("aws-sdk");
const dotenv = require("dotenv");
const awsCredentials = dotenv.config();
const s3 = new aws.S3({
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
				// file: { type: "file", optional: false } ,

			},
			handler(broker) {
				console.log(broker.params);
				const params = {
					Bucket: awsCredentials.parsed.S3_BUCKET_NAME,
					Body: broker.params,
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