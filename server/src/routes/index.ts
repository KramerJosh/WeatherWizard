// might want to change the .js's to .ts's

import { Router } from 'express';
const router = Router();

import apiRoutes from './api/index.js';
import htmlRoutes from './htmlRoutes.js';

router.use('/api', apiRoutes); //if we're in localhost:3001/api, run stuff from api routes
router.use('/', htmlRoutes); // this refers to the get(*.. ) we did, routes to index.html if invalid url is used

export default router;
