// people.js is the Model component of the application, and is responsible for any logic required to
// to process the data on people.
//
// It is required by api.js and in turn requires ORM.js.

// Require the dependencies
const chalk = require("chalk");
const orm = require("./orm.js");

const people = 
{   getAllActive: function (group, callback)
    {   
        query = "select id, surname, given from People where active=true order by surname, given;";
        orm.select (query, group, function(status, data)
        {   
            callback (status, data);
        });
    }

}

module.exports = people;