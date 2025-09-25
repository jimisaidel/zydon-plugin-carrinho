import { buildPlugin } from 'utils/plugin';

import packageJson from '../../package.json';

import App from './App';

buildPlugin(App, `${packageJson.name}-products-list`);
