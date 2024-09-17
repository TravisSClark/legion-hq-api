var uuid = require("uuid");

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
  this.battleForce = "";
  this.mode = "";
  this.title = "";
  this.units = [];
  this.commandCards = [];
  this.contingencies = [];
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
  var list = new UserList(JSON.parse(obj));
  list.listId = uuid.v4();
  list.createdAt = new Date().toISOString();
  list.updatedAt = list.createdAt;

  var params = {
    TableName: userListTableName,
    Item: {
      userId: { S: list.userId },
      listId: { S: list.listId },
      pointTotal: { N: list.pointTotal.toString() },
      numActivations: { N: list.numActivations.toString() },
      faction: { S: list.faction },
      battleForce: { S: list.battleForce },
      mode: { S: list.mode },
      title: { S: list.title },
      units: AWS.DynamoDB.Converter.input(list.units),
      commandCards: AWS.DynamoDB.Converter.input(list.commandCards),
      contingencies: AWS.DynamoDB.Converter.input(list.contingencies),
      primaryCards: AWS.DynamoDB.Converter.input(list.primaryCards),
      secondaryCards: AWS.DynamoDB.Converter.input(list.secondaryCards),
      advantageCards: AWS.DynamoDB.Converter.input(list.advantageCards),
      objectiveCards: AWS.DynamoDB.Converter.input(list.objectiveCards),
      deploymentCards: AWS.DynamoDB.Converter.input(list.deploymentCards),
      conditionCards: AWS.DynamoDB.Converter.input(list.conditionCards),
      uniques: AWS.DynamoDB.Converter.input(list.uniques),
      commanders: AWS.DynamoDB.Converter.input(list.commanders),
      unitObjectStrings: AWS.DynamoDB.Converter.input(list.unitObjectStrings),
      unitCounts: AWS.DynamoDB.Converter.input(list.unitCounts),
      createdAt: { S: list.createdAt },
      updatedAt: { S: list.updatedAt }
    }
  };

  ddb.putItem(params, function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", params.Item, data);
    }
  });
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

var obj = {
		"units": [
			{
				"unitId": "qa",
				"count": 1,
				"hasUniques": true,
				"totalUnitCost": 110,
				"unitObjectString": "qacwrf",
				"upgradesEquipped": [
					"cw",
					"rf",
					null,
					null,
					null
				],
				"loadoutUpgrades": [],
				"additionalUpgradeSlots": [],
				"validationIssues": [],
				"upgradeInteractions": {}
			},
			{
				"unitId": "ax",
				"count": 1,
				"hasUniques": true,
				"totalUnitCost": 115,
				"unitObjectString": "axdgdc",
				"upgradesEquipped": [
					"dg",
					null,
					"dc"
				],
				"loadoutUpgrades": [],
				"additionalUpgradeSlots": [],
				"validationIssues": [],
				"upgradeInteractions": {}
			},
			{
				"unitId": "kx",
				"count": 1,
				"hasUniques": true,
				"totalUnitCost": 126,
				"unitObjectString": "kxlidhdpll",
				"upgradesEquipped": [
					"li",
					"dh",
					"dp",
					null,
					"ll",
					null
				],
				"loadoutUpgrades": [],
				"additionalUpgradeSlots": [],
				"validationIssues": [],
				"upgradeInteractions": {}
			},
			{
				"unitId": "px",
				"count": 2,
				"hasUniques": false,
				"totalUnitCost": 220,
				"unitObjectString": "pxqdli",
				"upgradesEquipped": [
					"qd",
					"li",
					null,
					null,
					null
				],
				"loadoutUpgrades": [],
				"additionalUpgradeSlots": [],
				"validationIssues": [],
				"upgradeInteractions": {}
			},
			{
				"unitId": "gx",
				"count": 3,
				"hasUniques": false,
				"totalUnitCost": 168,
				"unitObjectString": "gxiw",
				"upgradesEquipped": [
					"iw",
					null,
					null,
					null
				],
				"loadoutUpgrades": [],
				"additionalUpgradeSlots": [],
				"validationIssues": [],
				"upgradeInteractions": {}
			},
			{
				"unitId": "gx",
				"count": 1,
				"hasUniques": false,
				"totalUnitCost": 52,
				"unitObjectString": "gxog",
				"upgradesEquipped": [
					null,
					"og",
					null,
					null
				],
				"loadoutUpgrades": [],
				"additionalUpgradeSlots": [],
				"validationIssues": [],
				"upgradeInteractions": {}
			}
		],
		"commandCards": [
			"mg",
			"gf",
			"gg",
			"lo",
			"bq",
			"lp"
		],
		"contingencies": [],
		"objectiveCards": [
			"Ob",
			"Oc",
			"Od",
			"Of"
		],
		"deploymentCards": [
			"Da",
			"De",
			"Dm",
			"Db"
		],
		"conditionCards": [
			"Ca",
			"Cg",
			"Cf",
			"Ce"
		],
		"uniques": [
			"qa",
			"ax",
			"kx"
		],
		"commanders": [
			"Super Tactical Droid",
			"Bossk",
			"Cad Bane"
		],
		"unitObjectStrings": [
			"qacwrf",
			"axdgdc",
			"kxlidhdpll",
			"pxqdli",
			"gxiw",
			"gxog"
		],
		"title": "Double Bounty",
		"mode": "standard mode",
		"faction": "separatists",
		"pointTotal": 791,
		"battleForce": "",
		"unitCounts": {
			"commander": 1,
			"operative": 2,
			"corps": 4,
			"special": 2,
			"support": 0,
			"heavy": 0
		},
		"userId": "b91abfdf-8fdc-4e4f-8649-4e90a95db0ef",
		"createdAt": "2023-09-26T01:06:17.614Z",
		"updatedAt": "2024-06-03T02:23:44.663Z",
}

createNewList(JSON.stringify(obj));

module.exports = { UserList, createUserListTable, createNewList, updateList, deleteList, findListsForUser, findList }