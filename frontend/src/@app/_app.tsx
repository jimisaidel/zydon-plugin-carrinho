import { defineReactElement } from 'utils/plugin';

import packageJson from '../../package.json';

import AppReact from './App';

defineReactElement(AppReact, packageJson.name);
