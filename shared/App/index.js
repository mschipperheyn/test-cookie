import React from 'react';
import Provider from 'react-redux/lib/components/Provider';
import Helmet from 'react-helmet';
// import TransitionAni from 'components/router/TransitionAni';
import configureStore from 'store/configureStore';

import 'normalize.css/normalize.css';
// import 'react-flexgrid/lib/flexgrid.css';
import styles from 'screens/siteStyles.css';

import Routes from './Routes';

import config from '../../config';

const store = configureStore({});

const App = () => (
  <div>
    <Helmet>
      <html lang="pt" />
      <title>{config('htmlPage.defaultTitle')}</title>
      <meta charSet="utf-8" />
      {/* <meta property="fb:app_id" content={config('facebook.appId')} /> */}
      <meta property="og:url" content={config('htmlPage.url')} />
      <meta property="og:title" content={config('htmlPage.defaultTitle')} />
      <meta property="og:description" content={config('htmlPage.description')} />
      <meta property="og:image" content={config('htmlPage.shareImage')} />
      <meta property="og:image:width" content={config('htmlPage.shareImageWidth')} />
      <meta property="og:image:height" content={config('htmlPage.shareImageHeight')} />
      <meta property="og:image:alt" content={config('htmlPage.defaultTitle')} />
      <meta property="og:type" content="website" />
      <meta name="application-name" content={config('htmlPage.defaultTitle')} />
      <meta name="description" content={config('htmlPage.description')} />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <meta name="description" content={config('htmlPage.description')} />
      <meta name="keywords" content={config('htmlPage.keywords')} />
      <meta name="image_src" content={config('htmlPage.shareImage')} />
      <meta name="theme-color" content="#4257b2" />
      {/* <meta name="google-site-verification" content={config('google.siteVerification')} /> */}
      {/*
          A great reference for favicons:
          https://github.com/audreyr/favicon-cheat-sheet
          It's a pain to manage/generate them. I run both these in order,
          and combine their results:
          http://realfavicongenerator.net/
          http://www.favicomatic.com/
      */}
      <link
        rel="apple-touch-icon-precomposed"
        sizes="152x152"
        href="/favicons/apple-touch-icon-152x152.png"
      />
      <link
        rel="apple-touch-icon-precomposed"
        sizes="144x144"
        href="/favicons/apple-touch-icon-144x144.png"
      />
      <link
        rel="apple-touch-icon-precomposed"
        sizes="120x120"
        href="/favicons/apple-touch-icon-120x120.png"
      />
      <link
        rel="apple-touch-icon-precomposed"
        sizes="114x114"
        href="/favicons/apple-touch-icon-114x114.png"
      />
      <link
        rel="apple-touch-icon-precomposed"
        sizes="76x76"
        href="/favicons/apple-touch-icon-76x76.png"
      />
      <link
        rel="apple-touch-icon-precomposed"
        sizes="72x72"
        href="/favicons/apple-touch-icon-72x72.png"
      />
      <link
        rel="apple-touch-icon-precomposed"
        sizes="57x57"
        href="/favicons/apple-touch-icon-57x57.png"
      />
      <link
        rel="apple-touch-icon-precomposed"
        sizes="60x60"
        href="/favicons/apple-touch-icon-60x60.png"
      />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon-180x180.png" />
      <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#4257b2" />
      <link rel="icon" type="image/png" href="/favicons/favicon-196x196.png" sizes="196x196" />
      <link rel="icon" type="image/png" href="/favicons/favicon-128.png" sizes="128x128" />
      <link rel="icon" type="image/png" href="/favicons/favicon-96x96.png" sizes="96x96" />
      <link rel="icon" type="image/png" href="/favicons/favicon-32x32.png" sizes="32x32" />
      <link rel="icon" sizes="16x16 32x32" href="/favicon.ico" />
      <meta name="msapplication-TileColor" content="#4257b2" />
      <meta name="msapplication-TileImage" content="/favicons/mstile-144x144.png" />
      <meta name="msapplication-square70x70logo" content="/favicons/mstile-70x70.png" />
      <meta name="msapplication-square150x150logo" content="/favicons/mstile-150x150.png" />
      <meta name="msapplication-wide310x150logo" content="/favicons/mstile-310x150.png" />
      <meta name="msapplication-square310x310logo" content="/favicons/mstile-310x310.png" />
      <link rel="manifest" href="/manifest.json" />
    </Helmet>
    <Provider store={store}>
      <div className={styles.main}>
        <Routes />
      </div>
    </Provider>
  </div>
);

export default App;