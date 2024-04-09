let nodemailer = require('nodemailer');
let dotenv = require('dotenv');
dotenv.config();

let transport = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user:'give the mail id ',
        pass:process.env.PASS
    }
})

let mailOptions = {
    from:'give the mail id ',
    to:'give the mail id ',
    subject:'Send From Node Nov 22 email',
    text:"Hello Text",
    html:"<b>Hello World?</b>"
}

transport.sendMail(mailOptions,(err,info) => {
    if(err) console.log(err)
    else{
        console.log(`Email Sent: ${info.response}`)
    }
})