import { sendMandrill } from './mailHandler';
import config from '../../config';

const defaultFrom = config('mail.defaultFrom');

// If you return the sendMandrill promise, an error can be thrown in the calling function. Otherwise it's fire and forget

export function sendConfirmMail(name, email, subject) {
  return sendMandrill(defaultFrom, email, subject, null, 'tpl-professor-confirm', [
    {
      name: 'FNAME',
      content: name,
    },
  ]).catch((err) => {
    console.log(err, `We failed to send the confirmation email. ${email}`);
  });
}

export function sendEditInvite(name, email, id, token, subject) {
  return sendMandrill(defaultFrom, email, subject, null, 'tplt-invite-to-edit', [
    {
      name: 'FNAME',
      content: name,
    },
    {
      name: 'ID',
      content: id,
    },
    {
      name: 'TOKEN',
      content: token,
    },
  ]).catch((err) => {
    console.log(err, `We failed to send the invite email, ${id}.`);
  });
}

export default {
  sendConfirmMail,
  sendEditInvite,
};
