const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const passwordValidator = require('password-validator');

const User = require('../../models/User');

// PASSWORD VALIDATOR SCHEMA
// PW requirements: at least 8 chars long but max 64; min 1 uppercase; min 1 lowercase; min 1 digits; no whitespaces
const pwSchema = new passwordValidator();
pwSchema
  .is()
  .min(8)
  .is()
  .max(64)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits()
  .has()
  .not()
  .spaces();

// @route POST api/users
// @desc Register user route
// @access Public
router.post(
  '/',
  [
    check('firstname', 'First Name is required').not().isEmpty(),
    check('lastname', 'Last Name is required').not().isEmpty(),
    check('email', 'Please include valid email').isEmail(),
    check(
      'password',
      'Please enter valid password (Minimum 8 characters with one uppercase letter and one number.)'
    ).custom((value) => {
      const isPwValid = pwSchema.validate(value);

      // When at least one requirement is not met
      if (!isPwValid) {
        throw new Error(
          `Password does not meet requirements! (Minimum 8 characters with one uppercase letter and one number.)`
        );
      }

      return true;
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstname, lastname, email, password } = req.body;

    try {
      // Check if user exists
      let user = await User.findOne({ email });

      // If user exists, return an error
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      // Create user document based based on model 'User'
      user = new User({
        firstname,
        lastname,
        email,
        password,
      });

      // Encrypt password
      const salt = await bcrypt.genSalt();

      user.password = await bcrypt.hash(password, salt);
      await user.save();

      //Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        //change expiresIn value to 3600 before deploy to prod
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.mesage);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
