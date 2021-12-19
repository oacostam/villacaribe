var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {
        vcWelcome: req.i18n.__("vcWelcome"),
        vcNiceMeet: req.i18n.__("vcNiceMeet"),
        vcTellMeMore: req.i18n.__("vcTellMeMore"),
        vcServices: req.i18n.__("vcServices"),
        vcWhoWeAre: req.i18n.__("vcWhoWeAre"),
        vcWhoWeAreSub: req.i18n.__("vcWhoWeAreSub"),
        vcToggleNavigation: req.i18n.__("vcToggleNavigation"),
        vcServicesSub: req.i18n.__("vcServicesSub"),
        vcGoTop: req.i18n.__("vcGoTop"),
        vcPictures: req.i18n.__("vcPictures"),
        vcHowToArr: req.i18n.__("vcHowToArr"),
        vcByTrain: req.i18n.__("vcByTrain"),
        vcByHighWay: req.i18n.__("vcByHighWay"),
        vcContact: req.i18n.__("vcContact"),
        vcService1: req.i18n.__("vcService1"),
        vcService1Desc: req.i18n.__("vcService1Desc"),
        vcService2: req.i18n.__("vcService2"),
        vcService2Desc: req.i18n.__("vcService2Desc"),
        vcService3: req.i18n.__("vcService3"),
        vcService3Desc: req.i18n.__("vcService3Desc"),
        vcService4: req.i18n.__("vcService4"),
        vcService4Desc: req.i18n.__("vcService4Desc"),
        vcPicturesHead: req.i18n.__("vcPicturesHead"),
        vcPicturesHeadDesc: req.i18n.__("vcPicturesHeadDesc"),
        vcImg1Alt: req.i18n.__("vcImg1Alt"),
        vcImg1Desc: req.i18n.__("vcImg1Desc"),
        vcImg2Alt: req.i18n.__("vcImg2Alt"),
        vcImg2Desc: req.i18n.__("vcImg2Desc"),
        vcImg4Alt: req.i18n.__("vcImg4Alt"),
        vcImg4Desc: req.i18n.__("vcImg4Desc"),
        vcImg5Alt: req.i18n.__("vcImg5Alt"),
        vcImg5Desc: req.i18n.__("vcImg5Desc"),
        vcImg6Alt: req.i18n.__("vcImg6Alt"),
        vcImg6Desc: req.i18n.__("vcImg6Desc"),
        vcAddress: req.i18n.__("vcAddress"),
        vcTel: req.i18n.__("vcTel"),
        vcEmail: req.i18n.__("vcEmail"),
        vcDirectionsTrain: req.i18n.__("vcDirectionsTrain"),
        vcDirectionsHighway: req.i18n.__("vcDirectionsHighway"),
        vcContactUs: req.i18n.__("vcContactUs"),
        vcContactUsDesc: req.i18n.__("vcContactUsDesc"),
        vcNamePh: req.i18n.__("vcNamePh"),
        vcNameReqMessage: req.i18n.__("vcNameReqMessage"),
        vcEmailPh: req.i18n.__("vcEmailPh"),
        vcEmailReqMessage: req.i18n.__("vcEmailReqMessage"),
        vcPhonePh: req.i18n.__("vcPhonePh"),
        vcMessagePh: req.i18n.__("vcMessagePh"),
        vcMessageReqMessage: req.i18n.__("vcMessageReqMessage"),
        vcBtnSendMessage: req.i18n.__("vcBtnSendMessage"),
        vcPrivacyPolLink: req.i18n.__("vcPrivacyPolLink"),
        vcClose: req.i18n.__("vcClose"),
        vcStateContrib : req.i18n.__("vcStateContrib"),
        lang: req.i18n.locale
    });
});



router.post('/', function (req, res) {
    // create reusable transporter object using the default SMTP transport
   let transporter = nodemailer.createTransport({
    host: process.env.OUTBOUND_MAIL_SERVER,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user:process.env.EMAIL_ACCOUNT, 
        pass: process.env.EMAIL_PASS 
    }
});

    // setup e-mail data with unicode symbols
    let mailOptions = {
        from: process.env.EMAIL_ACCOUNT,// sender address
        to: 'info@villacaribe.org', // list of receivers
        subject: 'Mensaje desde la web de VillaCaribe', // Subject line
        text: req.body.name + ' con dirección de email : ' + req.body.email + ' escribío: ' + '\r\n' + req.body.message // plaintext body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('Error sending email: ' + error);
            var response500 = {
                status: 500,
                success: req.i18n.__("vcMailError")
            }
            res.send(500, JSON.stringify(response500));
        }else{
            console.log('Message sent: ' + info.response);
            var response200 = {
                status: 200,
                success: req.i18n.__("vcMailOk")
            }
            res.send(JSON.stringify(response200));
        }
    });

});

module.exports = router;