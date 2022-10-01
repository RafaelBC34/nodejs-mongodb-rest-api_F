import mongoose from 'mongoose'
import config from './config.js'

(async () => {
    const db = await mongoose.connect(config.mongodbURI)
    console.log('Database is connected to: ', db.connection.name)
})();


// No han sido necesarios los parámetros, a diferencia de Fazt
// De hecho, lanza 'MongoParseError'
// (async () => {
//     const db = await mongoose.connect('mongodb://localhost/tasks-api', {
//         userNewUrlParser: true,
//         userUnifiedTopology: true
//     })
//     console.log('Database is connected to: ', db.connection.name)
// })();