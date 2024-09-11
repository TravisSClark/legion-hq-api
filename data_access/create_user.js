var AWS = require("aws-sdk");

AWS.config.update({region: "us-east-1"});

var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

const email = "email";
const userId = "userId";

var params = {
  TableName: "users",
  AttributeDefinitions: [
    {
      AttributeName: email,
      AttributeType: "S",
    },
    {
      AttributeName: userId,
      AttributeType: "N",
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

// UserSchema.plugin(autoIncrement.plugin, {
//   model: '',
//   field: 'userId',
//   startAt: 1000,
//   incrementBy: 1
// });

// AttributeDefinitions: [
//   {
//     AttributeName: "email",
//     AttributeType: "S",
//   },
//     AttributeName: "userId",
//     AttributeType: "N",
//   },
// ],