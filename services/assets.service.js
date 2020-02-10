"use strict";
const S3Util = require("../util/s3-utils");


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
				data: { type: "object", optional: false },
			},
			handler(context) {
				return this.s3().then(client => {
				console.log(context);
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
			handler(context) {
				return this.s3().then(client => client);
			}
		}
	},
	events: {

	},
	methods: {
		s3: async () => {
			const s3Instance = await S3Util.getS3Instance();
			return s3Instance;
		},
	},
	created() {
		console.log("Assets service instance created");
	},
	started() {
	},
	stopped() {

	}
};