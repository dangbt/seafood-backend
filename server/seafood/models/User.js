const jwt = require('jsonwebtoken');
const UserDB = require('../schemas/User');

const { jwtSecretKey } = require('../config');

class User {
  async _mapModels(usersDB) {
    return usersDB.map((user) => {
      const { _id, fullName, username, role, phone, email } = user;

      return {
        id: _id,
        fullName,
        username,
        role,
        phone,
        email
      };
    });
  }

  async _mapModel(userDB = {}) {
    const { _id, fullName, username, role, phone, email } = userDB;

    return {
      id: _id,
      fullName,
      username,
      role,
      phone,
      email
    };
  }

  async create(userRequest) {
    const { fullName, username, password, phone, email } = userRequest;
    const existedUser = await this.findUserByUsername(userRequest);
    if (!existedUser) {
      const user = new UserDB({
        fullName,
        username,
        password,
        phone,
        email
      })
      return user.save()
      .then(data =>  this._mapModel(data))
      .catch((err) => {
        throw new Error(err);
      });
    }
    throw new Error('User existed');
  }

//   async sendInviteUserEmail(user) {
//     const target = { email: user.username };
//     Mailer.send('invite', target, 'Rabinesite — You’re Invited!', {
//       clientUrl,
//       fullName: user.fullName,
//       email: user.username
//     });
//   }

  async findUserByUsername(user) {
    return UserDB.findOne({ username: user.username })
      .then(data => data)
      .catch((err) => {
        throw new Error(err);
      });
  }

//   async requestResetPassword(email) {
//     const existedUser = await this.findUserByUsername({ username: email });

//     if (existedUser) {
//       const resetToken = jwt.sign(
//         { email },
//         jwtSecretKey,
//         { algorithm: 'HS256', expiresIn: '1h' }
//       );
//       const target = { email };

//       Mailer.send(
//         'reset-password',
//         target,
//         'Rabinesite - Please reset your password',
//         {
//           clientUrl,
//           fullName: existedUser.fullName,
//           email,
//           resetToken
//         }
//       );
//       return resetToken;
//     }
//     throw new Error('User not existed');
//   }

//   async resetPassword(newPassword, token) {
//     try {
//       const decoded = await jwt.verify(token, jwtSecretKey);
//       const { email } = decoded;

//       return UserDB.update(
//         { username: email },
//         { $set: { password: newPassword } },
//         { new: true }
//       )
//       .then(data => data)
//       .catch((err) => {
//         throw new Error(err);
//       });
//     } catch (err) {
//       throw new Error(err.message);
//     }
//   }

  async list(filter) {
    const query = { deleted: false };
    const { name } = filter;

    if (name && typeof name === 'string') {
      query.fullName = { $regex: name };
    }

    return UserDB.find(query)
      .then(data => this._mapModels(data))
      .catch((err) => {
        throw new Error(err);
      });
  }
}

module.exports = User;