const aws = require("aws-sdk");
const zookeeper = require("node-zookeeper-client");

const client = zookeeper.createClient(process.env.ZOOKEEPER_HOST);

const getNodeData = (path, client) => {
	return new Promise((resolve, reject) => {
		client.getData(
			path,
			(event) => {
				console.log("Got event: %s.", event);
			},
			(error, data, stat) => {
				if (error) {
					console.log(error.stack);
					reject(error);
				}
				resolve(data.toString("utf8"));
				// console.log('Got data: %s', data.toString('utf8'));
			}
		);
	});
};

client.once("connected", () => {
	console.log("Connected to the Zookeeper server.");
});

client.connect();

const getS3Instance = async () => {
	const accessKeyId = getNodeData("/aws/access_key_id", client);
	const secretAccessKey = getNodeData("/aws/secret_access_key", client);
	const bucketName = getNodeData("/aws/s3_bucket_name", client);
	const awsCredentials = await Promise.all([accessKeyId, secretAccessKey, bucketName]);
	aws.config.update({
		accessKeyId: awsCredentials[0],
		secretAccessKey: awsCredentials[1], 
	});
	return new aws.S3();
	 
};



module.exports = {
	getS3Instance
};
