module.exports = function(app, passport, db, ObjectId, multer) {

  // normal routes ===============================================================

  // show the home page (will also have our login links)

  app.get('/', function(req, res) {
    db.collection('stories').find().toArray((err, result) => {
      if (err) return console.log(err)
      res.render('index.ejs', {
        stories: result,
      })
    })
  });
  // PROFILE SECTION =========================
  app.get('/profile', isLoggedIn, function(req, res) {
    var uId = ObjectId(req.session.passport.user)
    var uName
    db.collection('users').find({
      "_id": uId
    }).toArray((err, result) => {
      if (err) return console.log(err)
      uName = result[0].local.username
      db.collection('stories').find({
        "username": uName
      }).toArray((err, result) => {
        if (err) return console.log(err)
        console.log(req.user);
        res.render('profile.ejs', {
          user: req.user,
          stories: result
        })
      })
    });
  })
  // //---------------------------------------
  // // comments
  // //---------------------------------------
  app.put('/updateComment', (req, res) => {
  db.collection('feed')
    .findOneAndUpdate({
      userPosted: req.body.userPosted,
      feedMsg: req.body.feedMsg,
      feedDate: req.body.feedDate
    }, {
      $addToSet: {
        comments: [req.body.currentUser, req.body.comment]
      }
    }, {
      sort: {
        _id: -1
      },
      upsert: true
    }, (err, result) => {
      if (err) return res.send(err)
      res.send(result)
    })
})
app.post('/postFromFeed', (req, res) => {
  var uId = ObjectId(req.session.passport.user)
  var uName
  var proPic
  db.collection('users').find({
    "_id": uId
  }).toArray((err, result) => {
    if (err) return console.log(err)
    uName = result[0].local.username
    proPic = result[0].local.imageUrl
    db.collection('feed').save({
      userPostedId: uId,
      userPosted: uName,
      userProPic: proPic,
      feedMsg: req.body.feedMsg,
      feedDate: date + ' ' + time,
      favoritedBy: [],
      comments: []
    }, (err, result) => {
      if (err) return console.log(err)
      console.log('saved to database')
      res.redirect('/feed')
    })
  })
})
  // //---------------------------------------
  // // IMAGE CODE
  // //---------------------------------------
  // var storage = multer.diskStorage({
  //     destination: (req, file, cb) => {
  //       cb(null, 'public/img/uploads')
  //     },
  //     filename: (req, file, cb) => {
  //       cb(null, file.fieldname + '-' + Date.now() + ".png")
  //     }
  // });
  // var upload = multer({storage: storage});
  //
  // app.post('/up', upload.single('file-to-upload'), (req, res, next) => {
  //
  //     insertDocuments(db, req, '../public/img/uploads/' + req.file.filename, () => {
  //         //db.close();
  //         //res.json({'message': 'File uploaded successfully'});
  //         res.redirect('/profile')
  //     });
  // });
  //
  // var insertDocuments = function(db, req, filePath, callback) {
  //     var collection = db.collection('users');
  //     var uId = ObjectId(req.session.passport.user)
  //     collection.findOneAndUpdate({"_id": uId}, {
  //       $set: {
  //         profileImg: filePath
  //       }
  //     }, {
  //       sort: {_id: -1},
  //       upsert: false
  //     }, (err, result) => {
  //       if (err) return res.send(err)
  //       callback(result)
  //     })
  //     // collection.findOne({"_id": uId}, (err, result) => {
  //     //     //{'imagePath' : filePath }
  //     //     //assert.equal(err, null);
  //     //     callback(result);
  //     // });
  // }
  //USER PROFILE =============================================

  app.get('/userPage/:username', isLoggedIn, function(req, res) {
  console.log(req.params.username);
  var uName = req.params.username;
  console.log(uName);
  db.collection('stories').find({"username": uName}).toArray((err, result) => {
    if (err) return console.log(err)
    res.render('userPage.ejs', {
      username : uName,
      stories: result,
      user: req.user
    })
  });
})
  // PROFILE SECTION (CREATE)=========================
  app.get('/creation', isLoggedIn, function(req, res) {
    db.collection('stories').find().toArray((err, result) => {
      if (err) return console.log(err)
      res.render('creation.ejs', {
        user: req.user,
        stories: result
      })
    })
  });
  // SEARCH BY GENRE=========================
  app.get('/Romantic', isLoggedIn, function(req, res) {
    db.collection('stories').find().toArray((err, result) => {
      if (err) return console.log(err)
      res.render('Romantic.ejs', {
        user: req.user,
        stories: result
      })
    })
  });
  app.get('/Horror', isLoggedIn, function(req, res) {
    db.collection('stories').find().toArray((err, result) => {
      if (err) return console.log(err)
      res.render('Horror.ejs', {
        user: req.user,
        stories: result
      })
    })
  });
  app.get('/Comedy', isLoggedIn, function(req, res) {
    db.collection('stories').find().toArray((err, result) => {
      if (err) return console.log(err)
      res.render('Comedy.ejs', {
        user: req.user,
        stories: result
      })
    })
  });
  app.get('/Si-Fi', isLoggedIn, function(req, res) {
    db.collection('stories').find().toArray((err, result) => {
      if (err) return console.log(err)
      res.render('Si-Fi.ejs', {
        user: req.user,
        stories: result
      })
    })
  });
  app.get('/Adventure', isLoggedIn, function(req, res) {
    db.collection('stories').find().toArray((err, result) => {
      if (err) return console.log(err)
      res.render('Adventure.ejs', {
        user: req.user,
        stories: result
      })
    })
  });
  app.get('/Mystery', isLoggedIn, function(req, res) {
    db.collection('stories').find().toArray((err, result) => {
      if (err) return console.log(err)
      res.render('Mystery.ejs', {
        user: req.user,
        stories: result
      })
    })
  });
  app.get('/Fan-Fiction', isLoggedIn, function(req, res) {
    db.collection('stories').find().toArray((err, result) => {
      if (err) return console.log(err)
      res.render('Fan-Fiction.ejs', {
        user: req.user,
        stories: result
      })
    })
  });
  // PROFILE Delete Story (CREATE)=========================
  app.delete('/deleteStories', (req, res) => {
    db.collection('stories').findOneAndDelete({
      stories: req.body.stories,
      user: req.session.user
    }, (err, result) => {
      if (err) return res.send(500, err)
      res.send('Message deleted!')
    })
  })
  // Posting Books ============================
  app.get('/read', function(req, res) {
    db.collection('stories').find().toArray((err, result) => {
      if (err) return console.log(err)
      res.render('read.ejs', {
        user: req.user,
        stories: result
      })
    })
  });
  // LOGOUT ==============================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // message board routes ===============================================================

  app.post('/stories', (req, res) => {
    var uId = ObjectId(req.session.passport.user)
    console.log(uId + "UIDDDDDDD");
    var uName
    var newDate= new Date()
    db.collection('users').find({
      "_id": uId
    }).toArray((err, result) => {
      if (err) return console.log(err)
      uName = result[0].local.username
      db.collection('stories').save({
        genre: req.body.genre,
        username: uName,
        title: req.body.title,
        stories: req.body.stories,
        thumbUp: 0,
        thumbDown: 3,
        postStory: false,
        timeStamp: newDate.toString()
      }, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/profile')
      })
    })
  })
  app.get('/readStories/:stories_id', function(req, res) {
    console.log(req.params.stories_id);
    var uId = ObjectId(req.params.stories_id)
    db.collection('stories').find({
      "_id": uId
    }).toArray((err, result) => {
      if (err) return console.log(err)
      res.render('readStories.ejs', {
        stories: result
      })
    })
  });
  app.get('/edit/:stories_id', function(req, res) {
    console.log(req.params.stories_id);
    var uId = ObjectId(req.params.stories_id)
    db.collection('stories').find({
      "_id": uId
    }).toArray((err, result) => {
      if (err) return console.log(err)
      res.render('edit.ejs', {
        stories: result,
        story: result[0],
        user: req.user
      })
    })
  });
  app.put('/thumbUp', (req, res) => {
    db.collection('stories')
      .findOneAndUpdate({
        username: req.body.username,
        stories: req.body.stories
      }, {
        $set: {
          thumbUp: req.body.thumbUp + 1
        }
      }, {
        sort: {
          _id: -1
        },
        upsert: false
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
  })
  app.put('/thumbDown', (req, res) => {
    db.collection('stories')
      .findOneAndUpdate({
        username: req.body.username,
        stories: req.body.stories
      }, {
        $set: {
          thumbDown: req.body.thumbDown + 1
        }
      }, {
        sort: {
          _id: -1
        },
        upsert: false
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
  })
  app.put('/postStory', (req, res) => {
    db.collection('stories')
      .findOneAndUpdate({
        username: req.body.username,
        stories: req.body.stories
      }, {
        $set: {
          postStory: true
        }
      }, {
        sort: {
          _id: -1
        },
        upsert: false
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
  })

  app.put('/edit/updateStory', (req, res) => {
    console.log(req.body);
    db.collection('stories')
      .findOneAndUpdate({
        username: req.body.username,
        timeStamp: req.body.timeStamp
      }, {
        $set: {
          stories: req.body.stories,
          title: req.body.title,
          genre: req.body.genre
        }
      }, {
        sort: {
          _id: -1
        },
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
  })


  // =============================================================================
  // AUTHENTICATE (FIRST LOGIN) ==================================================
  // =============================================================================

  // locally --------------------------------
  // LOGIN ===============================
  // show the login form
  app.get('/login', function(req, res) {
    res.render('login.ejs', {
      message: req.flash('loginMessage')
    });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash stories
  }));

  // SIGNUP =================================
  // show the signup form
  app.get('/signup', function(req, res) {
    res.render('signUp.ejs', {
      message: req.flash('signupMessage')
    });
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash stories
  }));

  // =============================================================================
  // UNLINK ACCOUNTS =============================================================
  // =============================================================================
  // used to unlink accounts. for social accounts, just remove the token
  // for local account, remove email and password
  // user account will stay active in case they want to reconnect in the future

  // local -----------------------------------
  app.get('/unlink/local', isLoggedIn, function(req, res) {
    var user = req.user;
    user.local.email = undefined;
    user.local.password = undefined;
    user.save(function(err) {
      res.redirect('/profile');
    });
  });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect('/');
}
