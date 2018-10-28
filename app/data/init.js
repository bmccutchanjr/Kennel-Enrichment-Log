const Animals = require("./animals.js");
const chalk = require("chalk");
const animals = new Animals;

// animals.saveData();
setTimeout(function()
{
    console.log (chalk.red("setTimeout"));
//     console.log (chalk.red("*", animals.getAll(), "*"));
    console.log (chalk.red(JSON.stringify(animals.getAll(), null, 2)));

}, 5000);
console.log (chalk.yellow("init.js"));
console.log (chalk.yellow("*", animals.getAll(), "*"));
