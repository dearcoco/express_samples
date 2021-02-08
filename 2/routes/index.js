import express from 'express';
import mainRouter from './main.js'
import userRouter from './user.js'

var router = express.Router();

router.use('/', mainRouter);
router.use('/user', userRouter);

export {mainRouter, userRouter};
