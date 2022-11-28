import sls from 'serverless-http';
import app from ".";
export const server = sls(app);
