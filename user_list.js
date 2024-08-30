import { CreateTableCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { fromEnv } from "@aws-sdk/credential-providers"

const client = new DynamoDBClient(fromEnv());

export const main = async () => {
  const command = new CreateTableCommand({
    TableName: "user_lists",
    AttributeDefinitions: [
      {
        AttributeName: "pointTotal",
        AttributeType: "N",
      },
      {
        AttributeName: "userId",
        AttributeType: "N",
      },
      {
        AttributeName: "numActivations",
        AttributeType: "N",
      },
      {
        AttributeName: "faction",
        AttributeType: "S",
      },
      {
        AttributeName: "mode",
        AttributeType: "S",
      },
      {
        AttributeName: "title",
        AttributeType: "S",
      },
      {
        AttributeName: "notes",
        AttributeType: "S",
      },
      {
        AttributeName: "units",
        AttributeType: "L",
      },
      {
        AttributeName: "primaryCards",
        AttributeType: "L",
      },
      {
        AttributeName: "secondaryCards",
        AttributeType: "L",
      },
      {
        AttributeName: "advantageCards",
        AttributeType: "L",
      },
      {
        AttributeName: "objectiveCards",
        AttributeType: "L",
      },
      {
        AttributeName: "deploymentCards",
        AttributeType: "L",
      },
      {
        AttributeName: "conditionCards",
        AttributeType: "L",
      },
      {
        AttributeName: "uniques",
        AttributeType: "L",
      },
      {
        AttributeName: "uniques",
        AttributeType: "L",
      },
      {
        AttributeName: "commanders",
        AttributeType: "L",
      },
      {
        AttributeName: "unitObjectStrings",
        AttributeType: "L",
      },
      {
        AttributeName: "unitCounts",
        KeyType: "M",
      }
    ],
    KeySchema: [
      {
        KeyName: "listId",
        KeyType: "N",
      },
    ]
  });

  const response = await client.send(command);
  console.log(response);
  return response;
};
