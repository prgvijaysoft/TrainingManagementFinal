const mySql = require('mysql');
var _ = require('underscore');

var scenarioRepository = {};
const config = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'sa123',
    database: 'trainingmanagement'
};

var sqlQuery = "", clause = "";

const connection = mySql.createConnection(config);
connection.connect();


scenarioRepository.addScenario = function (scenario) {
    sqlQuery = "insert into scenario (question, createdon, createdby, trainingid, completed values('" + scenario.name + "', curdate(), '" + training.sessionFrom + "','" +
    scenario.createdBy.id + ", " + scenario.training.id + ", false)";

    connection.query(sqlQuery, function (error, result) {
        if (error)
            console.log(error);
        else
            console.log('Scenario added');
    });
}

//id: number;
//question: string;
//createdOn: Date;
//createdBy: User;
//training: Training;

scenarioRepository.getScenarios = function (params, callback) {
   
    sqlQuery = "select * from scenario where trainingid=" + params.trainingid;
    connection.query(sqlQuery, function (error, results) {
        if (error) {
            console.log(error);
            callback(null);
        }
        else {
            if (results.length > 0)
                callback(_.map(results, function (result) {
                    return {
                        id: result.id, question: result.question, training: {id: result.id}, completed: result.completed
                    };
                }));
            else
                callback({});
        }
    });
};

scenarioRepository.getScenario = function (params, callback) {
    sqlQuery = "select * from scenario where id=" + params.id;

    connection.query(sqlQuery, function (error, result) {
        if (error) {
            console.log(error);
            callback(null);
        }
        else {
            if (result.length > 0)
                callback({
                    id: result[0].id, question: result[0].question, training: { id: result[0].id }, completed: result.completed
                });
            else
                callback({});
        }
    });
}

scenarioRepository.completeScenario = function (id, completed) {
    sqlQuery = "update scenario set completed="+ completed + " where id=" + id;

    connection.query(sqlQuery, function (error, result) {
        if (error)
            console.log(error);
        else
            console.log('Scenario completed');
    });
};

module.exports = scenarioRepository;
