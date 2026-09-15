import mongoose from "mongoose";

let mongoServer = null;

const connectDB = async () => {
  const primaryUri =
    process.env.MONGO_URI || "mongodb://127.0.0.1:27017/expense_tracker";

  try {
    // Attempt connecting to the configured or default MongoDB URI
    console.log(`Connecting to MongoDB at: ${primaryUri} ...`);
    await mongoose.connect(primaryUri, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log("MongoDB Connected Successfully to Database");
  } catch (err) {
    console.warn(`Could not connect to external MongoDB: ${err.message}`);
    console.log(
      "Starting embedded In-Memory MongoDB server for zero-setup execution...",
    );

    try {
      const { MongoMemoryServer } = await import("mongodb-memory-server");
      mongoServer = await MongoMemoryServer.create();
      const memoryUri = mongoServer.getUri();

      await mongoose.connect(memoryUri);
      console.log(
        `Connected successfully to In-Memory MongoDB at: ${memoryUri}`,
      );
    } catch (memErr) {
      console.error("Failed to start In-Memory MongoDB:", memErr.message);
      process.exit(1);
    }
  }
};

export const closeDB = async () => {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
};

export default connectDB;
