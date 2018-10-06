import express from "express";
import serverRenders from "./serverRenderer";

const router = express.Router();

router.get('/learn/AdvancedReactjs', async function(req, res, next) { 
  const serverSideProvider = await serverRenders.ReactServerRenderer();
  res.render('serverSideRendering', {
    title:"AdvancedReactjs",
    bundle:"AdvancedReactjs",
    initialContent: serverSideProvider.markup,
    initData: serverSideProvider.initData,
    store: serverSideProvider.store
  }); 
});

router.get('/learn/AdvancedReduxNoServerRendering', function(req, res, next) { res.render('MainReactTemplate', {title:"AdvancedRedux",bundle:"AdvancedRedux"}); });
router.get('/learn/AdvancedRedux', async function(req, res, next) { 
  const serverSideProvider = await serverRenders.ReduxServerRenderer();
  res.render('serverSideRendering', {
    title:"AdvancedRedux",
    bundle:"AdvancedRedux",
    initialContent: serverSideProvider.markup,
    initData: serverSideProvider.initData,
    store: serverSideProvider.store
  }); 
});



router.get('/projects/finder', function(req, res, next) { res.render('MainReactTemplate', {title:"The Finder",bundle:"Finder"}); });
router.get('/projects/FuelCalc', function(req, res, next) { res.render('MainReactTemplate', {title:"Fuel Calculator",bundle:"FuelCalc"}); });

router.get('/projects/BasicRedux', function(req, res, next) { res.render('MainReactTemplate', {title:"BasicRedux",bundle:"BasicRedux"}); });

router.get('/projects/ConsumptionCalc', function(req, res, next) { res.render('MainReactTemplate', {title:"Electricity Consumption Calculator",bundle:"ElecCalc"}); });
router.get('/projects/MoneyCalc', function(req, res, next) { res.render('MainReactTemplate', {title:"Money Calculator",bundle:"MoneyCalc"}); });
router.get('/projects/SocialId', function(req, res, next) { res.render('MainReactTemplate', {title:"Social Id Analyzer",bundle:"SocialId"}); });
router.get('/projects/PhoneCreditCalc', function(req, res, next) { res.render('MainReactTemplate', {title:"Phone Credit Calculator",bundle:"PhoneCreditCalc"}); });

router.get('/projects/CourseTimer', function(req, res, next) { res.render('MainReactTemplate', {title:"Course Timer",bundle:"CourseTimer"}); });






router.get('/returnPromise', function(req, res, next) { 
  new Promise( (resolve,reject)=>{ setTimeout(_=>resolve("Hello World"),2000) })
    .then(output=>res.send(output))
    .catch(error=>res.send("Error: "+error));
});


router.get('/router', function(req, res, next) {
  res.render('Router', {});
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {});
});



import mongooseImp from "../mongooseImp";
router.get('/testMongoose/:id', function(req, res, next) {
  if(req.params.id=="populate_people") res.send(mongooseImp.populate_people());
  if(req.params.id=="find") mongooseImp.find().then( result=>res.send(result) );
  if(req.params.id=="update") mongooseImp.update().then( result=>res.send(result) );
  if(req.params.id=="validate") mongooseImp.validate().then( result=>res.send(result) );
});


export default router;

