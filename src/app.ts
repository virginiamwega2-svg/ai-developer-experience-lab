import express from "express";
import { z } from "zod";

const app = express();

app.use(express.json());

const helloSchema = z.object({
  name: z.string({
    error: "Name is required",
  }).min(1, "Name is required"),
});

app.get("/hello", (req, res) => {
  res.json({
    message: "Hello, Developer!",
  });
});

app.post("/hello", (req, res) => {
  const result = helloSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: result.error.issues[0]?.message ?? "Invalid request",
    });
  }

  const { name } = result.data;

  res.json({
    message: `Hello, ${name}!`,
  });
});

export default app;