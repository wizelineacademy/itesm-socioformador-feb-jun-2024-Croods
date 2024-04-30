// utils/sendgrid.ts
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export const sendVerificationEmail = async ({
    to,
    from,
    subject,
    text,
    html,
}: {
    to: string;
    from: string;
    subject: string;
    text: string;
    html: string;
}): Promise<void> => {
    const msg = { to, from, subject, text, html };
    try {
        await sgMail.send(msg);
        console.log('Email sent');
    } catch (error) {
        console.error('Error sending email: ', error);
    }
};
