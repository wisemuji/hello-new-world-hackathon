import config from '../../config';
import nodemailer from 'nodemailer';

function sendMail(email, content) {
    console.log(email);
  
    let transporter = nodemailer.createTransport({
        service: config.service,
        auth: {
            user: config.user,  // gmail 계정 아이디를 입력
            pass: config.pass          // gmail 계정의 비밀번호를 입력
        }
    });
  
    let mailOptions = {
        from: 's2017s25@e-mirim.hs.kr',    // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
        to: email ,                     // 수신 메일 주소
        subject: '[개교기념] 예약 확인 알림입니다',   // 제목
        html: content
    };
  
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        }
        else {
            console.log('Email sent: ' + info.response); 
        }
    });
};

module.exports = (app, Reservations) => {
    app.post('/sendEmail', async(req, res) => {
        let email = req.body.email;
        let token = req.body.token;
        let place = req.body.place;
        let content = '<p>고객님이 접수하신 '+place+'로의 예약이 완료되었습니다. </p>';
        await sendMail(email, content);
        Reservations.findOneAndUpdate({user_email: email, school_token: token}, {vertified: 'yes'}, {upsert: false}, (err)=>{
            if(err) {
                res.status(400).json({"message":"error!"}); 
            } else {
                res.status(200).json({"message":"email sent"}); 
            }
        });
    });

};