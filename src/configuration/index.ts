import prodConfig from './config.prod';

const env = process.env.REACT_APP_ENV;

// eslint-disable-next-line import/no-mutable-exports
let config: typeof prodConfig;

switch (env) {
    case 'prod':
    default:
        config = prodConfig;
        break;
}

export default config;
