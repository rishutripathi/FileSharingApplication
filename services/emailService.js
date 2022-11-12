const nodemailer= require('nodemailer');

module.exports= async function sendMail({from,to,subject,text,html}){

    let transporter= nodemailer.createTransport({

        host: process.env.smtp_host,
        port: process.env.smtp_port,
        secure: true,
        auth: {
                 user: process.env.smtp_authUser, 
                 pass: process.env.smtp_authPassword
          },
        });

    let info= await transporter.sendMail({

        from: from,
        to: to,
        subject: subject,
        text: text,
        html: html
    });     

}