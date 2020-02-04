import _ from "lodash";
import Todo from "./model/Todo";

const Query = {
  todos: async (source, args) => {
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
  addTodo: async (source, { input }) => {
    const { name } = input;
    const todo = await new Todo({ name }).save();

    return { status: "ok", todo };
  },
  updateTodo: async (source, { input }) => {
    const { todoId } = input;
    const target = await new Todo({ todoId }).fetch();
    if (!target) throw new Error("Not Found");

    const todo = new Todo(_.assign(target, input));

    await todo.save();

    return { status: "ok", todo };
  },
  delTodo: async (source, { input }) => {
    const { todoId } = input;
    const todo = await new Todo({ todoId }).fetch();
    if (!todo) throw new Error("Not Found");

    const target = new Todo({ todoId });

    await target.destroy();

    return { status: "ok", todo };
  }
};

export default {
  Query,
  Mutation
};
