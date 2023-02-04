const { loadWithRocketGradient } = require("./gradient");
const { Configuration, OpenAIApi } = require("openai");

let fineTunnedModel = "";

const setFineTuneModel = (model) => {
  fineTunnedModel = model;
};

const getFineTuneModel = () => {
  return fineTunnedModel;
};

const retrieveFineTune = async (apiKey, tunnedID) => {
  const { Configuration, OpenAIApi } = require("openai");
  const configuration = new Configuration({
    apiKey: apiKey,
  });
  const openAi = new OpenAIApi(configuration);
  const response = await openAi.retrieveFineTune(tunnedID);
  while (response.data.status !== "succeeded") {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const newRetrieve = await openAi.retrieveFineTune(tunnedID);
    if (newRetrieve.data.status === "succeeded") {
      return;
    }
  }
};

const fineTune = async (apiKey, fileID) => {
  const configuration = new Configuration({
    apiKey,
  });

  const openAi = new OpenAIApi(configuration);
  const spinner = loadWithRocketGradient("Fine tuning...").start();
  const response = await openAi
    .createFineTune({
      training_file: fileID,
      model: "text-davinci-003",
    })
    .then((res) => {
      return res;
    });

  await retrieveFineTune(apiKey, response.data.id);
  spinner.stop();
  return response.data;
};

module.exports = {
  fineTune,
  setFineTuneModel,
  getFineTuneModel,
};
