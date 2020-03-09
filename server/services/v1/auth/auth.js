const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const httpStatusCodes = require("http-status-codes");
const chalk = require("chalk");

const {
  validationResult
} = require("express-validator");

const config = require("../../../config/env/config");
const userModel = require("../../../models/user");

const register = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(httpStatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: errors.array()
    });

  let {
    name,
    email,
    password
  } = req.body;

  let isEmailExists = await userModel.findOne({
    email: email
  });

  if (isEmailExists)
    return res.status(httpStatusCodes.CONFLICT).json({
      errors: [{
        msg: "email already exists"
      }]
    });

  let hashedPassword = await bcrypt.hash(password, 8);

  try {
    let user = await userModel.create({
      name,
      email,
      password: hashedPassword
    });

    if (!user) throw new error();

    return res.status(httpStatusCodes.CREATED).json({
      success: [{
        msg: "user registered successfully"
      }]
    });
  } catch (error) {
    console.log(chalk.red(error));
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
      error: [{
        msg: "there was a problem registering user"
      }]
    });
  }
};

const login = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(httpStatusCodes.UNPROCESSABLE_ENTITY).json({
      error: [{
        errors: errors.array()
      }]
    });

  let {
    email,
    password
  } = req.body;

  try {
    let isUserExist = await userModel.findOne({
      email: email
    });
    let isPasswordValid = await bcrypt.compare(password, isUserExist.password);

    if (!isUserExist || !isPasswordValid)
      return res.status(httpStatusCodes.UNAUTHORIZED).json({
        errors: [{
          msg: "invalid email/password"
        }]
      });

    let token = jwt.sign({
      id: isUserExist._id
    }, config.secret, {
      expiresIn: 86400
    });

    res.status(httpStatusCodes.OK).json({
      success: [{
        msg: "user login successful",
        email: email,
        token: token
      }]
    });
  } catch (error) {
    console.log(chalk.red(error));
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
      error: [{
        msg: "there was a problem login user in",
        error
      }]
    });
  }
};

module.exports = {
  register,
  login
}