const multer = require("multer");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const dotenv = require("dotenv");
const awsCredentials = dotenv.config();

module.exports = {
	initMulter: () => {
		aws.config.update({
			accessKeyId: awsCredentials.parsed.AWS_ACCESS_KEY_ID,
			secretAccessKey: awsCredentials.parsed.SECRET_ACCESS_KEY, 
		});
		const s3 = new aws.S3();
		return multer({
			storage: multerS3({
				s3: s3,
				bucket: awsCredentials.parsed.S3_BUCKET_NAME,
				metadata: (req, file, callback) => {
					callback(null, Object.assign({}, req.body));
				},
				key: (req, file, callback) => {
					callback(null, file.originalname);
				}
			})
		});
	}
};
