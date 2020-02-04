import _ from "lodash";
import AWS from "aws-sdk";
import uuidv4 from "uuid/v4";
import { AttributeValue as Attr } from "dynamodb-data-types";

const dynamodb = new AWS.DynamoDB({ region: process.env.AWS_REGION });

const dynamoParser = rows => {
  if (_.isPlainObject(rows)) return Attr.unwrap(rows);
  return _.map(rows, row => Attr.unwrap(row));
};

const promisify = thunk =>
  new Promise((resolve, reject) => {
    thunk((error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });

export default class Todo {
  constructor(args) {
    const { todoId, name, isDone } = _.pickBy(args, _.identity);
    this.todoId = todoId || null;
    this.name = name;
    this.isDone = isDone || false;
  }

  isNew() {
    return Boolean(!this.todoId);
  }

  async fetch() {
    const params = {
      Key: {
        todoId: {
          S: this.todoId,
        },
      },
      TableName: "to_do",
    };
    return promisify(cb => dynamodb.getItem(params, cb))
    .then(data => dynamoParser(data.Item));
  }

  /* eslint class-methods-use-this: ["error", { "exceptMethods": ["fetchAll"] }] */
  async fetchAll() {
    return promisify(cb => dynamodb.scan({ TableName: "to_do" }, cb))
      .then(data => dynamoParser(data.Items));
  }

  async insert() {
    const { name, isDone } = this;
    const todoId = uuidv4();
    const params = {
      Item: {
        todoId: {
          S: todoId,
        },
        name: {
          S: name,
        },
        isDone: {
          BOOL: isDone,
        },
        createdAt: {
          S: Date.now().toString(),
        },
        updatedAt: {
          S: Date.now().toString(),
        },
      },
      TableName: "to_do",
    };

    return promisify(cb => dynamodb.putItem(params, cb)).then(() => ({
      todoId,
      name,
      isDone,
    }));
  }

  async update() {
    const { name, isDone } = this;
    const params = {
      ExpressionAttributeNames: {
        "#N": "name",
        "#D": "isDone",
        "#U": "updatedAt",
      },
      ExpressionAttributeValues: {
        ":n": {
          S: name,
        },
        ":d": {
          BOOL: isDone,
        },
        ":u": {
          S: Date.now().toString(),
        },
      },
      Key: {
        todoId: {
          S: this.todoId,
        },
      },
      TableName: "to_do",
      UpdateExpression: "SET #N = :n, #D = :d, #U = :u",
    };
    return promisify(cb => dynamodb.updateItem(params, cb)).then(data => {
      console.log(data);
      return data;
    });
  }

  async save() {
    if (this.isNew()) return this.insert();
    return this.update();
  }

  async destroy() {
    const params = {
      Key: {
        todoId: {
          S: this.todoId,
        },
      },
      TableName: "to_do",
    };

    return promisify(cb => dynamodb.deleteItem(params, cb));
  }
}
