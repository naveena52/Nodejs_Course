import express from 'express';
import formidable from 'formidable';
import fs from 'fs';
const app =express();
let port = process.env.port ||4001

app.use(express.static(__dirname+"/public"));
app.set('view engine','ejs');
app.get('/',(req,res)=>
{
    res.render('index')

})
app.post('/upload',async(req,res) => {
    let form = formidable({});
    form.parse(req, (err, fields, files) => {
        if (err) throw err;
        console.log(files)
        // res.json({ fields, files });
        let oldPath = files.uimage[0].filepath;
        let newPath = `${__dirname}/public/images/${files.uimage[0].originalFilename}`
        fs.rename(oldPath,newPath,(err) => {
            if(err) throw err;
            res.render('display',{image:`${files.uimage[0].originalFilename}`})
        })
      });
})


  
app.listen (port,()=>
{
    console.log(`Server is Runing on the port ${port}`)
})
