const express = require('express');

const api = express.Router();


api.post('/ventas', (req, res) => req.statusCode(201).send({success: true}));

modulo.export = api;