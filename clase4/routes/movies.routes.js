import { Router } from 'express';

import { MovieController } from '../controllers/movies.controllers.js';

const moviesRouter = Router();

moviesRouter.get('/', MovieController.getAll);

moviesRouter.get('/:id', MovieController.getById);

moviesRouter.post('/', MovieController.post);

moviesRouter.patch('/:id', MovieController.patch);

moviesRouter.delete('/:id', MovieController.delete);

export default moviesRouter;  
