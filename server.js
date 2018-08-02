const express = require('express');
const hbs = require('hbs');
const app = express();
const fs = require('fs');

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public')); 

// app.use((req,res,next)=>{
//     res.render('maintenance.hbs');
// });

app.use((req,res,next) => {
    const date = new Date().toString();
    const log = `Now ${date}  ${req.method}  ${req.url} \n`;
    fs.appendFile('server.log',log, (error) =>{
       if (error) console.log(error);
    });
    next();
});

hbs.registerHelper('getCurrentYear', () => {
   return new Date().getFullYear()
});
hbs.registerHelper('upCase', (text) =>{
    return text.toUpperCase();
})
app.get('/', (req,res)=>{
    res.render('home.hbs',{
        pageTitle: 'Home page',
      
    });
});
app.get('/about', (req,res)=>{
    res.render('about.hbs',{
        pageTitle: 'About page',
    });
});
app.listen(port, ()=>{
    console.log(`Start Server with Port ${port}`);
});