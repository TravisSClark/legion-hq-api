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

async function createNewUser(userEmail) {
  var newUserId = uuid.v4();
  var params = {
    TableName: userTableName,
    Item: {
      userId: { S: newUserId },
      email: { S: userEmail }
    }
  };
  
  try {
		await ddb.putItem(params).promise();
		return newUserId;
	} catch (err) {
		console.error(err);
	}
}

async function findUserByUserId(queryUserId) {
  var params = {
    TableName: userTableName,
    ExpressionAttributeValues: {
      ":i": { S: queryUserId }
    },
    KeyConditionExpression: "userId = :i"
  };
  
  try {
		var data = await ddb.query(params).promise();
		return AWS.DynamoDB.Converter.unmarshall(data.Items[0]);
	} catch (err) {
		console.error(err);
	}
}

async function findUserByEmail(scanEmail) {
  var params = {
    TableName: userTableName,
    ExpressionAttributeValues: {
      ":e": { S: scanEmail }
    },
    FilterExpression: "email = :e"
  };
  
  
  try {
		var data = await ddb.scan(params).promise();
		return AWS.DynamoDB.Converter.unmarshall(data.Items[0]);
	} catch (err) {
		console.error(err);
	}
}

// async function main() {
//   var result = await createNewUser("Test")
// 	// var result = await findUserByUserId("b91abfdf-8fdc-4e4f-8649-4e90a95db0ef");
//   // var result = await findUserByEmail("Test");
//   console.log(result);
// }

// main();

module.exports = { User, createUserTable, createNewUser, findUserByUserId, findUserByEmail }