"use strict";

const s3Utils = require('../util/s3-utils.js');
let multer;

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
				// return new Promise((resolve, reject) => {
					console.log(broker.params);
					// multer.single(broker.params)
				// })

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
		multer = s3Utils.initMulter();
	},

	/**
	 * Service stopped lifecycle event handler
	 */
	stopped() {

	}
};