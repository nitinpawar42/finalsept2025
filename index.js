import { handler } from './dist/server/entry.mjs';
import express from 'express';

const app = express();
app.use(handler);

export const server = app;
