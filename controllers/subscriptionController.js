import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
          service: 'gmail', 
          auth: {
                    user: 'sinhashreyash110@gmail.com',
                    pass: 'jrso rzuo lwdr hran',
          },
});

export const subscriptionsSupport = async (req, res) => {
          const { email } = req.body;

          const mailOptions = {
                    from: email,
                    to: 'sinhashreyash110@gmail.com',
                    subject: 'New Subscription',
                    text: `You have a new subscriber: ${email}`,
          };
          transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                              return res.status(500).send({ message: 'Error sending email', error });
                    }
                    return res.status(200).send({ message: 'Email sent successfully' });
          });
};