module.exports = router
let express = require('express');
let productRouter = express.Router();
let mongodb = require('mongodb').MongoClient
let url = process.env.MONGO_URL
function router(menu)
{
    productRouter.route('/')
        .get((req,res) => 
        {
            mongodb.connect(url,function(err,dc)
            {
                if(err){
                    res.status(500).send('Error While Connecting')
                }
                else{
                    let dbobj = dc.db('nodeDb');
                    dbobj.collection('products').find().toArray(function(err,results){
                        if(err){
                            res.status(203).send('Error While Fetching')
                        }
                        else
                        {
                            res.render('products',{title:'Products Page',data:results,menu})

                        }
                    })
                }

            })
        
    })    
    productRouter.route('/category/:id')
        .get(function(req,res){
            //let id = req.params.id
            let {id} = req.params;
            mongodb.connect(url,function(err,dc){
                let dbobj = dc.db('nodeDb');
                   dbobj.collection('products').find({category_id:Number(id)}).toArray(function(err,results){
                   res.render('products',{title:'Products Page',data:results,menu})
                })
            }) 
        })

    productRouter.route('/details/:id')
        .get(function(req,res) 
    {
        let {id} = req.params;
        mongodb.connect(url,function(err,dc){
            let dbobj = dc.db('nodeDb');
            dbobj.collection('products').find({id:Number(id)}).toArray(function(err,results){
               console.log("this is produt details",results,menu)
               res.render('Products',{title:'Product Details',data:results,menu}) 

            })
        })
       
    })
    return productRouter
}

module.exports = router