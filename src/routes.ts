import { Router } from 'express';
import { CreateUserController } from './controllers/CreateUserController';
import { CreateTagController } from './controllers/CreateTagController';
import { ensureAdmin } from './middlewares/ensureAdmins';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { CreateComplimentController } from './controllers/CreateComplimentController';
import { ListUserReceiverComplimentsController } from './controllers/ListUserReceiverComplimentsController';
import { ListUserSendComplimentsController } from './controllers/ListUserSendComplimentsController';
import { ListTagsController } from './controllers/ListTagsController';
import { ListUsersController } from './controllers/ListUsersController';

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listReceiverComplimentsController = new ListUserReceiverComplimentsController();
const listSendComplimentsController = new ListUserSendComplimentsController();
const listTagController = new ListTagsController();
const listUsersController = new ListUsersController();


router.post('/users', createUserController.handle);
router.post('/tags', ensureAuthenticated, ensureAdmin, createTagController.handle);
router.post('/login', authenticateUserController.handle);
router.post('/compliments', ensureAuthenticated, createComplimentController.handle);
router.get('/compliments/received', ensureAuthenticated, listReceiverComplimentsController.handle);
router.get('/compliments/sender', ensureAuthenticated, listSendComplimentsController.handle);
router.get('/tags', ensureAuthenticated, listTagController.handle);
router.get('/users', ensureAuthenticated, listUsersController.handle);

export { router };
