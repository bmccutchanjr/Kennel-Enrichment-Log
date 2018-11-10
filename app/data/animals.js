// animals.js is the Model component of the application, and is responsible for any logic required to
// to process the data -- other than what is actually required to maniplulate the database.
//
// It is required by api.js and in turn requires ORM.js.

// Require the dependencies
const chalk = require("chalk");
const orm = require("./orm.js");

const animals = 
{   getAllActive: function (group, callback)
    {   
        query = "select animal, color_code, cage from Animals where animal_group=? and active=true order by animal;";
        orm.select (query, group, function(status, data)
        {   
            callback (status, data);
        });
    }

}

module.exports = animals;