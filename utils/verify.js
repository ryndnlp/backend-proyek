const express = require("express");
const { ObjectId } = require("mongodb");

const User = require("../models/User");

const verifyMember = async (req, res, next) => {
  const cookie =
    req.cookies.authCookie && req.cookies.authCookie.length == 24
      ? req.cookies.authCookie
      : undefined;

  const member = await User.exists({
    _id: ObjectId(cookie),
    type: "MEMBER",
  });
  if (!member) {
    const err = {
      code: 401,
      err: {
        name: "NotAllowed",
        message: "You don't have permission",
      },
    };
    res.status(401).json(err);
    return;
  }
  next();
};

const verifyAdmin = async (req, res, next) => {
  const cookie =
    req.cookies.authCookie && req.cookies.authCookie.length == 24
      ? req.cookies.authCookie
      : undefined;

  const admin = await User.exists({
    _id: ObjectId(cookie),
    type: "ADMIN",
  });
  if (!admin) {
    const err = {
      code: 401,
      err: {
        name: "NotAllowed",
        message: "You don't have permission",
      },
    };
    res.status(401).json(err);
    return;
  }
  next();
};

const verifyPetugas = async (req, res, next) => {
  const cookie =
    req.cookies.authCookie && req.cookies.authCookie.length == 24
      ? req.cookies.authCookie
      : undefined;

  const petugas = await User.exists({
    _id: ObjectId(cookie),
    type: "PETUGAS",
  });
  if (!petugas) {
    const err = {
      code: 401,
      err: {
        name: "NotAllowed",
        message: "You don't have permission",
      },
    };
    res.status(401).json(err);
    return;
  }
  next();
};

module.exports = { verifyMember, verifyAdmin, verifyPetugas };
