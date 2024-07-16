require("dotenv").config();
const fetch = require("node-fetch-commonjs");
const crypto = require("crypto");
global.crypto = crypto.webcrypto;
global.fetch = fetch;
const express = require("express");
const cors = require("cors");
const sequelize = require("./database");
const routes = require("./routes");
_ = require("underscore");
const User= require('./models/user')
const applications=require('./models/application')
const jobs=require('./models/jobs')
const Link=require('./models/link')


const app = express();

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// app.use(
//   cors(corsOptions)
// );

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use("/api/v1",routes)

app.get("/", (req, res) => {
  res.send("Welcome to the homepage of Telegram miniapp");
});

module.exports = app;

app.listen(PORT, async () => {
  sequelize.sync();
  console.log(`Server is running on port http://localhost:${PORT}`);
});


const TelegramBot = require('node-telegram-bot-api');

const token = '7339805053:AAHHlRS0imAHe8bB-b5oUxJUCnyiXTKm2HM';

const bot = new TelegramBot(token, {polling: true});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  // console.log(msg)
  const msgArr=msg.text.split(' ')
  switch(msgArr[0]){
    case("/menu"):
        bot.sendMessage(chatId, `Hi, thanks for showing your interest in this Job\n Please choose 'Continue' to proceed further`);
        break
    case('/start'):
        if(msgArr.length>1){
            var options = {
                reply_markup: JSON.stringify({
                    inline_keyboard: [
                        [{ text: 'Continue to Job application', callback_data: 'continue' }],
                        [{ text: 'Cancel Application', callback_data: 'cancel' }],
                    ]
                })
            };
            bot.sendMessage(chatId,`Hi ${msg.chat.first_name}! This is the referral you came here with : ${msgArr[1]}`,options)
        }else{
            bot.sendMessage(chatId,`Hi ${msg.chat.first_name}! How can I help you!`)
        }
        break
    default:
        bot.sendMessage(chatId,'Cannot process this request!')
  }
  // handling Callbacks

  bot.on('callback_query', function onCallbackQuery(callbackQuery) {
    // console.log("handling callback")
    const action = callbackQuery.data;
    const msg = callbackQuery.message;
    const opts = {
      chat_id: msg.chat.id,
      message_id: msg.message_id,
    };
    let text;
  
    switch(action){
        case('continue'):
            text="We are redirecting you to the job application"
            break
        case('cancel'):
            text="Your application has been cancelled"
            break
        default:
            text="Invalid choice"
    }
  
    bot.editMessageText(text, opts);
  });

});