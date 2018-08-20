import express from "express";
import Helpers from "../Helpers";

const router = express.Router();

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



export default router;
