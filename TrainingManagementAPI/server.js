const express = require('express');
const userRepository = require('./Repository/user.repository.js');
const trainingRepository = require('./Repository/training.repository.js');
const scenarioRepository = require('./Repository/scenario.repository.js');
var cors = require('cors');    // CORS enabled on server level.
const app = express();

const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {    
    //console.log(req.body) // populated!
    next();
})

const port = process.env.port || 3040;
const router = express.Router();

// -----------------------------------  User Management API Routes ---------------------------------------

//router.get('/users', function(request, response)  -- CORS enabled on route level
router.get('/users', function(request, response){
     userRepository.getUsers(request.query, function(result){
         if(result != undefined)
            response.json(200,result);
        else
            response.json(300, { error: "Unable to process request due to internal server error" });
    });    
});

router.get('/usersbyrole', function (request, response) {
    userRepository.getUsersByRole(request.query, function (result) {
        if (result != undefined)
            response.json(200, result);
        else
            response.json(300, { error: "Unable to process request due to internal server error" });
    });
});

router.get('/user', function(request, response){
    userRepository.getUser(request.query, function(result){
         if(result != undefined)
            response.json(200,result);
        else
            response.json(300, { error: "Unable to process request due to internal server error" });
    });
});

router.post('/updateuser', function(request, response){
    userRepository.update(request.query.id, request.body, function(result){
         if(result != undefined)     {
            console.log("User updated");
            response.json(200,result);
         }
        else
            response.json(300, { error: "Unable to process request due to internal server error" });
    });
});

router.post('/user', function(request, response){
    userRepository.addUser(request.body, function(){ });
});

router.post('/authenticate', function(request, response){   
    userRepository.authenticate(request.body.username, request.body.password, function(result){
        if(result != undefined)
            response.json(200,result);
        else
            response.json(300, { error: "Unable to process request due to internal server error" });
    })
});


// -----------------------------------  User Management APIs Routes ---------------------------------------



// -----------------------------------  Training Management API Routes ---------------------------------------

router.get('/trainings', function(request, response){
     trainingRepository.getTrainings(request.query, function(result){
         if(result != undefined)
            response.json(200,result);
        else
            response.json(300, { error: "Unable to process request due to internal server error" });
    });    
});

router.get('/trainertrainings', function (request, response) {
    trainingRepository.getTrainings(request.query, function (result) {
        if (result != undefined)
            response.json(200, result);
        else
            response.json(300, { error: "Unable to process request due to internal server error" });
    });
});

router.get('/training', function(request, response){
    trainingRepository.getTraining(request.query, function(result){
         if(result != undefined)
            response.json(200,result);
        else
            response.json(300, { error: "Unable to process request due to internal server error" });
    });
});

router.post('/updateTraining', function(request, response){
    trainingRepository.update(request.query.id, request.body, function(result){
         if(result != undefined)     {
            console.log("Training updated");
            response.json(200,result);
         }
        else
            response.json(300, { error: "Unable to process request due to internal server error" });
    });
});

router.post('/training', function(request, response){
    trainingRepository.addTraining(request.body, function(){ });
});

// -----------------------------------  Training Management APIs Routes ---------------------------------------


// -----------------------------------  Scenario Management API Routes ---------------------------------------

router.get('/scenarios', function (request, response) {
    scenarioRepository.getScenarios(request.query, function (result) {
        if (result != undefined)
            response.json(200, result);
        else
            response.json(300, { error: "Unable to process request due to internal server error" });
    });
});

router.get('/scenario', function (request, response) {
    scenarioRepository.getScenario(request.query, function (result) {
        if (result != undefined)
            response.json(200, result);
        else
            response.json(300, { error: "Unable to process request due to internal server error" });
    });
});

router.post('/completeScenario', function (request, response) {
    scenarioRepository.completeScenario(request.query.id, request.body.completed, function (result) {
        if (result != undefined) {
            console.log("Scenario completed");
            response.json(200, result);
        }
        else
            response.json(300, { error: "Unable to process request due to internal server error" });
    });
});

router.post('/scenario', function (request, response) {
    scenarioRepository.addScenario(request.body, function () { });
});

// -----------------------------------  Scenario Management APIs Routes ---------------------------------------


function createResponseObject(status, message, data)
{
    var object = { status: status, message: message, data: data };
    return object;
}

app.use('/api', router);
app.listen(port);

console.log('Magic happens on port ' + port);
