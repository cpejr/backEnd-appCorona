const express = require("express");
const { celebrate } = require("celebrate");
const routes = express.Router();

const adminController = require("./controllers/adminController");
const adminValidator = require("./validators/adminValidator");

const categController = require("./controllers/categController");
const categValidator = require("./validators/categValidator");

const counterController = require("./controllers/counterController");
const counterValidator = require("./validators/counterValidator");

const driveController = require("./controllers/driveController");

const ongController = require("./controllers/ongController");
const ongValidator = require("./validators/ongValidator");

const sessionController = require("./controllers/sessionController");
const sessionValidator = require("./validators/sessionValidator");

const {authenticateToken} = require("./middleware/authentication");

const ongDB = require("./models/ongModel");
const imageUpload = require("./middleware/imageUpload");
const authentication = require("./middleware/authentication");

//ONGS
routes.post("/ongs", imageUpload("imageFile"), celebrate(ongValidator.create), ongController.create);
routes.put("/ong/:id", celebrate(ongValidator.update), authenticateToken, ongController.update);
routes.get("/ongs", celebrate(ongValidator.index), ongController.index);
routes.get("/ongsCount", celebrate(ongValidator.totalApproved), ongController.totalApproved);

//COUNT
routes.post("/registerAcess/:id", celebrate(counterValidator.registerCount), counterController.registerCount);
routes.get("/monthViews", counterController.getRecentCount);
routes.get("/views/:id", celebrate(counterValidator.getOngCount), counterController.getOngCount);

//Forgot Password
routes.post("/session", celebrate(sessionValidator.login), sessionController.login);
routes.post("/forgotPassword", celebrate(sessionValidator.forgotPassword), sessionController.forgotPassword);
routes.get("/validateCredentials", driveController.validateCredentials);
routes.get("/verify", sessionController.verifyToken);

//ADMIN
routes.get("/admin", celebrate(adminValidator.index), authenticateToken, adminController.index);
routes.put("/admin/:ongId", celebrate(adminValidator.update), authenticateToken, adminController.update);
routes.delete("/admin/:ongId", celebrate(adminValidator.delete), authenticateToken, ongController.delete);

//CATEGORY
routes.get("/categ", celebrate(categValidator.index), categController.index);
routes.post("/categ", celebrate(categValidator.create), authenticateToken, categController.create);
routes.put("/categ", celebrate(categValidator.categorize), authenticateToken, categController.categorize);
routes.delete("/categ/:name", celebrate(categValidator.delete), authenticateToken, categController.delete);

//CATEGORY SEARCH
//Will find all categories of an Ong with its ID as a param.
routes.get("/categ/:ongId", celebrate(categValidator.searchCategs), categController.searchCategs);
//Will find all categories of an Ong with its ID as a param.
routes.get("/ongcateg", celebrate(categValidator.searchOngs), categController.searchOngs);

//FIREBASE ACCOUNT
routes.post("/giveAccount", authenticateToken, celebrate(ongValidator.grantAccounts), ongController.grantAccounts);

module.exports = routes;
