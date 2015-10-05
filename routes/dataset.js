// var mongodb = require('mongodb'),
//     url = 'mongodb://localhost:27017/myproject'
var low = require('lowdb');
var db = low('db.json');
var shortid = require('shortid');


function DatasetRest(router){

    //READ
    router.get('/dataset/:id', function(req, res, next){

        //Break if there are no query parameters
        if(!req.params.id){
            res.status(500)
                .json({'error': 'URL Parameter Error', 'message': 'No get parameters given' })
            res.end()
            return
        }

        console.log(req.params);

        res.json(db('dataset').find({identifier:req.params.id}));

         
    })

    //CREATE
    router.post('/dataset', function(req, res, next){

        //A check for whether the body request is actually json
        //TODO: See if this actually works 
        if(!req.is('application/json')){
                res.status(500)
                    .json({'error': 'Failed on dataset creation', 'message': 'Request body is not parsable as json' })
                res.end()
                return
        }

        var data = req.body;
        data.identifier = shortid.generate();
        db('dataset').push(data);
        res.sendStatus(201);


    })

    //UPDATE
    router.put('/dataset/:id', function(req, res, next){
        //A check for whether the body request is actually json
        //TODO: See if this actually works 
        if(!req.is('application/json')){
                res.status(500)
                    .json({'error': 'Failed on dataset creation', 'message': 'Request body is not parsable as json' })
                res.end()
                return
        }

        var data = req.body;
        data.identifier = req.params.id;


        //update example
        db('dataset')
          .chain()
          .find({ identifier: req.params.id })
          .assign(data)
          .value();

        res.sendStatus(200);

    })

    //DELETE
    router.delete('/dataset/:id', function(req, res, next){

        //Break if there are no query parameters
        if(!req.params.id){
            res.status(500)
                .json({'error': 'URL Parameter Error', 'message': 'No delete id parameters given' })
            res.end()
            return
        }

        db('dataset').remove({ identifier: req.params.id });
        res.sendStatus(204);


    })

}




module.exports = DatasetRest
