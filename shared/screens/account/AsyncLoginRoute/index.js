import React from 'react';
import { asyncComponent } from 'react-async-component';
import { LoadingBox as Loading } from 'components/Loading';

export default asyncComponent({
  // include home and about route in same chunk e.g main
  resolve: () =>
    new Promise(resolve =>
      // Webpack's code splitting API w/naming
      require.ensure(
        [],
        (require) => {
          resolve(require('./LoginRoute'));
        },
        'admin',
      ),
    ),
  LoadingComponent: () => <Loading />,
});
