import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const PORT: string = process.env.PORT!;

app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`)
})