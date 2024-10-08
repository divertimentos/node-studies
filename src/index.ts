import app from "./server";
import * as dotenv from "dotenv";

dotenv.config();

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Hello on http://localhost:${PORT}`);
});
