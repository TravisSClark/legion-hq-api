import { CreateTableCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";

UserSchema.plugin(autoIncrement.plugin, {
  model: '',
  field: 'userId',
  startAt: 1000,
  incrementBy: 1
});

export const main = async () => {
  const command = new CreateTableCommand({
    TableName: "users",
    AttributeDefinitions: [
      {
        AttributeName: "email",
        AttributeType: "S",
      },
      {
        AttributeName: "settings",
        KeyType: "M",
      }
    ],
    KeySchema: [
      {
        AttributeName: "userId",
        AttributeType: "N",
      },
    ]
  });
}