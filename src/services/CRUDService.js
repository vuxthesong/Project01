import db from "../models/index";
import bcrypt from "bcryptjs";
var salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        phonenumber: data.phonenumber,
        address: data.address,
        gender: data.gender === "1" ? true : false,
        roleId: data.roleId,
      });
      let getAllUser = await db.User.findAll({
        raw: true,
      });
      resolve(getAllUser);
    } catch (error) {
      reject(error);
    }
  });
};

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      var hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (error) {
      reject(error);
    }
  });
};

let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        raw: true,
      });
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};

let getUserById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: id },
        raw: true,
      });
      if (user) {
        resolve(user);
      } else {
        resolve({});
      }
    } catch (error) {
      reject(error);
    }
  });
};

let updateUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: data.id },
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        user.gender = data.gender === "1" ? true : false;
        user.roleId = data.roleId;
        await user.save();
        let getAllUser = await db.User.findAll({
          raw: true,
        });
        resolve(getAllUser);
      } else {
        resolve();
      }
    } catch (error) {
      reject(error);
    }
  });
};

let deleteUserById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: id },
      });
      if (user) {
        await user.destroy();
        let getAllUser = await db.User.findAll({
          raw: true,
        });
        resolve(getAllUser);
      } else {
        resolve();
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createNewUser: createNewUser,
  getAllUser: getAllUser,
  getUserById: getUserById,
  updateUser: updateUser,
  deleteUserById: deleteUserById,
};
