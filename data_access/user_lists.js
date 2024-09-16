var AWS = require("aws-sdk");
AWS.config.update({region: "us-east-1"});
var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

const userListTableName = "user_lists";

function UserList(obj) {
  this.userId;
  this.listId;
  this.pointTotal = 0;
  this.numActivations = 0;
  this.faction = "";
  this.battleforce = "";
  this.mode = "";
  this.title = "";
  this.notes = "";
  this.units = [];
  this.primaryCards = [];
  this.secondaryCards = [];
  this.advantageCards = [];
  this.objectiveCards = [];
  this.deploymentCards = [];
  this.conditionCards = [];
  this.uniques = [];
  this.commanders = [];
  this.unitObjectStrings = [];
  this.unitCounts = {};
  this.createdAt = "";
  this.updatedAt = "";

  for (var prop in obj) this[prop] = obj[prop];
}

function createUserListTable() {
  const listId = "listId";
  const userId = "userId";

  var params = {
    TableName: userListTableName,
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
}

function createNewList(obj) {
  
}

function updateList(obj) {
  
}

function deleteList(deleteListId) {

}

function findListsForUser(queryUserId) {

}

function findList(queryListId) {
  
}

function findList(queryListId) {
  
}

module.exports = { UserList, createUserListTable, createNewList, updateList, deleteList, findListsForUser, findList }