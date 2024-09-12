var AWS = require("aws-sdk");

AWS.config.update({region: "us-east-1"});

var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

const listId = "listId";
const userId = "userId";

var params = {
  TableName: "user_lists",
  AttributeDefinitions: [
    {
      AttributeName: listId,
      AttributeType: "S",
    },
    {
      AttributeName: userId,
      AttributeType: "S",
    }
  ],
  KeySchema: [
    {
      AttributeName: listId,
      KeyType: "HASH",
    },
    {
      AttributeName: userId,
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

// You only need to define the keys for DynamoDB but this is the rest of the schema
// AttributeDefinitions: [
//   {
//     AttributeName: "pointTotal",
//     AttributeType: "N",
//   },
//   {
//     AttributeName: "userId",
//     AttributeType: "N",
//   },
//   {
//     AttributeName: "numActivations",
//     AttributeType: "N",
//   },
//   {
//     AttributeName: "faction",
//     AttributeType: "S",
//   },
//   {
//     AttributeName: "mode",
//     AttributeType: "S",
//   },
//   {
//     AttributeName: "title",
//     AttributeType: "S",
//   },
//   {
//     AttributeName: "notes",
//     AttributeType: "S",
//   },
//   {
//     AttributeName: "units",
//     AttributeType: "L",
//   },
//   {
//     AttributeName: "primaryCards",
//     AttributeType: "L",
//   },
//   {
//     AttributeName: "secondaryCards",
//     AttributeType: "L",
//   },
//   {
//     AttributeName: "advantageCards",
//     AttributeType: "L",
//   },
//   {
//     AttributeName: "objectiveCards",
//     AttributeType: "L",
//   },
//   {
//     AttributeName: "deploymentCards",
//     AttributeType: "L",
//   },
//   {
//     AttributeName: "conditionCards",
//     AttributeType: "L",
//   },
//   {
//     AttributeName: "uniques",
//     AttributeType: "L",
//   },
//   {
//     AttributeName: "uniques",
//     AttributeType: "L",
//   },
//   {
//     AttributeName: "commanders",
//     AttributeType: "L",
//   },
//   {
//     AttributeName: "unitObjectStrings",
//     AttributeType: "L",
//   },
//   {
//     AttributeName: "unitCounts",
//     AttributeType: "M",
//   },
// {
  //     AttributeName: "listId",
  //     KeyType: "N",
  //   },
// ]