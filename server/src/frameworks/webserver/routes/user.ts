import express from 'express';

const userRouter = ()=> {
    const route = express.Router();

    route.get('/', (req, res) => {
        res.send('Yup you are on the right track');
    });

    return route;
}

export default userRouter;