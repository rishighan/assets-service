"use strict";
const multer = require('multer');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');

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

			},
			handler(broker) {
				aws.config.update({
					accessKeyId: process.env.AWS_ACCESS_KEY_ID,
					secretAccessKey: process.env.SECRET_ACCESS_KEY
				});
				let s3 = new aws.S3();
				const upload = multer({
					storage: multerS3({
						s3: s3,
						bucket: process.env.S3_BUCKET_NAME,
						metadata: (req, file, cb) => {
							cb(null, Object.assign({}, req.body));
						},
						key: (req, file, cb) => {
							cb(null, file.originalname);
						}
					})
				});
				return upload;
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