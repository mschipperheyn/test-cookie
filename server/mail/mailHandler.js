/**
 * Send mail with the mailHandler by using for example: fetch. E.g.

 export function sendMessage(name, email, message){
     return async dispatch => {

         const res = await fetch('/contact', {
             method : 'POST',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify({
                 name,
                 email,
                 message
             })
         });

         const json = await res.json();

         return json;

     }
  }

 * fields:
 * name
 * email
 * message
 * topic
 * subject: The subject for the email, default: Mail form
 * from:    The from address, default: config.defaultFrom
 * to:      The to address, default: config.defaultTo
 *
 * Configuration (config/values.js):
 * clientConfigFilter.mail: true
 * mail.config: use nodemailer configuration options: https://nodemailer.com/
 */

import nodemailer from 'nodemailer';
import mandrillTransport from 'nodemailer-mandrill-transport';
import config from '../../config';

const transporter = nodemailer.createTransport(mandrillTransport(config('mail.config')));

const sendEmail = config('server.sendEmail');

console.log('Nodemailer configured', sendEmail);

export function sendMandrill(from, to, subject, html, template, mergeVars = []) {
  if (!template) throw new Error('No Mandrill template selected');
  console.log(mergeVars);
  return new Promise((resolve, reject) => {
    // Don't send emails during testing
    if (process.env.NODE_ENV === 'test' || !sendEmail) {
      console.log(from, to, subject, html, template);
      resolve();
      return;
    }

    transporter.sendMail(
      {
        from,
        to,
        subject,
        html,
        mandrillOptions: {
          template_name: template,
          template_content: [],
          message: {
            merge: true,
            global_merge_vars: mergeVars /* [
              {
                name: 'fname',
                content: 'John',
              },
              {
                name: 'email',
                content: 'john@gmail.com',
              },
            ] */,
            /* merge_vars: [
              {
                vars: mergeVars,
              },
            ] */
          },
        },
      },
      (error, info) => {
        if (error) {
          console.error(
            `mail error. from: ${from}, to: ${to}, subject: ${subject}, text: ${html}`,
            error,
          );

          reject(error);
        } else {
          console.info(`mail sent from ${from} to ${to} - ${Date.now()}`);

          resolve(info);
        }
      },
    );
  });
}

function sendMail(from, to, subject, text) {
  return new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        from,
        to,
        subject,
        text,
      },
      (error, info) => {
        if (error) {
          console.error(
            `mail error. from: ${from}, to: ${to}, subject: ${subject}, text: ${text}`,
            error,
          );

          reject(error);
        } else {
          console.info(`mail sent from ${from} to ${to} - ${Date.now()}`);

          resolve(info);
        }
      },
    );
  });
}

export default function handleMail(req, res) {
  let text = '';

  for (const key in req.body) {
    if (req.body.hasOwnProperty(key) && key !== 'from' && key !== 'to' && key !== 'subject') {
      text += `${key}: ${req.body[key]}\n`;
    }
  }

  const subject = req.body.subject || 'Mail form';

  // Idea is that you can manually add a defaultFrom and defaultTo that is different from the config values
  const from = req.body.from || config('mail.defaultFrom');
  const to = req.body.to || config('mail.defaultTo');

  sendMail(from, to, subject, text)
    .then(info =>
      res.json({
        success: info.response,
      }),
    )
    .catch(error =>
      res.json({
        errors: [error],
      }),
    );
}
