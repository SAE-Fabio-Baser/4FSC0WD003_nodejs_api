import chalk from "chalk";
const { red, green } = chalk;

console.log(red("Ich bin ein Fehler"));
console.log(chalk.bgGray.green("Ich bin kein Fehler"));
