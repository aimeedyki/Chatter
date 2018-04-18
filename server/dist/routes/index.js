"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
app.get('/users/signin', () => { console.log('I did it'); });
exports.default = app;
