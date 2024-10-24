import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

import { handle } from "hono/vercel";

export const runtime = "edge";

const app = new Hono().basePath("/api");

const schema = z.object({
  test: z.string(),
});

const schema1 = z.object({
  test: z.string(),
  age: z.number(),
});

app
  .get("/hello", (c) => {
    return c.json({
      message: "Hello Next.js!",
    });
  })
  .get("hello/:test", zValidator("param", schema), (c) => {
    const { test } = c.req.valid("param");

    return c.json({
      message: "Hello Next.js! am back",
      test,
    });
  })
  .post("/hi", zValidator("json", schema1), (c) => {
    const { test, age } = c.req.valid("json");
    return c.json({});
    //   if (!result.success) {
    //     return c.text("Invalid!", 400);
    //   }
    // })
    //...
  });

export const GET = handle(app);
export const POST = handle(app);
