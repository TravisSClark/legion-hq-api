var uuid = require("uuid");

var AWS = require("aws-sdk");
AWS.config.update({region: "us-east-1"});
var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });
const userTableName = "users";

function User(obj) {
  this.userId;
  this.email;

  for (var prop in obj) this[prop] = obj[prop];
}

function createUserTable() {
  const email = "email";
  const userId = "userId";

  var params = {
    TableName: userTableName,
    AttributeDefinitions: [
      {
        AttributeName: email,
        AttributeType: "S",
      },
      {
        AttributeName: userId,
        AttributeType: "S",
      }
    ],
    KeySchema: [
      {
        AttributeName: userId,
        KeyType: "HASH",
      },
      {
        AttributeName: email,
        KeyType: "RANGE",
      }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    } 
  };

  ddb.createTable(params, function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Table Created", data);
    }
  });
}

function createNewUser(userEmail) {
  var newUserId = uuid.v4();
  var params = {
    TableName: userTableName,
    Item: {
      userId: { S: newUserId },
      email: { S: userEmail }
    }
  };
  
  ddb.putItem(params, function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success:", newUserId);
    }
  })
}

function findUserByUserId(queryUserId) {
  var params = {
    TableName: userTableName,
    ExpressionAttributeValues: {
      ":i": { S: queryUserId }
    },
    KeyConditionExpression: "userId = :i"
  };
  
  ddb.query(params, function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.Items);
    }
  });
}

function findUserByEmail(scanEmail) {
  var params = {
    TableName: userTableName,
    ExpressionAttributeValues: {
      ":e": { S: scanEmail }
    },
    FilterExpression: "email = :e"
  };
  
  ddb.scan(params, function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.Items);
    }
  });
}

module.exports = { User, createUserTable, createNewUser, findUserByUserId, findUserByEmail }