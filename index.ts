#!/usr/bin/env node
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";

const sleep = () =>
  new Promise((res, rej) => {
    setTimeout(res, 2000);
  });
// const sleep2 = (()=> new Promise ((res,rej)=>{setTimeout(res,2000)}))
async function welcome() {
  const rainbow = chalkAnimation.rainbow("Let's Start The Game!");
  await sleep();
  rainbow.stop();
}
// 
// async function welcome2() {
//     const rainbow = chalkAnimation.rainbow("loading a game please wait")
//     await sleep2()
//     rainbow.stop()
// }
// welcome2()
let playerLife = 4;
async function askQuestion() {
  let randomNum: number = Math.floor(Math.random() * 10 + 1);

  do {
    playerLife--;
    console.log(chalk.yellowBright(`player has ${playerLife} life left `));
    
    var que = await inquirer.prompt([
      {
        type: "number",
        name: "usr_num",
        message: chalk.green(`Guess a number between 1-10`),
      },
    ]);
    console.log(que);
    if (que.usr_num === randomNum) {
      console.log(
        chalk.blue`HURRAH!` + chalk.greenBright` You Guessed A Right Number!!!`
      );
    } else if (que.usr_num > randomNum) {
      console.log(
        chalk.redBright(
          `Your guess is High! ` +
            chalk.blueBright`Try a Lower number this time `
        )
      );
    } else if (que.usr_num < randomNum) {
      console.log(
        chalk.redBright(
          `Your guess is Low! ` + chalk.blueBright`Try a Higher number this time `
        )
      );
    }
  } while (playerLife > 1 && randomNum !== que.usr_num);
  if (playerLife === 1 && randomNum !== que.usr_num) {
    console.log(chalk.redBright(`GAME OVER!!!`));
  }
}
// askQuestion();
async function askAgain() {
  do {
    console.clear();
    await welcome()
    playerLife=4
    await askQuestion();
    var restart = await inquirer.prompt([
      {
        name: "usr_restart",
        type: "input",
        message: chalk.yellowBright(
          "Do you want to play Again?" + chalk.blue`Press Y or N`
        ),
      },
    ]);
  } while (
    restart.usr_restart === "Y" ||
    restart.usr_restart === "y" ||
    restart.usr_restart === "YES" ||
    restart.usr_restart === "yes"
  );
}

askAgain()