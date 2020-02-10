"use strict";
const ApiGateway = require("moleculer-web");

module.exports = {
	mixins: [ApiGateway],
	name: "assets",
	settings: {
		port: 6000,
		// Global CORS settings for all routes
		cors: {
			origin: "*",
			methods: ["GET", "OPTIONS", "POST", "PUT", "DELETE"],
			allowedHeaders: [],
			exposedHeaders: [],
			credentials: true,
			maxAge: 3600
		},
		routes: [
			{
				path: "/api",
				whitelist: ["**"],
			}
		],
		aliases: {
			// File upload from HTML multipart form
			"POST /upload": "multipart:assets.upload",
			// File upload from AJAX or cURL
			"PUT /upload": "stream:assets.upload",
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
			"GET /delete": "assets.delete",
		},
		// You should disable body parsers
		bodyParsers: {
			json: false,
			urlencoded: false
		},
	}
};
