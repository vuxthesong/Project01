import db from "../models/index";
import CRUDService from "../services/CRUDService";

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render("homePage.ejs", { data: JSON.stringify(data) });
  } catch (error) {
    console.log(error);
  }
};

let getCRUD = (req, res) => {
  return res.render("crud.ejs");
};

let postCRUD = async (req, res) => {
  let allUser = await CRUDService.createNewUser(req.body);
  return res.render("displayCRUD.ejs", {
    data: allUser,
  });
};

let displayGetCRUD = async (req, res) => {
  let data = await CRUDService.getAllUser();
  return res.render("displayCRUD.ejs", {
    data: data,
  });
};

let getEditCRUD = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let userData = await CRUDService.getUserById(userId);
    return res.render("editCRUD.ejs", {
      userData: userData,
    });
  } else return res.send("User not found");
};

let updateCRUD = async (req, res) => {
  let data = req.body;
  let allUser = await CRUDService.updateUser(data);
  return res.render("displayCRUD.ejs", {
    data: allUser,
  });
};

let deleteCRUD = async (req, res) => {
  let id = req.query.id;
  console.log(id);
  let allUser = await CRUDService.deleteUserById(id);
  return res.render("displayCRUD.ejs", {
    data: allUser,
  });
};

module.exports = {
  getHomePage: getHomePage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  displayGetCRUD: displayGetCRUD,
  getEditCRUD: getEditCRUD,
  updateCRUD: updateCRUD,
  deleteCRUD: deleteCRUD,
};
