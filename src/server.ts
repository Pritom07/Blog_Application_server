import app from "./app";
import { config } from "./config";
import { prisma } from "./lib/prisma";

const PORT = config.port || 3000;
const run = async () => {
  try {
    await prisma.$connect();
    console.log("Database Connected Successfully!");
    app.listen(PORT, () => {
      console.log(`App Running on PORT : ${PORT}`);
    });
  } catch (err: any) {
    await prisma.$disconnect();
    console.log(`Error Occured, ${err.message}`);
    process.exit(1);
  }
};

run();
