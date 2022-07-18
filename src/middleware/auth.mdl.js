// const jwt = require("jsonwebtoken");
// const { User } = require('../models/user.model');
// const makeMongoDbService = require('../services/mongoDbService')({ model: User});

// exports.auth = async (req, res, next) => {
//   const token = req.header("Authorization");
//   if (!token) return res.status(401).json("Access Denied, no token provided");
//   try {
//     const decod = jwt.verify(token, process.env.SECRET_STRING);
//     req.user = decod;
//     const checkUser = await makeMongoDbService.getSingleDocumentById(req.user._id);
//     if (!checkUser) return res.status(404).json("No user found with this token");
//     if (checkUser && !checkUser?.isVerify) return res.status(422).json("User is not verified");
//     if (checkUser && checkUser?.isBanned) return res.status(422).json("Access Denied to use application");
//     next();
//   } catch (err) {
//     res.status(400).json(err);
//   }
// };