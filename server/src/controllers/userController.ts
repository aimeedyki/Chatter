import * as bodyParser from 'body-parser';
import * as jwt from 'jwt-simple';
import moment from 'moment';
import * as passport from 'passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

import model from '../dbConfig';

export default {

  /** @description signs up a user
   *
   * @param {Request} req HTTP request object
   * @param {Response} res HTTP response object
   *
   * @returns {object} user details
   * @returns {string} user jwt token
   */
  signup: (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;
    model.user.save({
      email,
      password,
      username,
    }).then((createdUser) => {
      return res.status(201).send({ message: 'Welcome', createdUser });
    }).catch((error) => {
      return res.status(500).send(error.message);
    });
  }
};
