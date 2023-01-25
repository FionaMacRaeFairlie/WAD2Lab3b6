const nedb = require("nedb");
const express = require("express");
const path = require("path");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "./public")));

const db = new nedb({ filename: "emp.db", autoload: true });
console.log("db created");

const mustache = require('mustache-express');
app.engine('mustache', mustache());
app.set('view engine', 'mustache');

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});
//add
app.post("/add", function (req, res) {
  db.insert({ name: req.body.name }, function (err, newDoc) {
    if (err) {
      console.log("error", err);
    } else {
      console.log("document inserted", newDoc);
    }
  });
});
//View
app.post("/view", function (req, res) {
  db.find({ name: req.body.name }, function (err, docs) {
    if (err) {
      console.log("error");
    } else {
      console.log("documents retrieved: ", docs);
      res.render('employeeData', {
        'employee': docs
     });
    
    }
  });
});
//UPDATE
app.post("/update", function (req, res) {
  db.update(
    { _id: req.body._id  },
    { $set: { name: req.body.name  } },
    {},
    function (err, docs) {
      if (err) {
        console.log("error updating documents", err);
      } else {
        console.log(docs, "documents updated");
      }
    }
  );
});
//SHOW ALL
app.post("/showAll", function (req, res) {
  db.find({}, {}, function (err, docs) {
    if (err) {
      console.log("error deleting document");
    } else {
      console.log(docs);
      res.render('employeeData', {
        'employee': docs
     });
    }
  });
});
//DELETE
app.post("/delete", function (req, res) {
  db.remove({ _id: req.body.id  }, {}, function (err, docsRem) {
    if (err) {
      console.log("error deleting document");
    } else {
      console.log(docsRem, "document removed from database");
    }
  });
});

app.listen(3000,() =>{
  console.log("Server listening on port: 3000");
});


// const express = require("express");
// const path = require("path");

// const app = express();
// app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, "./public")));

// const nedb= require('nedb');
// const db= new nedb({filename:'emp.db', autoload:true});

// db.insert({ name:'Ellie Bean'}, function(err, newDoc){
//   if(err) {
//       console.log('error',err);
//   } else {
//       console.log('document inserted',newDoc);
//   }
// }); 


// app.listen(3000,() =>{
//   console.log("Server listening on port: 3000");
// });

// db.find({name:'Fred Flintstone'},function(err,docs){
//   if(err){
//       console.log('error');
//   }
//   else{ console.log('documents retrieved: ',docs);
//   }
// })

// db.update({name:'Fred Flintstone'},{$set:{'name':'Wilma Flintstone'} },{},function(err,docs){
//   if(err){
//       console.log('error updating documents',err);
//   } else {
//       console.log(docs,'documents updated')
//   }
// })

// db.remove({name:'Ellie Bean'},{multi: true}, function(err,docsRem){
//   if(err){
//       console.log('error deleting document');
//   } else {
//       console.log(docsRem, 'document removed from database')
//   }
// })

