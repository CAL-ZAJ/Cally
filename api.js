const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://zajilbot:0987367305@cluster0.yndzbhw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true
});

const userSchema = new mongoose.Schema({
  uuid: String,
  firstName: String,
  userId: Number,
  points: {
    type: Number,
    default: 25
  },
  mohtk: String,
  user: String,
  sex: String,
  Dawa: Number,
  age: String,
  referralLink: String,
  notifications: String,
  ban: { type: Number, default: 0 },
  saveTime: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
// مسار API لجلب معلومات المستخدم حسب userId
router.get('/user/:userId', async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.userId });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
