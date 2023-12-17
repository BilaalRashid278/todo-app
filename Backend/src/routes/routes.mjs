import express from 'express';
import { getAllData, getAuthDetails, getUserAccountAllDetails } from '../controllers/getRequests.mjs';
import { createNewTodo, createUserAuth } from '../controllers/postRequests.mjs';
import { deleteAllTodos, deleteTodo } from '../controllers/deleteRequests.mjs';
import { updateTodo } from '../controllers/updateRequests.mjs';
import AuthModel from '../models/auth.mjs';
const router = express.Router();

const checkAuthToken = async (req, res, next) => {
    try {
        const token = await AuthModel.findOne({ token: req.params.token }, { token: 2 });
        if (req.params.token === token.token) {
            next();
        } else {
            res.send({
                isAuthicate: false,
                message: 'this user is not authenticated person'
            });
        }
    } catch (error) {
        res.send({
            isAuthicate: false,
            message: 'this user is not authenticated person'
        });
    }
};

router.get('/', getAllData);
router.post('/new', createNewTodo);
router.put('/update/:id', updateTodo);
router.delete('/remove/:id', deleteTodo);
router.delete('/deleteAll', deleteAllTodos);

// auth routes

router.post('/auth',createUserAuth);
router.get('/auth/:token',checkAuthToken,getAuthDetails);
router.get('/authentication/details/',getUserAccountAllDetails);

export { checkAuthToken }
export default router;