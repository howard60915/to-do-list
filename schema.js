const schema = `
  input AddTodoMutationInput {
    name: String!
  }

  type AddTodoMutationPayload {
    status: ResponseStatus
    todo: Todo
  }

  input DelTodoMutationInput {
    todoId: String!
  }

  type DelTodoMutationPayload {
    status: ResponseStatus
    todo: Todo
  }

  type Mutation {
    addTodo(input: AddTodoMutationInput): AddTodoMutationPayload
    updateTodo(input: UpdateTodoMutationInput): UpdateTodoMutationPayload
    delTodo(input: DelTodoMutationInput): DelTodoMutationPayload
  }

  type Query {
    todos(todoId: String): [Todo]
  }

  enum ResponseStatus {
    failed
    ok
  }

  type Todo {
    todoId: String
    name: String
    isDone: Boolean
  }

  input UpdateTodoMutationInput {
    todoId: String!
    name: String
    isDone: Boolean
  }

  type UpdateTodoMutationPayload {
    status: ResponseStatus
    todo: Todo
  }
`;

export default schema;
