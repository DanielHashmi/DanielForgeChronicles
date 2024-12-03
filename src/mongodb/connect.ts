import { MongoClient, MongoClientOptions } from 'mongodb'

const URI = process.env.MONGODB_URI
const options = {
    useNewUrlParser: true,
}

let client: any
let clientPromise: any

if (!URI) {
    throw new Error('Add Mongo URI In .env.local')
}

if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
        client = new MongoClient(URI, options as MongoClientOptions)
        global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise
} else {
    client = new MongoClient(URI, options as MongoClientOptions)
    clientPromise = client.connect()
}

export default clientPromise
