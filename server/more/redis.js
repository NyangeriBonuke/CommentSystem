/*
const redis = require('redis')
const redisClient = redis.createClient()

async function getCommentsFromCache(){
    return new Promise((resolve, reject) => {
        redisClient.get('comments', (err, data) => {
            if(err){
                reject(err)
            }
            else if(data){
                resolve(JSON.parse(data))
            }
            else{
                resolve(null)
            }
        })
    })
}

async function saveCommentsToCache(comments){
    return new Promise((resolve, reject) => {
        redisClient.set('comments', JSON.stringify(comments), 'EX', 3600, (err) => {
            if(err){
                reject(err)
            }
            else{
                resolve()
            }
        })
    })
}

module.exports = {
    getCommentsFromCache,
    saveCommentsToCache
}
*/