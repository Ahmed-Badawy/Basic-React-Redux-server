import express from "express";
import Helpers from "../Helpers";
import {data as articlesData} from "jsonData/react-blog-mockup-data.json"

const router = express.Router();

router.get("/articlesApi", function(req,res){
	res.send(articlesData);
});

router.get('/main/:id?', function(req, res, next) {
	setTimeout(function(){
		if(!req.params.id||req.params.id==false){
			var err = new Error('Server Logic Error')
			err.status = 500;
			return next(err);
		}
		let response_obj = {data: {id:req.params.id, one:1,two:2}};
		res.json({response_obj})
	}, Helpers.getRandomResponseTime())
});



let tasks = [
	{ id:1 , name: "task 1" },
	{ id:2 , name: "task 2" },
	{ id:3 , name: "task 3" },
	{ id:4 , name: "task 4" },
]
router.get("/tasks", function(req,res){
	res.send({tasks});
});




export default router;
