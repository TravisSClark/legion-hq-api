var AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

var params = {
  TableName: "users",
  Item: {
    userId: { N: "1" },
    email: { S: "test" }
  },
  ReturnConsumedCapacity: "TOTAL"
};

ddb.putItem(params, function (err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});

function autoIncrementUserId() {
  ddb.query
}