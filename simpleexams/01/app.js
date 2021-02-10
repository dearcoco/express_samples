import express from 'express';

const app = express();

//--> static
app.use(express.static('./public'));
//<--

//--> view
app.set('view engine', 'ejs');
app.set('views', 'views');
//<--

//--> router
app.get('/', (req, res) => {
	res.render('index', {contents:'Hello World!'});
});

app.get('/about', (req, res) => {
	res.render('about');
});
//<--

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));