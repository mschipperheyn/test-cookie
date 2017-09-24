import bcrypt from 'bcryptjs';

export const ROLE_ADMIN = 'ROLE_ADMIN';

const hashPassword = function (user) {
  if (!user.changed('password')) return;

  user.setDataValue('email', user.email.toLowerCase());

  return bcrypt.genSalt(10).then(salt =>
    bcrypt.hash(user.password, salt).then((hash) => {
      user.setDataValue('password', hash);
    }),
  );
};

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      email: {
        type: DataTypes.STRING(255),
        validate: {
          isEmail: {
            args: true,
            msg: 'Deve ser um email',
          },
        },
      },
      role: {
        type: DataTypes.STRING(25),
        validate: {
          // notNull: true,
          notEmpty: true,
        },
      },
      password: {
        type: DataTypes.STRING(255),
        validate: {
          len: {
            args: [3, 255],
            msg: 'Deve ser entre 3 e 255 carateres',
          },
        },
      },
    },
    {
      tableName: 'Users',
      hooks: {
        beforeCreate: hashPassword,
        beforeUpdate: hashPassword,
      },
      indexes: [
        {
          unique: true,
          fields: ['email'],
        },
      ],
      /* instanceMethods: {
        // generateHash: function(password) {
        //     return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
        // },
        comparePassword(password) {
          return bcrypt.compareSync(password, this.password);
        },
      }, */
    },
  );

  User.prototype.comparePassword = function comparePassword(password) {
    return bcrypt.compare(password, this.password);
  };
  /*
  User.beforeCreate = hashPassword;

  User.beforeUpdate = hashPassword;

  User.beforeBulkUpdate = hashPassword;
*/
  return User;
};
