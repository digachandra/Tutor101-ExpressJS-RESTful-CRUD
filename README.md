<img src=".asset/.banner.png" width="100%" />

### Tutorial 101: ExpressJS RESTful CRUD with Mongoose

Hi! welcome to Tutorial 101..
in this tutorial we will learn about how to build RESTful API CRUD with ExpressJS and Mongoose. So let's get started!

If you missing how to get started with ExpressJS, please refer to [Tutorial 101: Basic HTML CSS with Express JS & EJS](https://github.com/digachandra/Tutor101-basic-HTML-CSS-with-ExpressJS-and-EJS "Tutorial 101: Basic HTML CSS with Express JS & EJS")

#### 1. Installation

Remember we need to install required modules first

```
npm install -S expres body-parser
npm install -S mongodb mongoose
npm install -S cors
npm install -S lodash
```

**Note** you can learn more about **lodash** by following this [link](https://lodash.com/ "Lodash")

#### 2. Build skeleton

As an example, we will build an API to manipulate information for **Object of Fruits**

```
├── config
│   └── database.js
├── controllers
│   └── fruits.js
├── models
│   └── fruits.js
├── routes
│   └── api.js
├── .gitignore
└── index.js
```

#### 3. Init index.js

```
const express = require('express'),
      bodyParser = require('body-parser'),
      path = require('path'),
      mongoose = require('mongoose'),
      cors = require('cors')

var app = express()
var port = process.env.PORT || 9000
var configDB = require('./config/database.js')

mongoose.connect(configDB.url)
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser())

// Set starting routes
app.use('/',require('./routes/api'))

// Set port
app.listen(port)
console.log(`Live on port ${port}`)
```

#### 4. Init database config (config/database.js)

```
module.exports = {
  'url': 'mongodb://localhost/tutor101_restful_crud'
}
```

#### 5. Init model (models/fruits.js)

```
var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var fruitSchema = mongoose.Schema({
    name: String
});

module.exports= mongoose.model('fruits', fruitSchema)
```

#### 6. Init controller (controllers/fruits.js)

```
const models = require('../models/fruits'),
      _ = require('lodash')

module.exports = {
  createOne:createOne,
  findAll:findAll,
  findOne:findOne,
  updateOne:updateOne,
  deleteOne:deleteOne
}

function createOne(req, res, next){
  models.findOne({
    name:req.body.name
  },(err, record) => {
    if(err) throw err
    if(!_.isEmpty(record)){
      res.status(400).json({error:"Name already exists"})
    } else {
      var record = new models({
        name:req.body.name
      })
      record.save()
      res.status(200).json(record)
    }
  })
}

function findAll(req, res, next){
  models.find({},(err, record) => {
    if(err) throw err
    if(!_.isEmpty(record)){
      res.status(200).json(record)
    } else {
      res.status(204).json({error:"Cannot find any record"})
    }
  })
}

function findOne(req, res, next){
  models.findOne({
    _id:req.params.id
  },(err, record) => {
    if(err) throw err
    if(!_.isEmpty(record)){
      res.status(200).json(record)
    } else {
      res.status(400).json({error:"Record does not exist"})
    }
  })
}

function updateOne(req, res, next){
  models.findOne({
    _id:req.params.id
  },(err, record) => {
    if(err) throw err
    if(record){
      record.name = req.body.name
      record.save((err)=> {
        if(err) throw err
        res.status(200).json(record)
      })
    } else {
      res.status(400).json({error:"Record does not exist"})
    }
  })
}

function deleteOne(req, res, next){
  models.findOne({
    _id:req.params.id
  },(err, record) => {
    if(err) throw err
    if(record){
      record.remove((err)=> {
        if(err) throw err
        res.status(200).json(record)
      })
    } else {
      res.status(400).json({error:"Record does not exist"})
    }
  })
}
```

#### 7. Init route (routes/api.js)

```
const express = require('express')
const router = express.Router()
const fruits = require('../controllers/fruits')

router.get('/fruits/', fruits.findAll)
router.get('/fruits/:id', fruits.findOne)
router.post('/fruits', fruits.createOne)
router.put('/fruits/:id', fruits.updateOne)
router.delete('/fruits/:id', fruits.deleteOne)

module.exports = router
```

#### 8. Start MongoDb

If you do not know how to get started with MongoDB, you can access these following links

1. [MongoDB Documentation](https://docs.mongodb.com/ "MongoDB documentation")
2. [MongoDB Tutorial for Beginners](https://www.tutorialspoint.com/mongodb/index.htm "MongoDB Tutorial for Beginners")

#### 9. Start the engine!

```
node index.js
```

#### 10. Happy testing!

For testing method, we can use [Postman](https://www.getpostman.com/ "Postman Website")
