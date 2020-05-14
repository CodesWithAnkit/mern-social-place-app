const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error');
const User = require('../models/user');

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, '-password');
  } catch (err) {
    const error = new HttpError(
      'Fetching users failed, please try again later.',
      500
    );
    return next(error);
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid Input Passed please check the value', 422)
    );
  }
  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    const error = new HttpError(
      'Singing Failed please try again later, Or check the details',
      500
    );

    return next(error);
  }
  if (existingUser) {
    const error = new HttpError('User Exist already, Please login', 422);
    return next(error);
  }

  const createUser = new User({
    name,
    email,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
    password,
    places: [],
  });

  try {
    await createUser.save();
  } catch (err) {
    const error = new HttpError('Singing Up user failed, Try again later');
    return next(error);
  }

  res.status(201).json({ users: createUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    const error = new HttpError(
      'Login in Failed please try again later, Or check the details',
      500
    );

    return next(error);
  }
  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError('Invalide Password and User', 401);
    return next(error);
  }

  res.json({ message: 'Logged In!!!' });
};

exports.getUsers = getUsers;
exports.login = login;
exports.signup = signup;
