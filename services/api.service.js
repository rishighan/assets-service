"use strict";
const Busboy = require('busboy');
const ApiGateway = require("moleculer-web");
function uploader(req, res, next) {
	console.log(req.body)
	const busboy = new Busboy({ headers: req.headers });
	busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
		console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
		file.on('data', function (data) {
			console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
		});
		file.on('end', function () {
			console.log('File [' + fieldname + '] Finished');
		});
	});

	res.end(next);
}

module.exports = {
    mixins: [ApiGateway],
    settings: {
        path: "/upload",

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
                    "POST /": "multipart:assets.upload",
                    
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
                        action: "assets.upload"
                    }
                },

                // Route level busboy config.
                // More info: https://github.com/mscdex/busboy#busboy-methods
                busboyConfig: {
                    limits: {
                        files: 1
                    }
                    // Can be defined limit event handlers
                    // `onPartsLimit`, `onFilesLimit` or `onFieldsLimit`
                },

                mappingPolicy: "restrict"
            }
        ]
    }
};
