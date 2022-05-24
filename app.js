const express = require('express');
const mongoose = require('mongoose');
const shortid = require('shortid');
const app = express();
const URL = require('./models/url');
require('dotenv/config');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect(process.env.DB_CONNECTION, ({useNewUrlParser:true, useUnifiedTopology: true})).then( ()=>{
   console.log('Connected to db...');
   app.listen(3000);
}).catch((err) => console.log(err));

sendResponse = (res, code, msg, obj) => {
   return res.status(code).json({
      message: msg,
      items: obj
   });
}

app.post('/api', async (req, res) => {
   const { url } = req.body;
   //console.log(url);
   // if(!validURL) {
   //    res.status(400).json('Invalid Original Url');
   // }   
   try {
      // if(alreadyInDB){
      //    let url = await Url.findOne({ origUrl });
      //    if (url) res.json(url);
      // }
      
      const uniqueId = shortid.generate(); //TODO::generate a unique id
      const shortUrl = `http://localhost:3000/${uniqueId}`;

      obj = new URL({url, shortUrl, uniqueId}); //instance of URL
      await obj.save();
      sendResponse(res, 200, 'created successfully', obj);

   } catch (error) {
      console.log(error);
      sendResponse(res, 500, 'Server error', []);
   }
})

app.get('/:id', async (req, res) => {
   try {
      const id = req.params.id;
      const obj = await URL.findOne({ uniqueId: id });
      if (obj)
      return res.redirect(obj.url);
      sendResponse(res, 404, 'Not found', []);

   } catch (error) {
      console.log(error);
      sendResponse(res, 500, 'Server error', []);
   }
})