const express = require("express");
const jwt = require("jsonwebtoken");
const httpStatusCode = require("http-status-codes");

const config = require("../config/env/config");

const authClientToken = async (req, res, next) => {
  let token = req.header["x-access-token"];

  if (!token)
    return res.status(httpStatusCode.UNAUTHORIZED).json({
      errors: [{
        msg: "No token provided"
      }]
    });

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err)
      return res.status(httpStatusCode.UNAUTHORIZED).json({
        errors: [{
          msg: "Invalid token",
          err
        }]
      });
  });

  return next();
};

module.exports = {
  authClientToken
};