import db from "../models/index";
import CURDService from "../services/CURDService";

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
  let mess = await CURDService.createNewUser(req.body);
  console.log(mess);
  return res.send("post CRUD");
};

let displayGetCRUD = async (req, res) => {
  let data = await CURDService.getAllUser();
  console.log("---------------");
  console.log(data);
  console.log("---------------");

  return res.render("displayCRUD.ejs", {
    data: data,
  });
};

module.exports = {
  getHomePage: getHomePage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  displayGetCRUD: displayGetCRUD,
};
