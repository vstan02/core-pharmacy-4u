import * as fs from 'fs';

import { STATIC } from './src/config';

if (!fs.existsSync(STATIC)) {
	fs.mkdirSync(STATIC);
}
