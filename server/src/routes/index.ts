import * as express from "express";

const app = express();

app.get('/home', ()=>{console.log('basic set up')});

export default app;
