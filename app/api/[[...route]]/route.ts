import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
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

const schema2 = z.object({
  postId: z.number(),
});

// app
//   .get("/hello", (c) => {
//     return c.json({
//       message: "Hello Next.js!",
//     });
//   })
//   .get("hello/:test", zValidator("param", schema), (c) => {
//     const { test } = c.req.valid("param");

//     return c.json({
//       message: "Hello Next.js! am back",
//       test,
//     });
//   })
//   .post(
//     "/create/:postId",
//     zValidator("json", schema1),
//     zValidator("param", schema2),
//     (c) => {
//       const { test, age } = c.req.valid("json");
//       const { postId } = c.req.valid("param");
//       return c.json({});
//       //   if (!result.success) {
//       //     return c.text("Invalid!", 400);
//       //   }
//       // })
//       //...
//     }
//   );

app.get("/hello", clerkMiddleware(), (c) => {
  const auth = getAuth(c);

  if (!auth?.userId) {
    return c.json({
      message: "You are not logged in.",
      error: "Unauthorized",
    });
  }

  return c.json({
    message: "You are logged in!",
    userId: auth.userId,
  });
});

export const GET = handle(app);
export const POST = handle(app);
