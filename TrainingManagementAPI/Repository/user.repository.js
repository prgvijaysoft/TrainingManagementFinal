const mySql = require('mysql');
var _ = require('underscore');

var userRepository = {};
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


userRepository.addUser = function(user){
    sqlQuery = "insert into user (name, username, password, role, active) values('" + user.name +
    "','" + user.userName + "','" + user.password + "','" + user.role + "', true)";

    connection.query(sqlQuery, function(error, result){
        if(error)
            console.log(error);
        else 
            console.log('User added');
    });
}



userRepository.authenticate = function(userName, password, callback){
    sqlQuery = "select * from user where username='" + userName + "' and password='" +password + "'";

    console.log(sqlQuery);
    connection.query(sqlQuery, function(error, result){
        if(error) {
            console.log(error);
            callback(null);
        }
        else {
            if (result.length > 0) {               
                callback({ id: result[0].id, userName: result[0].username, password: result[0].password, name: result[0].name,
                    role: result[0].role, active: result[0].active });
            }
            else
                callback({});
        }
    });
};

userRepository.getUsers = function(params, callback){   
    sqlQuery = "select * from user" + (params.active != null ? " where active=" + params.active : "");  

    connection.query(sqlQuery, function(error, results){
        if(error) {
            console.log(error);
            callback(null);
        }
        else {
            if(results.length > 0)               
                callback(_.map(results, function(result){ 
                    return {id: result.id, userName: result.username, password: result.password, name: result.name,
                        role: result.role, active: result.active};
                }));            
            else             
                callback({});            
        }
    });
};

userRepository.getUsers = function(params, callback){   
    sqlQuery = "select * from user" + (params.active != null ? " where active=" + params.active : "");  

    connection.query(sqlQuery, function(error, results){
        if(error) {
            console.log(error);
            callback(null);
        }
        else {
            if(results.length > 0)               
                callback(_.map(results, function(result){ 
                    return {id: result.id, userName: result.username, password: result.password, name: result.name,
                        role: result.role, active: result.active};
                }));            
            else             
                callback({});            
        }
    });
};

userRepository.getUsersByRole = function (params, callback) {
    sqlQuery = "select * from user where role='" + params.role + "'";

    connection.query(sqlQuery, function (error, results) {
        if (error) {
            console.log(error);
            callback(null);
        }
        else {
            if (results.length > 0)
                callback(_.map(results, function (result) {
                    return {
                        id: result.id, userName: result.username, password: result.password, name: result.name,
                        role: result.role, active: result.active
                    };
                }));
            else
                callback({});
        }
    });
};

userRepository.getUser = function(params, callback){
    clause = params.id != null ? " where id=" + params.id : (params.username != null ? 
    " where username='" + params.username + "'" : "");
    sqlQuery = "select * from user " + clause;
   
    connection.query(sqlQuery, function(error, result){
        if(error) {
            console.log(error);
            callback(null);
        }
        else {
            if(result.length > 0) 
                callback({ id: result[0].id, userName: result[0].username, password: result[0].password, name: result[0].name,
                    role: result[0].role, active: result[0].active });
            else
                callback({});
        }
    });
}

userRepository.update = function(id, user){
    sqlQuery = "update user set role='" + user.role + "', active=" + user.active + " where id=" + id;

    connection.query(sqlQuery, function(error, result){
        if(error)
            console.log(error);
        else 
            console.log('User role changed');
    });
};

module.exports =  userRepository;
