/* Reading and writing data:
a General IO module to perform basic CRUD using MongoDB.
*/
const MongoClient = require('mongodb').MongoClient;
const mongoURL = require('./url');

//This is modelName arrays so people wont add stuff outside the scope off arrays
var modelsArray = ['guns','devModels','emails','keywords'];

//-- Writing to DB function: needs data in form of JS object and <modelName>
function writeItem(data,modelName) {
  if(modelsArray.includes(modelName)){
      console.log('Passed include if');

    const client = new MongoClient(mongoURL.url, { useNewUrlParser: true });
    client.connect(function(err) {
        if (err) {
          console.log('Connection error!');
          throw new Error(err);
        }
        const collection = client.db("test").collection(modelName);
        if (Array.isArray(data)) {
          collection.insertMany(data);
        } else {
          collection.insertOne(data);
        }
        client.close();
    })
  }else{
    console.log('No such model in DB!');
    throw new Error(`Error: model ${modelName} is not specified in your DB`);
  }
}

//-- Reading from DB function: needs callback function reference and <modelName> and optional object query
function readItem(callback,modelName,optionalQueryObj) {
  if(modelsArray.includes(modelName)){
    const client = new MongoClient(mongoURL.url, { useNewUrlParser: true });
    client.connect(function(err) {
        if (err) {
          console.log('Connection error!');
          throw new Error(err);
        }
        const collection = client.db("test").collection(modelName);
        if(optionalQueryObj){
          return collection.find(optionalQueryObj).toArray(callback);
        }else{
          return collection.find({}).toArray(callback);
        }
    })
  }else{
    console.log('No such model in DB!');
    throw new Error(`Error: model ${modelName} is not specified in your DB`);
  }
}

//--------------------- deleting from DB function: needs query and <modelName> -- wont be used in our project
function deleteItem(item,modelName) {
  if(modelsArray.includes(modelName)){
    const client = new MongoClient(mongoURL.url, { useNewUrlParser: true });
    client.connect(function(err) {
      const collection = client.db("test").collection(modelName);
      collection.deleteOne(item, function(err, r){
        if (err) {
          throw new Error(err)
        } else {
          var _id = item._id;
          console.log(`IO delete finished.`);
        }
      })
    })
  }else{
    console.log('No such model in DB!');
    throw new Error(`Error: model ${modelName} is not specified in your DB`);
  }
}


//-- Editing the DB function: needs <query> ex:{prop:value}, <porpChange> ex:{b:newValue} and <modelName>
function editItem(query,propChange,modelName){
  if(modelsArray.includes(modelName)){
    const client = new MongoClient(mongoURL.url, { useNewUrlParser: true });
    client.connect(function(err) {
      const collection = client.db("test").collection(modelName);
      collection.update(query, {$set: propChange},function(err,r){
        if (err) {
          throw new Error(err);
        } else {
          console.log(`IO edited , using: ${query} to new ${propChange}`);
        }
      });
    });
  }else{
    console.log('No such model in DB!');
    throw new Error(`Error: model ${modelName} is not specified in your DB`);
  }
}

exports.writeItem = writeItem
exports.readItem = readItem
exports.deleteItem = deleteItem
exports.editItem = editItem
