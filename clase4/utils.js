

//como lee un json recomendacionn ahora
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

export const readJSON= (path) => require(path)