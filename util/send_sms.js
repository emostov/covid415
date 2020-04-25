const  { twilioAccountSid , twilioAuthToken } = require('../config/keys');
const client = require('twilio')(twilioAccountSid, twilioAuthToken);

const sendText = (volunteerName, number) => {
    client.messages
        .create({
            body: `Good news! Your neighbor ${volunteerName} has agreed to deliver your items. They have your contact info and will follow up soon.\n\nStay safe!\n ❤️ COVID415 team`,
            from: '+14157040687',
            to: `+1${number}`
        })
        .then(msg => console.log(msg.status))
        .catch(err => console.log(err));
};