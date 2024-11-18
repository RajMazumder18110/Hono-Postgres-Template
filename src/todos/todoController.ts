/** @notice library imports */
import type { Context } from "hono";
import { StatusCodes } from "http-status-codes";
// import type { BlankInput } from "hono/types";

/// Local imports
import { TodoServices } from "./TodoServices";
import { TodosRoutes } from "@/constants/routes";
import { Variables } from "./todoDependencyMiddleware";

export class TodoController {
  constructor(private todoService: TodoServices) {}

  async createTodo(c: Context<{ Variables: Variables }, TodosRoutes.CREATE>) {
    /// Grab fields
    const { description } = await c.req.json();

    /// Save into database
    await this.todoService.create({ description });

    /// Response
    return c.json({}, StatusCodes.CREATED);
  }
}
