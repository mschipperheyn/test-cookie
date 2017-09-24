import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { Strategy as LocalStrategy } from 'passport-local';
import localPassport from '../../db/sequelize/passport';
import config from '../../../config';
// import flash from 'connect-flash';

const secret = config('server.sessionHash');
const secureCookie = config('server.secureCookie');

const authenticationMiddleware = (req, res, next) => {
  console.log('authenticated', req.isAuthenticated());

  if (req.isAuthenticated()) {
    next();
  } else if (req.url.includes('/rest/')) {
    res.status(401).send('Unauthorized');
  } else {
    res.status(302).redirect('/admin/login');
  }
};

const sessionSecurity = (app) => {
  // we should enable cloudflare. We SHOULD make this ip specific. 1 is for "first proxy"
  app.set('trust proxy', 1);
  // cookie parser must use same secret as session secret
  app.use(cookieParser(secret));
  app.use(
    session({
      secret,
      // proxy: true, // cloudflare support. This should not be necessary when using 'trust prox'
      saveUninitialized: false,
      resave: false,
      maxAge: null,
      cookie: {
        path: '/admin',
        secure: secureCookie,
      },
    }),
  ); // session secret
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new LocalStrategy(localPassport.local));
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(localPassport.deserializeUser);

  // needs to be /admin because of the cookie at /admin
  app.post('/admin/login', (req, res, next) => {
    // Do email and password validation for the server
    passport.authenticate('local', (authErr, user) => {
      if (authErr) return next(new Error(authErr));
      if (!user) {
        return res.sendStatus(401);
      }
      // Passport exposes a login() function on req (also aliased as
      // logIn()) that can be used to establish a login session
      return req.logIn(user, (loginErr) => {
        if (loginErr) return res.sendStatus(401);
        return res.sendStatus(200);
      });
    })(req, res, next);
  });

  app.post('/admin/logout', (req, res) => {
    req.logOut();

    req.session.destroy(() => {
      res
        .clearCookie('connect.sid', {
          path: '/admin',
          httpOnly: true,
        })
        // .clearCookie('connect.sid', {
        //   path: '/',
        // })
        .sendStatus(200);
    });
  });

  // for now, I'm using get in stead of all because I don't have an active session timeout alert
  app.get('/admin/rest/*', authenticationMiddleware);

  // just a way to check login status
  app.get('/admin/rest/status', authenticationMiddleware, (req, res) => {
    res.sendStatus(200);
  });

  // app.use(flash()); // use connect-flash for flash messages stored in session
};

export { sessionSecurity as default, authenticationMiddleware };
