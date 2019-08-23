"use strict";

const ApiGateway = require("moleculer-web");

module.exports = {
	name: "api",
	mixins: [ApiGateway],

	// More info about settings: https://moleculer.services/docs/0.13/moleculer-web.html
	settings: {
		port: process.env.PORT || 3030,

		routes: [{
			path: "/api",
			whitelist: [
				// Access to any actions in all services under "/api" URL
				"**"
			]
		}],
		aliases: {
			"POST /assets/upload": "assets.upload",
		},
		// Parse body content
		bodyParsers: {
			json: {
				strict: false
			},
			urlencoded: {
				extended: false
			}
		},


		// Serve assets from "public" folder
		assets: {
			folder: "public"
		}
	}
};
