"use strict";
const ApiGateway = require("moleculer-web");

module.exports = {
	mixins: [ApiGateway],
	settings: {
		port: 4000,
		path: "/upload",
		routes: [
			{
				path: "",
				// You should disable body parsers
				bodyParsers: {
					json: false,
					urlencoded: false
				},
				mappingPolicy: "restrict",
				aliases: {
					// File upload from HTML form and overwrite busboy config
					"POST /multi": {
						type: "multipart",
						// Action level busboy config
						busboyConfig: {
							limits: {
								files: 3
							}
						},
						action: "assets.upload"
					},
					// File upload from HTML multipart form
					"POST /": "multipart:assets.upload",
                    
					// File upload from AJAX or cURL
					"PUT /": "stream:assets.upload",
				},
				// Route level busboy config.
				// More info: https://github.com/mscdex/busboy#busboy-methods
				busboyConfig: {
					limits: {
						files: 1
					}
				},

			}
		]
	}
};