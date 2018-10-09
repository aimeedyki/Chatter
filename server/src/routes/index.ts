import * as express from 'express';
import userController from '../controllers/userController';

const app = express();

// signup route
app.post('/signup', userController);

export default app;
