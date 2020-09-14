"use strict";

const ApiGateway = require("moleculer-web");

module.exports = {
	name: "api",
	version: 1,
	mixins: [ApiGateway],

	// More info about settings: http://moleculer.services/docs/moleculer-web.html
	settings: {
		port: 6000,
		path: "/assets",
		cors: {
			origin: "*",
			methods: ["GET", "OPTIONS", "POST", "PUT", "DELETE"],
			allowedHeaders: *,
			exposedHeaders: [],
			credentials: false,
			maxAge: 3600
		},
		routes: [
			{
				path: "/api",
				// You should disable body parsers
				bodyParsers: {
					json: false,
					urlencoded: false
				},
				mappingPolicy: "restrict",
				aliases: {
					// File upload from HTML multipart form
					"POST /upload": "multipart:v1.assets.upload",
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
					},
					// File upload from AJAX or cURL
					"PUT /stream": "stream:v1.assets.upload",
					"GET /torrent": "v1.assets.torrent",
					"POST /delete": "v1.assets.delete"
				},

				// Route level busboy config.
				// More info: https://github.com/mscdex/busboy#busboy-methods
				busboyConfig: {
					limits: {
						files: 1
					}
				}
			}
		]
	}
};
