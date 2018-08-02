const express = require('express');
const hbs = require('hbs');
const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public')); 

app.use((req,res,next)=>{
    res.render('maintenance.hbs');
});

app.use((req,res,next) => {
    const date = new Date().toString();
    console.log(`Now ${date}  ${req.method}  ${req.url}`);
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
app.listen(3000, ()=>{
    console.log(`Start Server with Port 3000`);
});