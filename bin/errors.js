const chalk = require("chalk");

const error = (err) => {
  switch (err["response"]["status"]) {
    case "404":
      console.error(
        `${chalk.red(
          "\nNot Found: Model not found. Please check the model name."
        )}`
      );
      break;
    case "429":
      console.error(
        `${chalk.red(
          "\nAPI Rate Limit Exceeded: ChatGPT is getting too many requests from the user in a short period of time. Please wait a while before sending another message."
        )}`
      );
      break;
    case "400":
      console.error(
        `${chalk.red(
          "\nBad Request: Prompt provided is empty or too long. Prompt should be between 1 and 4096 tokens."
        )}`
      );
      break;
    case "402":
      console.error(
        `${chalk.red(
          "\nPayment Required: ChatGPT quota exceeded. Please check you chatGPT account."
        )}`
      );
      break;
    case "503":
      console.error(
        `${chalk.red(
          "\nService Unavailable: ChatGPT is currently unavailable, possibly due to maintenance or high traffic. Please try again later."
        )}`
      );
      break;
    default:
      console.error(`${chalk.red("Something went wrong!!!")} ${err}`);
  }
};

module.exports = {
  error,
};
