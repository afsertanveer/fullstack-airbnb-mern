require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const mongoose = require('mongoose');
const path = require('path');
const User = require('./models/User');
const upload = require('./utils/multer');
const Place = require('./models/place');
const check = require('./utils/checkMiddleWare');
const Booking = require('./models/booking');
const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Replace with your frontend's URL
    credentials: true, // Enable credentials sharing
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

const bcryptSalt = bcrypt.genSalt(12);
// console.log('connection string:', process.env.MONGODB_CONNECTION_STRING);
mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

app.get('/test', (req, res) => {
  res.status(200).json('OK');
});

/// user apis starts ///

app.get('/profile', async (req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, data) => {
      if (err) {
        return res.status(403).json({ error: 'Invalid token' }); // Handle invalid token gracefully
      }
      return res.status(200).json(data); // Successfully return the decoded data
    });
  } else {
    return res
      .status(401)
      .json({ error: 'Authentication error: Token missing' }); // Handle missing token
  }
});

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const userPassword = await bcrypt.hash(password, 10);
  let user;
  try {
    user = new User({
      name,
      email,
      password: userPassword,
    });
    await user.save();
  } catch (error) {
    return res.status(422).json({ error });
  }
  return res.status(201).json(user);
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  let isExist;
  try {
    isExist = await User.findOne({ email });
  } catch (error) {
    return res.status(500).json('Internal asdasd Server Error');
  }
  if (isExist) {
    const isValidPassword = await bcrypt.compare(password, isExist.password);
    if (isValidPassword) {
      jwt.sign(
        { email: isExist.email, id: isExist._id, name: isExist.name },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) return res.status(500).json(err);
          return res.cookie('token', token).status(200).json(isExist);
        },
      );
    } else {
      return res.status(401).json('Wrong Credentials');
    }
  } else {
    return res.status(404).json('User Not Found');
  }
});

app.post('/logout', async (req, res) => {
  res.cookie('token', '').json(true);
});

/// user apis ends ///

//places api starts //

app.post('/upload-by-link', async (req, res) => {
  const { link } = req.body;

  if (!link) {
    return res.status(400).json({ error: 'No link provided' });
  }

  try {
    const newName = `photo-${Date.now()}.jpg`;
    const uploadPath = path.join(__dirname, 'uploads', newName);

    await imageDownloader.image({
      url: link,
      dest: uploadPath,
    });

    return res.status(200).json(newName);
  } catch (error) {
    console.error('Error downloading image:', error);
    return res.status(500).json({ error: 'Failed to download image' });
  }
});

app.post('/upload-photos', upload.array('photos', 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    let currentPath = req.files[i].path;
    currentPath =
      currentPath.split('uploads\\')[currentPath.split('uploads\\').length - 1];
    uploadedFiles.push(currentPath);
  }
  return res.json(uploadedFiles);
});

//add place

app.post('/places', async (req, res) => {
  let place;
  const {
    title,
    address,
    addedPhotoes,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;

  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, data) => {
      if (err) {
        return res.status(403).json({ error: 'Invalid token' }); // Handle invalid token gracefully
      }
      place = new Place({
        owner: data.id,
        title,
        address,
        description,
        photos: addedPhotoes,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
    });
  } else {
    return res
      .status(401)
      .json({ error: 'Authentication error: Token missing' }); // Handle missing token
  }
  try {
    await place.save();
  } catch (error) {
    return res.status(500).json('Could not add place');
  }
  return res.status(201).json(place);
});

//update place
app.put('/places/:id', check, async (req, res) => {
  let place;
  const {
    title,
    address,
    addedPhotoes,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  try {
    place = await Place.findByIdAndUpdate(
      { _id: req.params.id },
      {
        title,
        address,
        description,
        photos: addedPhotoes,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      },
      { new: true },
    );
  } catch (error) {
    return res.status(500).json('Update not possible');
  }
  res.status(201).json(place);
});

//all places
app.get('/all-places', async (req, res) => {
  // console.log(req.user);
  let data;
  try {
    data = await Place.find();
  } catch (error) {
    return res.status(500).json(error);
  }
  // console.log(data);
  return res.status(200).json(data);
});

//places by user
app.get('/places', check, async (req, res) => {
  // console.log(req.user);
  let data;
  try {
    data = await Place.find({ owner: req.user.id });
  } catch (error) {
    return res.status(500).json(error);
  }
  // console.log(data);
  return res.status(200).json(data);
});

app.get('/place/:id', check, async (req, res) => {
  const { id } = req.params;
  let data;
  const objId = new mongoose.Types.ObjectId(id);
  try {
    data = await Place.findOne({ _id: objId });
  } catch (error) {
    return res.status(500).json('cannot get the data');
  }
  return res.status(200).json(data);
});

//add a booking

app.post('/booking', check, async (req, res) => {
  const { checkIn, checkOut, numberOfGuests, name, phone, place, price } =
    req.body;
  let newEntry;
  try {
    newEntry = new Booking({
      checkIn,
      user: req.user.id,
      checkOut,
      numberOfGuests,
      name,
      phone,
      place,
      price,
    });
    await newEntry.save();
  } catch (error) {
    return res.status(500).json('Error while entrying data');
  }
  return res.status(201).json(newEntry);
});

//all bookings

app.get('/bookings', check, async (req, res) => {
  let data;

  try {
    data = await Booking.find({
      user: new mongoose.Types.ObjectId(req.user.id),
    }).populate('place');
  } catch (error) {
    return res.status(500).json('NO data');
  }
  return res.status(200).json(data);
});

//sing booking

app.get('/booking/:id', check, async (req, res) => {
  let data;
  try {
    data = await Booking.findById(req.params.id).populate('place');
  } catch (error) {
    return res.status(500).json('Error getting data');
  }
  return res.status(200).json(data);
});
app.listen(5011, () => {
  console.log('Listening to port 5011');
});
