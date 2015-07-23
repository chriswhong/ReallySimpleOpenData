var mongodb = require('mongodb'),
    url = 'mongodb://localhost:27017/myproject'

function DatasetRest(router){

    router.get('/dataset:id', function(req, res, next){

        //Break if there are no query parameters
        if(!req.params.id){
            res.status(500)
                .json({'error': 'URL Parameter Error', 'message': 'No get parameters given' })
            res.end()
            return
        }

        var client = mongodb.MongoClient.connect(url, function(err, db){

            //Break if the connection to mongo fails
            if (err){
                res.status(500)
                    .json({'error': 'Failed on database connection', 'message': err })
                res.end()
                return
            }
            
            readDataset({id: req.params.id}, db, function(err, result){
                if (err){
                    res.status(500)
                        .json({'error': 'Failed on dataset read', 'message': err })
                    res.end()
                    return
                }
                res.status(200).json(result)
                res.end()
            })

        })

         
    })

    router.post('/dataset:id', function(req, res, next){

        //A check for whether the body request is actually json
        //TODO: See if this actually works 
        if(!req.is('application/json')){
                res.status(500)
                    .json({'error': 'Failed on dataset creation', 'message': 'Request body is not parsable as json' })
                res.end()
                return
        }

        var client = mongodb.MongoClient.connect(url, function(err, db){

            //Break if the connection to mongo fails
            if (err){
                res.status(500)
                    .json({'error': 'Failed on database connection', 'message': err })
                res.end()
                return
            }

            var jsonData = req.body
            
            createDataset({id: req.params.id, data: jsonData}, db, function(err, result){
                if (err){
                    res.status(500)
                        .json({'error': 'Failed on dataset create', 'message': err })
                    res.end()
                    return
                }
                res.status(200).json(result)
                res.end()
            })

        })

    })

    router.put('/dataset', function(req, res, next){
        //A check for whether the body request is actually json
        //TODO: See if this actually works 
        if(!req.is('application/json')){
                res.status(500)
                    .json({'error': 'Failed on dataset creation', 'message': 'Request body is not parsable as json' })
                res.end()
                return
        }

        var client = mongodb.MongoClient.connect(url, function(err, db){

            //Break if the connection to mongo fails
            if (err){
                res.status(500)
                    .json({'error': 'Failed on database connection', 'message': err })
                res.end()
                return
            }

            var jsonData = req.body
            
            updateDataset({id: req.params.id}, {id: req.params.id, data: jsonData}, db, function(err, result){
                if (err){
                    res.status(500)
                        .json({'error': 'Failed on dataset create', 'message': err })
                    res.end()
                    return
                }
                res.status(200).json(result)
                res.end()
            })

        })

    })

    router.delete('/dataset:id', function(req, res, next){

        //Break if there are no query parameters
        if(!req.params.id){
            res.status(500)
                .json({'error': 'URL Parameter Error', 'message': 'No delete id parameters given' })
            res.end()
            return
        }

        var client = mongodb.MongoClient.connect(url, function(err, db){

            //Break if the connection to mongo fails
            if (err){
                res.status(500)
                    .json({'error': 'Failed on database connection', 'message': err })
                res.end()
                return
            }
            
            deleteDataset({id: req.params.id}, db, function(err, result){
                if (err){
                    res.status(500)
                        .json({'error': 'Failed on dataset read', 'message': err })
                    res.end()
                    return
                }
                res.status(200).json(result)
                res.end()
            })

        })


    })

}


function createDataset(data, db, callback){
    var collection = db.collection('baltimore')
    collection.insert(data, {}, function(err, result){
        callback(err, result)
    })

}

function readDataset(params, db, callback){
    var collection = db.collection('baltimore')
    collection.find(params).toArray(function(err, result){
        callback(err, result)
    })

}

function updateDataset(params, newData, db, callback){
    var collection = db.collection('baltimore')
    collection.update(params, {$set: {'data': newData} }, {}, function(err, result){
        callback(err, result)
    })
}

function deleteDataset(params, db, callback){
    var collection = db.collection('baltimore')
    collection.remove(params,{}, function(err, result){
        callback(err, result)
    })
}

module.exports = DatasetRest
