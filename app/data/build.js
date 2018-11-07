const animals = require("./animals.json");
const connection = require("./connection.js");

function insert (query, animal)
{
    connection.query(query, 
    [   animal.Name,
        animal.Active,
        animal.Color,
        animal.category,
        animal.species,
        Math.floor(Math.random() * 100),
        "2018-11-04",
        "2018-11-04"
    ],
    function (error, results)
    {   if (error) throw error;
    
        console.log(animal.Name, " inserted");
    })
};

for (var i=0; i<animals.length; i++)
// for (var i=0; i<25; i++)
{
// console.log("animals[", i, "]: ", animals[i]);
// var i = 25;
console.log("insert: ",  i, " of ", animals.length);
    var query = "insert into Animals " +
                "(name, active, color_code, animal_group, species, cage, enter_date, mod_date) " +
                "values (?, ?, ?, ?, ?, ?, ?, ?);";
    
    // connection.query(query, 
    // [   animals[i].Name,
    //     animals[i].Active,
    //     animals[i].Color,
    //     animals[i].category,
    //     animals[i].species,
    //     Math.floor(Math.random() * 100),
    //     "2018-11-04",
    //     "2018-11-04"
    // ],
    // function (error, results)
    // {   if (error) throw error;
    
    //     console.log(animals[i].Name, " inserted");
    // })

    insert (query, animals[i]);
}

connection.end();