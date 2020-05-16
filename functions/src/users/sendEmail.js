import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'shaun.firebase.test1@gmail.com',
        pass: 'u8tPtAws4SP6Kr5Y',
    }
});

export const sendEmail = ({ to, from, subject, message }) => {
    const mailOptions = {
        to,
        from,
        subject,
        text: message,
    };

    return transporter.sendMail(mailOptions);
}