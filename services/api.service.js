"use strict";
const ApiGateway = require("moleculer-web");

module.exports = {
	mixins: [ApiGateway],
	settings: {
		path: "/upload",
		port: 4000,
		// Global CORS settings for all routes
		cors: {
			// Configures the Access-Control-Allow-Origin CORS header.
			origin: "*",
			// Configures the Access-Control-Allow-Methods CORS header. 
			methods: ["GET", "OPTIONS", "POST", "PUT", "DELETE"],
			// Configures the Access-Control-Allow-Headers CORS header.
			allowedHeaders: [],
			// Configures the Access-Control-Expose-Headers CORS header.
			exposedHeaders: [],
			// Configures the Access-Control-Allow-Credentials CORS header.
			credentials: true,
			// Configures the Access-Control-Max-Age CORS header.
			maxAge: 3600
		},
		routes: [
			{
				path: "",
				// You should disable body parsers
				bodyParsers: {
					json: false,
					urlencoded: false
				},

				aliases: {
					// File upload from HTML multipart form
					"POST /": "multipart:v1.assets.upload",
					// File upload from AJAX or cURL
					"PUT /": "stream:assets.upload",

					// File upload from HTML form and overwrite busboy config
					"POST /multi": {
						type: "multipart",
						// Action level busboy config
						busboyConfig: {
							limits: {
								files: 3
							}
						},
						action: "v1.assets.upload"
					}
				},


				mappingPolicy: "restrict"
			}
		]
	}
};
