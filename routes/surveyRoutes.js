const mongoose = require('mongoose');
const requireCredits = require('../middlewares/requireCredits');
const requireLogin = require('../middlewares/requireLogin');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');


module.exports = app => {
    app.get('/api/surveys/thanks', (req, res) =>{
        res.send("Obrigada pelo voto");
    });

    app.post(
        '/api/surveys',
        requireLogin,
        requireCredits,
        async (req, res) => {
            const { title, subject, body, recipients } = req.body;

            const survey = new Survey({
                title: title,
                body: body,
                subject: subject,
                recipients: recipients.split(',').map(email => ({ email: email.trim() })),
                _user: req.user.id,
                dateSent: Date.now()
            });

            try {
            //send the survey by email
            const mailer = new Mailer(survey, surveyTemplate(survey));
            await mailer.send();

            await survey.save();
            req.user.credits -=1;
            const user = await req.user.save();

            res.send(user);
            }catch (error){
                res.status(422).send(error);
            }
        });
}