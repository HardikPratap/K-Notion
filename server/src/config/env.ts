import dotenv from "dotenv"

dotenv.config()

export const ENV={
    PORT: process.env.PORT || "5000",
    MONGO_URI: process.env.MONGO_URI || "",
    JWT_SECRET: process.env.JWT_SECRET || "changeme",
    JWT_EXPIRY: process.env.JWT_EXPIRY || "7d",
    CLIENT_URL: process.env.CLIENT_URL || "http://localhost:3000",
    OPENAI_API_KEY: process.env.OPENAI_API_KEY || ""
}