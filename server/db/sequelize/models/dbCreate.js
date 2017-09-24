import { ROLE_ADMIN } from './user';

const dbCreate = async (models) => {
  try {
    await models.User.sync();

    const user = await models.User.find({
      where: {
        role: ROLE_ADMIN,
      },
    });

    if (!user) {
      console.log('No admin found. Creating default admin.');

      if (!process.env.DEFAULT_PASSWORD) throw new Error('No env.DEFAULT_PASSWORD supplied');
      if (!process.env.DEFAULT_USER) throw new Error('No env.DEFAULT_USER supplied');

      const admin = models.User.build({
        email: process.env.DEFAULT_USER,
        password: process.env.DEFAULT_PASSWORD,
        role: ROLE_ADMIN,
      });
      await admin.save();
      console.log('Inserted default user admin record');
    } else {
      console.log('Admin user found');
    }
  } catch (err) {
    console.error('Error syncing model with database', err);
  }
};

export default dbCreate;
