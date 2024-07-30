import express, { Request, Response } from 'express';
import destroyToken from '../../utils/api-utils/destroyToken'; // Custom function to destroy token

const router = express.Router();

router.post('/signout', (req: Request, res: Response) => {
  // Clear the cookie from the browser using destroyToken utils.
  destroyToken(res);

  res.status(200).send({ status: 'Signed out.' });
});

export { router as signOutRouter };
