import bcrypt from 'bcrypt'
import config from '../../../config';
import { UserOTPVerification } from './userOTPVerifiaction.model';
import { transporter } from './userOTPVerification.utils';
import { Types } from 'mongoose';

const sendOTPVerificationEmail = async ({
  _id,
  email,
}: {
  _id: Types.ObjectId;
  email: string;
}) => {

    try {
        const otp = `${Math.floor(1000 + Math.random()* 9000)}`

        const mailOptions = {
            from: "",
            to: email,
            subject: "Verify Your Email",
            html: `<p>Enter <b> ${otp} </b> in the app to verify your email address and complete the registration.<p>
            <p> This code <b> expires in 1 hour</b>. </p>`
        }
        const hashedOTP = await bcrypt.hash(otp, Number(config.bcrypt_sald_round) );
        console.log(hashedOTP)

        const newOTPVerification = await UserOTPVerification.create({
            userId: _id,
            otp: hashedOTP,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3500000
        });

        await transporter.sendMail(mailOptions)
        
       

       return newOTPVerification;
    } catch (error:any) {
        return error.message 
    }
};

export const UserOTPVerificationService = {
  sendOTPVerificationEmail,
};
