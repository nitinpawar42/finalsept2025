import { handler as ssrHandler } from './server/entry.mjs';
import functions from 'firebase-functions';

const handler = (req, res) => {
  ssrHandler(req, res);
};

export const server = functions.https.onRequest(handler);
