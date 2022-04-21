import dotenv from "dotenv";
import path from "path";

(() => {
  const NODE_ENV = process.env.NODE_ENV;
  if (
    NODE_ENV !== "production" &&
    NODE_ENV !== "development" &&
    NODE_ENV !== "test"
  ) {
    throw new Error("Must be to set NODE_ENV.");
  }

  const result = dotenv.config({
    path: path.join(__dirname, "..", "..", "..", "env", ".env." + NODE_ENV),
  });
  if (result.parsed == undefined) {
    throw new Error("Cannot loaded environment variables file.");
  }
})();
