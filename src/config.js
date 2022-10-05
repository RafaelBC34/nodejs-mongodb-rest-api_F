import { config } from 'dotenv'
config()

export default {
    mongodbURI: process.env.MONGODB_URI || 'mongodb://localhost/tasks-api_db'
}