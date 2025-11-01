import nodemailer from 'nodemailer';
import User from '../models/user.js';

const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
                    user: 'urbanfest.help@gmail.com',
                    pass: 'hdeh sbpu pemv oohf',
          },
});


export const subscriptionsSupport = async (req, res) => {
  const { email } = req.body;

  const mailOptions = {
    from: email,
    to: 'sinhashreyash110@gmail.com',
    subject: 'Hello Shreyash! New Subscriber',
    text: `You have a new subscriber: ${email}`,
  };

  transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      return res.status(500).send({ message: 'Error sending email', error });
    }

    const updatedUser = await User.findOneAndUpdate(
      { email: email }, 
      { $set: { hasSubscription: true } },
      { new: true }
    );

    return res.status(200).send({ 
      message: 'Email sent successfully',
      user: updatedUser
    });
  });
};
