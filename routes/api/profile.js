const express = require('express');
const router = express.Router();
const config = require('config');
const { check, validationResult } = require('express-validator');
const multer = require('multer');
const cloudinary = require('cloudinary');
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// ----------------------- IMAGE UPLOAD ----------------------- //
//Configure image upload
const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});
const imageFilter = function (req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error('Only image files are accepted!'), false);
  }
  cb(null, true);
};
const upload = multer({ storage: storage, fileFilter: imageFilter });
cloudinary.config({
  cloud_name: config.get('CLOUD_NAME'),
  api_key: config.get('CLOUDINARY_API_KEY'),
  api_secret: config.get('CLOUDINARY_API_SECRET'),
});

// @route    POST api/profile/upload
// @desc     upload image
// @access   Private
router.post('/upload', auth, upload.single('image'), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const profileFields = {};
  profileFields.user = req.user.id;

  try {
    let profile = await Profile.findOne({
      user: req.user.id,
    });

    // If profile exists
    if (profile) {
      // If user already has an avatar
      if (profile.avatar) {
        cloudinary.v2.uploader.destroy(profile.avatar);
      }
      cloudinary.v2.uploader.upload(req.file.path, async (err, result) => {
        if (err) {
          req.json(err.message);
        }

        profileFields.avatar = result.public_id;

        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        await profile.save();
      });
    }

    // Create new profile if one is not found
    if (!profile) {
      cloudinary.v2.uploader.upload(req.file.path, async (err, result) => {
        if (err) {
          req.json(err.message);
        }

        profileFields.avatar = result.public_id;

        profile = new Profile(profileFields);
        await profile.save();
      });
    }

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// ----------------------- END IMAGE UPLOAD ----------------------- //

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post('/', auth, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { bio, birthday, city, state, country } = req.body;

  // Create profile object
  const profileFields = {};
  profileFields.user = req.user.id;

  if (bio) profileFields.bio = bio;
  if (birthday) profileFields.birthday = birthday;
  if (city) profileFields.city = city;
  if (state) profileFields.state = state;
  if (country) profileFields.country = country;

  try {
    let profile = await Profile.findOne({
      user: req.user.id,
    });

    if (profile) {
      // If profile exists, update profile
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );

      return res.json(profile);
    }

    // Create new profile if one is not found
    profile = new Profile(profileFields);

    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//@route    GET api/profile
//@desc     Get all profiles
//@access   Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', [
      'firstname',
      'lastname',
    ]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['firstname', 'lastname']);

    if (!profile) return res.status(400).json({ msg: 'Profile not found' });

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    if (error.kind == 'ObjectId') {
      return res.status(400).json({ mgs: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

//@route    DELETE api/profile
//@desc     Delete profile, user, and posts
//@access   Private

router.delete('/', auth, async (req, res) => {
  try {
    // Remove users posts TODO
    await Post.deleteMany({ user: req.user.id });
    //Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    //Remove user
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: 'User deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
