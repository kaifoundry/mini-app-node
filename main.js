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

async function getJobsForBot(){
  try{
    let jobList=await jobs.Jobs.findAll({})
    if(jobList?.length==0 || jobList==null){
      return "Cannot find any jobs at the moment"
    }
    let jobText="Jobs currently available are displayed. You can find more about these jobs through the mini app \n\n"
    for(let i=0;i<jobList?.length;i++){
      let jobData=`${i+1}. ${jobList[i].title}\nCompany : ${jobList[i].company}\nAbout the job : ${jobList[i].jobDetail}\n\n`
      jobText+=jobData
    }
    return jobText
  }catch(err){
    return "sorry something went wrong while fetching the jobs"
  }
}

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

bot.on('message', async(msg) => {
  const chatId = msg.chat.id;
  // console.log(msg)
  const msgArr=msg.text.split(' ')
  switch(msgArr[0]){
    case("/instructions"):
        bot.sendMessage(
          chatId,
          `
            Instructions for using demo app : \n\n
1. Connect your Ton wallet\n
2. Signup as a user\n
3. Select a job to generate referral\n
4. Generate new Referral by depositing 10 Ton stars\n
5. Share the link to a candidate\n
6. Candidate will receive a rating after applying for the job\n
7. Your deposit will merge into the pool if candidate gets rating 3 or less\n
8. Deposit will be returned by the end of the week on rating greater than 3\n
9. Top 10 users with maximum referred candidates having rating 3 or more will receive 10 extra ton stars by the end of the week\n
          `
        );
        break
    case("/info"):
        bot.sendMessage(
          chatId,
          "From bondex bot : \n\nI am a bot that will guide you for using mini app, How can i help you now ?\n You can use my commands to provide instructions or launch the mini app"
        );
        break
    case("/jobs"):
        let message=await getJobsForBot()
        bot.sendMessage(chatId,message)
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
            bot.sendPhoto(chatId,"https://www.google.com/imgres?q=bondex%20logo&imgurl=https%3A%2F%2Fwww.cryptotimes.io%2Fwp-content%2Fuploads%2F2024%2F06%2Fimage-1280x720-7-2.png&imgrefurl=https%3A%2F%2Fwww.cryptotimes.io%2F2024%2F06%2F19%2Fbondex-secures-over-10-million-for-web3-professional-network%2F&docid=qvc5_gnL2E1DjM&tbnid=LjkLIIUuyOJp1M&vet=12ahUKEwjXj-Tx8rmHAxUgXGwGHQRMC44QM3oECFIQAA..i&w=1280&h=720&hcb=2&ved=2ahUKEwjXj-Tx8rmHAxUgXGwGHQRMC44QM3oECFIQAA",
              {
                caption:
                `
                Hi ${msg.chat.first_name}!\n\nI am Bondex bot, You can use following commands to interact with me : \n\n
/start : starts my conversation with you\n
/instructions : Gives appropriate instructions to earn using mini app\n
/info : Tells a bit about me.\n
/jobs : I will provide you with all the jobs available at the moment

You can launch the mini app using the 'Jobs' button and start your journey! Do let me know if you need me 
              `
              })
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