import omit from 'lodash.omit';
import { models } from '../models';

const User = models.User;
const omitKeys = ['password', 'createdAt', 'updatedAt'];

export default (id, done) => {
  console.log('find by id', id);
  User.findById(id)
    .then(user => done(null, omit(user.get(), omitKeys)))
    .catch(done);
};
