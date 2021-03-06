const express=require('express');
const hbs=require('hbs');
const fs=require('fs');
const port=process.env.PORT || 3000;
var app = express();
hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');

app.use((req,res,next)=>{
    var now=new Date().toString();
    var log =`${now}  ${req.method}  ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log+'\n',(err)=>{});
    next();
});

// app.use((req,res,next)=>{
//   res.render('maintenance.hbs');
// });
app.use(express.static(__dirname+'/public'));
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
  // return 'test';
});
app.get('/',(req,res)=>{
  res.render('home.hbs',{
    name:'Visitor',
    // year:new Date().getFullYear()
  });
});


app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    name:'Visitor',
    // year:new Date().getFullYear()
  });
});

app.get('/bad',(req,res)=>{
  res.send({name:'error',
    type:['404']
  });
});

app.listen(port);
