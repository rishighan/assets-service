"use strict";
const { getS3Instance } = require("../util/s3-utils");


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
			handler(context) {
				return getS3Instance().then(client => {
					const fileStream = context.params;
					const params = {
						Bucket: 'rishighan',
						Body: fileStream,
						Key: context.meta.filename,
					};

					client.upload(params, (error, data) => {
						console.log(error, data);
						return params;
					});
				});
			}
		},
		delete: {
			// params: {
			// 	fileID: {
			// 		type: "string",
			// 		optional: false
			// 	}
			// },
			async handler(context) {
				const s3 = await getS3Instance();
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