import {Request, Response} from 'express';
var express = require('express');
var router = express.Router();
var versioning = require('../versioning.js');

var userRouteV1 = express.Router().get('/', function (req: Request, res: Response) {
  res.send('respond with a resource 1');
});

var userRouteV2 = express.Router().get('/', function(req: Request, res: Response) {
  res.send('responde with a resource 2');
});

/* GET user. */
router.use(versioning.reroute({
  1: userRouteV1,
  2: userRouteV2
}));

var userListRouteV1 = express.Router().get('/list', function( req: Request, res: Response) {
  res.send('respond with a resource list 1');
});

var userListRouteV2 = express.Router().get('/list', function (req: Request, res: Response) {
  res.send('responde with a resource list 2');
});

/* GET user listing. */
router.use(versioning.reroute({
  1: userListRouteV1,
  2: userListRouteV2
}));

module.exports = router;

