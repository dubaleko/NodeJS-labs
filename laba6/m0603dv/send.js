const nodemailer = require('nodemailer');

module.exports = (message) =>
{
    const transport = nodemailer.createTransport(
        {
            host : 'smtp.mail.ru',
            port : 465,
            secure : true,
            auth: {
                user: 'dubaleco@mail.ru',
                pass: 'adidas14'
            }
        });
    const  mail_options  = {
        from :'dubaleco@mail.ru',
        to: 'dubaleco@yandex.ru',
        text: message.toString()
    };
    transport.sendMail(mail_options, function (error, info) {
        if(error) console.log(error);
        else console.log("Email sent");
    });
}