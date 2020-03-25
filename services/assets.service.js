"use strict";
const { getS3Instance } = require("../util/s3-utils");
const _ = require("lodash");

module.exports = {
  name: "assets",
  version: 1,
  settings: {},
  dependencies: [],
  actions: {
    upload: {
      cache: {
        keys: []
      },
      async handler(context) {
        const client = await getS3Instance();
        const fileStream = context.params;
        const params = {
          Bucket: "rishighan",
          Body: fileStream,
          Key: context.meta.filename
        };

        const options = { partSize: 10 * 1024 * 1024, queueSize: 1 };
        return new Promise((resolve, reject) => {
          client.upload(params, options, (err, data) => {
            if (err) {
              reject(err);
            }
            resolve(data);
          });
        });
      }
    },
    delete: {
      params: {
        fileName: {
          type: "string",
          optional: false
        }
      },
      async handler(context) {
        const client = await getS3Instance();
        const params = {
          Bucket: "rishighan",
          Key: context.params.fileName
        };
        client.deleteObject(params, (err, data) => {
          if (err) {
            console.log(err, err.stack);
          } else {
            console.log(data); // successful response
          }
        });
      }
	},
	torrent: {
		params: {},
		handler(context) {

		},
	},
  },
  events: {},
  methods: {},
  created() {
    console.log("Assets service instance created");
  },
  started() {},
  stopped() {}
};
