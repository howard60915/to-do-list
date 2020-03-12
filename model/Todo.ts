import _ from "lodash";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import uuidv4 from "uuid/v4";

const ddbClient = new DocumentClient({ region: process.env.AWS_REGION });

export type TodoArgs = {
  todoId?: string | null;
  name?: string;
  isDone?: boolean;
};

export type Key = {
  todoId: string;
};

export default class Todo {
  todoId?: string | null;
  name?: string;
  isDone?: boolean;

  constructor (args?: TodoArgs) {
    const { todoId, name, isDone } = _.pickBy(args, _.identity);
    this.todoId = todoId || null;
    this.name = name;
    this.isDone = isDone || false;
  }

  isNew (): boolean {
    return Boolean(!this.todoId);
  }

  async fetch () {
    const params: DocumentClient.GetItemInput = {
      Key: {
        todoId: this.todoId,
      },
      TableName: "to_do",
    };
    const { Item } = await ddbClient.get(params).promise();

    return this.reforge(Item);
  }

  /* eslint class-methods-use-this: ["error", { "exceptMethods": ["fetchAll"] }] */
  async fetchAll () {
    const { Items } = await ddbClient.scan({ TableName: "to_do" }).promise();
    return _.map(Items, item => new Todo(item));
  }

  async insert () {
    const { name, isDone } = this;
    const todoId: string = uuidv4();
    const params: DocumentClient.PutItemInput = {
      Item: {
        todoId,
        name,
        isDone,
        createdAt: Date.now().toString(),
        updatedAt: Date.now().toString(),
      },
      TableName: "to_do",
    };
    const result = await ddbClient.put(params).promise();
    if (!result) throw new Error("insert failed");
    return this.reforge({ todoId, name, isDone });
  }

  async update () {
    const { name, isDone, todoId } = this;
    const params: DocumentClient.UpdateItemInput = {
      ExpressionAttributeNames: {
        "#N": "name",
        "#D": "isDone",
        "#U": "updatedAt",
      },
      ExpressionAttributeValues: {
        ":n": name,
        ":d": isDone,
        ":u": Date.now().toString(),
      },
      Key: {
        todoId,
      },
      TableName: "to_do",
      UpdateExpression: "SET #N = :n, #D = :d, #U = :u",
      ReturnValues: "ALL_NEW",
    };
    const { Attributes } = await ddbClient.update(params).promise();

    return this.reforge(Attributes);
  }

  async save () {
    if (this.isNew()) return this.insert();
    return this.update();
  }

  async destroy () {
    const params: DocumentClient.DeleteItemInput = {
      Key: {
        todoId: this.todoId,
      },
      ReturnValues: "ALL_OLD",
      TableName: "to_do",
    };

    const { Attributes } = await ddbClient.delete(params).promise();

    return this.reforge(Attributes);
  }

  reforge (attributes: TodoArgs) {
    if (!attributes) return null;
    _.forEach(attributes, (value, column) => {
      this[column] = value;
    });

    return this;
  }
}
