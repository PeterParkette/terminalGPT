const { Configuration, OpenAIApi } = require("openai");
const chalk = require("chalk");
const { loadWithRocketGradient } = require("./gradient");
const { getContext, addContext } = require("./context");
const { appendToFile, uploadFile } = require("./file");
const { fineTune, getFineTuneModel, setFineTuneModel } = require("./fineTune");
const { error } = require("./errors");

let converstationLimit = 0;

const checkModel = (options) => {
  return getFineTuneModel() || options.engine || "text-davinci-002";
};

const generateCompletion = async (apiKey, model, prompt, options) => {
  try {
    let innerContext = getContext();
    const tgptModel = `${model}-terminal-gpt`;
    const file = `${__dirname}/../data/${tgptModel}.jsonl`;
    const configuration = new Configuration({
      apiKey,
    });

    const openai = new OpenAIApi(configuration);
    const spinner = loadWithRocketGradient("Thinking...").start();
    addContext(`${prompt}\n`);

    const request = await openai
      .createCompletion({
        model: checkModel(options),
        prompt: `Read the context, analyze and return an answer for the prompt,always wrapping block of code exactly within triple backticks.\nContext:${innerContext}\nPrompt:${prompt}\n`,
        max_tokens: 2048,
        temperature: parseInt(options.temperature) || 0.7,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })
      .then((res) => {
        addContext(`${res.data.choices[0].text}`);
        spinner.stop();
        return res;
      })
      .catch((err) => {
        checkModel(options);
        error(err);

        spinner.stop();
        return "error";
      });

    if (request == undefined || !request.data?.choices?.[0].text) {
      throw new Error("Something went wrong!");
    }

    if (options.finetunning) {
      converstationLimit = converstationLimit + 1;
      appendToFile(file, prompt, request.data.choices[0].text);
      if (converstationLimit === parseInt(options.limit)) {
        const uploadedFile = await uploadFile(apiKey, file);
        const fineTuning = await fineTune(apiKey, uploadedFile.id);
        setFineTuneModel(fineTuning.fine_tuned_model);
        addContext("");
      }
    }
    return request;
  } catch (error) {
    console.error(`${chalk.red("Something went wrong!!")} ${error}`);
  }
};

module.exports = {
  appendToFile,
  generateCompletion,
};
