var mongoose    = require('mongoose');
var bcrypt      = require('bcrypt');
var findOrCreate = require('./plugins');
var Schema      = mongoose.Schema;

var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };

mongoose.Promise = global.Promise

var mongoConnectTo = process.env.MONGODDBBLINK || 'mongodb://localhost:27017/interpretameTest';
mongoose.connect(mongoConnectTo, options, function(err) {
  if (err) throw err;
});

var userSchema = mongoose.Schema({
  ref: {
    uid: String,
    username: String,
    slug: String,
    email: String,
    pic: String
  },
  challenge: Array,
  feedback: Array,
  log: Array,
  prets: Array,
  role: { type: Number, default: 0 },
  time: { type: Number, default: 30 },
  date: { type: Date, default: Date.now }
});

var tagSchema = mongoose.Schema({
  name: String,
  counter: { type: Number, default: 1 },
  videos: Array
})

var pretSchema = mongoose.Schema({
  author: { type : Schema.ObjectId, ref : 'user' },
  video: {
    id: String,
    thumb: String,
    title: String,
    desc: String
  },
  publish: {type: Boolean, default: false},
  eval: {
    adi: String,
    aut: String,
    cal: String,
    coh: String,
    con: String,
    ent: String,
    exp: String,
    fal: String,
    gra: String,
    ina: String,
    int: String,
    paus_c: String,
    paus_l: String,
    rel: String,
    sin: String,
    sup: String,
    voc: String,
    vol: String,
    notes: String
  },
  duration: Number,
  mark: Number,
  audio: String,
  tags: Array,
  feedback: {
    to: { type : Schema.ObjectId, ref : 'user' },
    completed: { type: Boolean, default: false },
    author: {
      _id: String,
      name: String,
      pic: String
    },
    picture: String,
    eval: {
      adi: String,
      aut: String,
      cal: String,
      coh: String,
      con: String,
      ent: String,
      exp: String,
      fal: String,
      gra: String,
      ina: String,
      int: String,
      paus_c: String,
      paus_l: String,
      rel: String,
      sin: String,
      sup: String,
      voc: String,
      vol: String,
      notes: String
    },
    mark: Number,
    pendingFlag: { type: Boolean, default: false },
    evalFlag: { type: Boolean, default: false },
  },
  feedbacks: Array,
  challenge: {
    to: { type : Schema.ObjectId, ref : 'user' },
    completed: { type: Boolean, default: false },
    acceptFlag: { type: Boolean, default: false },
  },
  removed: { type: Boolean, default: false }
});

var expSchema = mongoose.Schema({
  author: { type : Schema.ObjectId, ref : 'user' },
  expFrom: {
    exp: String,
    languaje: String
  },
  expTo: {
    exp: String,
    languaje: String
  },
  completed: Boolean,
  removed: { type: Boolean, default: false }
});

// Plugins
userSchema.plugin(findOrCreate);
tagSchema.plugin(findOrCreate);

module.exports = {
  User: mongoose.model('user', userSchema),
  Tag: mongoose.model('tag', tagSchema),
  Expression: mongoose.model('expression', expSchema),
  Pret: mongoose.model('pret', pretSchema)
};