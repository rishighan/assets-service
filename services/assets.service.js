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
				// data: { type: "object", optional: false } ,

			},
			handler(context) {
				const fileStream = context.params;
				const params = {
					Bucket: awsCredentials.parsed.S3_BUCKET_NAME,
					Body: fileStream,
					Key: context.meta.filename,
				};
				s3.upload(params, (error, data) => {
					console.log(error, data);
				});

			}
		},
		delete: {
			params: {
				fileID: {
					type: "string",
					optional: false
				}
			},
			handler(context) {

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