import awsServerlessExpress from "aws-serverless-express";
import app from "./app";

export const handler = (event, context) => {
	console.log(event); // eslint-disable-line no-console
	awsServerlessExpress.proxy(awsServerlessExpress.createServer(app), event, context);
};
