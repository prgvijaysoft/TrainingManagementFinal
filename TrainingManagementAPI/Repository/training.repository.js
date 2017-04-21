const mySql = require('mysql');
var _ = require('underscore');

var trainingRepository = {};
const config ={
    host  : 'localhost',
    port  : 3306,
    user  : 'root',
    password  : 'sa123',
    database :  'trainingmanagement'
};

var sqlQuery = "", clause = "";

const connection = mySql.createConnection(config);
connection.connect();


trainingRepository.addTraining = function(training){
    sqlQuery = "insert into training (name, createdon, sessionfrom, sessionto, active, createdby, trainer, " +
    "isstarted) values('" + training.name + "', curdate(), '" + training.sessionFrom + "','" + 
    training.sessionTo + "', true," + training.createdBy.id + ", " + training.trainer.id + ", false)";

    connection.query(sqlQuery, function(error, result){
        if(error)
            console.log(error);
        else 
            console.log('Training added');
    });
}

trainingRepository.getTrainings = function(params, callback){   
    clause = params.active != null && params.isstarted != null 
    ? " where active = " + params.active + " and " + " isstarted=" + params.isstarted 
    : (params.active != null ? " where active=" + params.active 
        : (params.isstarted != null ? " where isstarted=" + params.isstarted : "")    
       );

    sqlQuery = "select * from training " + clause;
    connection.query(sqlQuery, function(error, results){
        if(error) {
            console.log(error);
            callback(null);
        }
        else {
            if(results.length > 0)               
                callback(_.map(results, function(result){ 
                    return {
                        id: result.id, name: result.name, createdOn: result.createdon, sessionFrom: result.sessionfrom,
                        sessionTo: result.sessionto, active: result.active, createdBy: {id: result.createdby},
                        trainer: {id: result.trainer}, isStarted: result.isstarted 
                    };
                }));            
            else             
                callback({});            
        }
    });
};

trainingRepository.getTrainerTrainings = function (params, callback) {
    clause = " where trainer = " + params.trainerid;
    clause +=   params.active != null && params.isstarted != null
    ? " and active = " + params.active + " and " + " isstarted=" + params.isstarted
    : (params.active != null ? " and active=" + params.active
        : (params.isstarted != null ? " and isstarted=" + params.isstarted : "")
       );

    sqlQuery = "select * from training " + clause;
    console.log(sqlQuery);
    connection.query(sqlQuery, function (error, results) {
        if (error) {
            console.log(error);
            callback(null);
        }
        else {
            if (results.length > 0)
                callback(_.map(results, function (result) {
                    return {
                        id: result.id, name: result.name, createdOn: result.createdon, sessionFrom: result.sessionfrom,
                        sessionTo: result.sessionto, active: result.active, createdBy: { id: result.createdby },
                        trainer: { id: result.trainer }, isStarted: result.isstarted
                    };
                }));
            else
                callback({});
        }
    });
};

trainingRepository.getTraining = function(params, callback){ 
    sqlQuery = "select * from training where active=true and id=" + params.id ;
   
    connection.query(sqlQuery, function(error, result){
        if(error) {
            console.log(error);
            callback(null);
        }
        else {
            if(result.length > 0) 
                callback({  
                    id: result[0].id, name: result[0].name, createdOn: result[0].createdon, sessionFrom: result[0].sessionfrom,
                    sessionTo: result[0].sessionto, active: result[0].active, createdBy: {id: result[0].createdby},
                    trainer: {id: result[0].trainer}, isStarted: result[0].isstarted  
                });
            else
                callback({});
        }
    });
}

trainingRepository.update = function(id, training){
    sqlQuery = "update training set active="+ training.active + ", isstarted=" + training.isStarted + 
    " where id=" + id;

    connection.query(sqlQuery, function(error, result){
        if(error)
            console.log(error);
        else 
            console.log('User role changed');
    });
};

module.exports =  trainingRepository;
