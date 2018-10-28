// Kennel Enrichment Log
// Animal "database"

// It seems appropraites enough (at least for this app) to use an JavaScript object to represent the
// animals.  There isn't a lot of data, a few dozen animals at a time and a few dozen ENrichment Log
// entries at a time).  It could migrate to a database in the future, but if the data is saved to a
// file (using JSON.stringify() and fs.writeFile()) from time to time that might not be necessary.

// require the dependencies
const chalk = require("chalk");
const fs = require("fs");

var Animals = function ()
{   // A JavScript Constructor to represent the animals at the shelter and the functions (sorts, etc)
    // associated with them.

    // The list of all the animals.  The list is populated by init() from the file animals.json.
    this.animals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

    this.init = function ()
    {   // Used to initialize the Animals object when instantiating.
        //
        // Right now that means reading the file animals.json to populate animals[].  There may
        // be other requirements in the future, but for now...

        console.log(chalk.blue("Initializing Animals"));

        var obj = this;

        fs.readFile ("animals.json", function (error, data)
        {   if (error)
            {   console.error(chalk.red(error));
                return false;
            }

            obj.animals = JSON.parse(data);
            return true;
        });
    };

    this.getAll = function ()
    {   // Reserved for future use
        return this.animals;
    };

    this.saveData = function (version = 1)
    {   // Save the animals list to a file.

//         fs.exists("animals." + version + ".json", function (exists)
//         {   // First things first.  Rename the existing animals.json file so data will not be lost
//             // That means we have to check for old backups.
// 
//             if (exists)
//             {   // a backup file with this name (version number) exists, increment version number and
//                 // call saveToFile() again.
// 
//                 ++version;
//                 this.saveData (version)
//             }
//             else
//             {   // No backup file with this name (version number) exists, so we'll use this version
//                 // number to rename animals.json.  Depending on how often this happens, the proliferation
//                 // of back up files could become a problem and must be dealt with at some time.
//                 //
//                 // Perhaps the things to do would be to create a rolling overwrite of old backups.
//                 //      animals.2.json => animals.1.json
//                 //      animals.3.json => animals.2.json
//                 //      animals.4.json => animals.3.json
//                 //      animals.5.json => animals.4.json
//                 //      etc.
//                 //
//                 // animals.1.json would be lost.
//                 //
//                 // The question is how many backup files do you want to keep?  10?  100?
// 
//                 fs.rename("animals.json", "animals." + version + ".json", function(error)
//                 {   // If animals.version.json exists, this will overwrite it.  But it SHOULD NOT
//                     // exist -- that's the point of using fs.exists() after all.
// 
//                     // if (error) throw error;
// 
// console.log(this.animals);
//                     fs.writeFile("animals.json", JSON.stringify(this.animals), function(error)
//                     {   // Use fs.writeFile() to save animals[] to disk.
// 
//                         if (error) throw error;
// 
//                         console.log (chalk.green("animals data saved"));
//                     });
//                 });
//             };
//         });
        fs.writeFile("animals.json", JSON.stringify(this.animals, null, 2), function(error)
        {   // Use fs.writeFile() to save animals[] to disk.

            if (error) throw error;

            console.log (chalk.green("animals data saved"));
        });
    };

    this.sortByColor = function (category = "dog")
    {   // filter the animal list with the provided category and return a new array sorted by color and
        // name
    };

    this.sortByName = function (category = "dog")
    {   // filter the animal list with the provided category and return a new array sorted by name and
        // color

    };

    this.init();
}

module.exports = Animals;