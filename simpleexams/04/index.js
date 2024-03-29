import express from 'express';
import cors from 'cors';
// import mongoose from 'mongoose';


// var Schema = mongoose.Schema;

// //--> sample_analytics 접속
// const mongoURI = 'mongodb+srv://gandolf:rosehfvm!@@cluster0.uadz9.mongodb.net/sample_analytics?retryWrites=true&w=majority';
// await mongoose.connect(mongoURI, {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// });
// //<--

// //--> sample_analytics 의 컬렉션 리스트 출력
// mongoose.connection.db.listCollections().toArray(function (err, names) {
// 	console.log(names); // [{ name: 'dbname.myCollection' }]
// });
// //<--

// //--> customers 컬렉션의 갯수와 리스트 출력
// var structor = new Schema({
//     "_id" : Schema.Types.ObjectId,
//     "name" : String,
//     "username" : String,
// });

// //컬렉션 이름을 이곳에서 지정한다.
// structor.set('collection', 'customers');  

// var target = mongoose.model("customers", structor );

// target.find({},function(ee,bb){  //아무 조건없이 조회
// 	console.log(bb.length, bb);
	
// });
// //<--

const app = express();
app.use(cors({
	credentials: true,
    origin: '*',
	methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

app.post('/webhook', function(req, res, next) {
	res.send('webhook post!!');
	console.log('webhook post!!');
	console.log(req.body);
});

app.get('/webhook', function(req, res, next) {
	res.send('webhook get!!');
	console.log('webhook get!!');
	console.log(req.body);
});
const PORT = 80;
app.listen(PORT, '0.0.0.0', () => console.log(`server started on port ${PORT}`));

