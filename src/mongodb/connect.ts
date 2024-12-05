import { MongoClient, MongoClientOptions } from 'mongodb'

const URI = process.env.MONGODB_URI
const options: MongoClientOptions = {
    // Removed useNewUrlParser, no longer necessary
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (!URI) {
    throw new Error('Add Mongo URI In .env.local')
}

if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
        client = new MongoClient(URI, options)
        global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise
} else {
    client = new MongoClient(URI, options)
    clientPromise = client.connect()
}

export default clientPromise
