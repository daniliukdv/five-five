const { onRequest } = require("firebase-functions/v2/https");
const { Telegraf } = require("telegraf");

exports.createApplication = onRequest(
  { cors: true },
  async (request, response) => {
    try {
      const token = "6938648275:AAH5EbDwfs-qqfXJlu8TkpASn_zDUfM28mo";
      const bot = new Telegraf(token);

      const { name, tel, buyCurrency, buyAmount } = request.body.data;
      let message = `${name}(${tel}) створив заявку на обмін`;

      if (buyCurrency) {
        message += ` ${buyAmount} ${buyCurrency.code}`;
      }

      // const chatId = "345890210"; Я
      const chatId = "478704720"; // Игорь
      // 299061078, 5473127424
      for (const id of ["345890210", "478704720", "299061078", "5473127424"]) {
        await bot.telegram.sendMessage(id, message);
      }

      response.status(200).send({ data: null });
    } catch (e) {
      response.status(400).send("Error");
    }
  },
);
