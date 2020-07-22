const { v4: uuidv4 } = require('uuid');

const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const User = require('../models/user');
const user = require('../models/user');

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, '-password');
  } catch (err) {
    const error = new HttpError(
      'Fetching user failed, pls try againg later!',
      500
    );
    return next(error);
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);

    return next(
      new HttpError('Invalid input passed, pls check your data!', 422)
    );
  }
  const { name, email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError('Signing Up failed, pls try again later!', 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError('User exists already, pls login instead', 422);
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    password,
    image:
      'https://cdn.pixabay.com/photo/2015/01/08/18/29/entrepreneur-593358_1280.jpg',
    places: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError('Signing Up failed,please try again.', 500);
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError('Logging failed, pls try again later!', 500);
    return next(error);
  }

  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError(
      'Invalid credentials, could not log you in!',
      401
    );
    return next(error);
  }

  res.json({ message: 'Logged In!' });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
