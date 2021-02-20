import _ from "lodash";
import Todo from "./model/Todo";

export type TodosArgs = {
  todoId: string;
};

type TodosQueryResult = Todo[];

type AddTodoMutationInput = {
  name: string;
};

type UpdateTodoMutationInput = {
  todoId: string;
};

enum ResponseStatus { failed = "faided", ok = "ok" }

type TodoMutationPayload = {
  status: ResponseStatus;
  todo: Todo;
};

const Query = {
  todos: async (source, args: TodosArgs ): Promise<TodosQueryResult> => {
    const { todoId } = args;

    if (todoId) {
      const todo = await new Todo({ todoId }).fetch();
      return [todo];
    }

    const todos = await new Todo().fetchAll();

    return todos;
  }
};

const Mutation = {
  addTodo: async (source, { input }: { input: AddTodoMutationInput }): Promise<TodoMutationPayload> => {
    const { name } = input;
    const todo = await new Todo({ name }).save();

    return { status: ResponseStatus.ok, todo };
  },
  updateTodo: async (source, { input }: { input: UpdateTodoMutationInput }): Promise<TodoMutationPayload> => {
    const { todoId } = input;
    const target = await new Todo({ todoId }).fetch();
    if (!target) throw new Error("Not Found");

    const todo = new Todo(_.assign(target, input));

    await todo.save();

    return { status: ResponseStatus.ok, todo };
  },
  delTodo: async (source, { input }): Promise<TodoMutationPayload> => {
    const { todoId } = input;
    const todo = await new Todo({ todoId }).fetch();
    if (!todo) throw new Error("Not Found");

    const target = new Todo({ todoId });

    await target.destroy();

    return { status: ResponseStatus.ok, todo };
  }
};

export default {
  Query,
  Mutation
};
