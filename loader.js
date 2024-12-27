import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

export async function resolve(specifier, context, next) {
  const nextResult = await next(specifier, context);

  if (specifier.endsWith('.hbs?raw')
      || specifier.endsWith('.pcss') || specifier.endsWith('.hbs')) {
      return {
          format: specifier.endsWith('.hbs?raw')
            ? 'hbs?raw'
            : specifier.endsWith('.pcss')
            ? 'pcss'
            : 'hbs',
          shortCircuit: true,
          url: nextResult.url,
      };
  }

  return nextResult;
}

export async function load(url, context, next) {
  const extension = url.split('.').pop();

  if (context.format === 'hbs?raw'
    || context.format === 'pcss' || context.format === 'hbs') {
      const rawSource = '' + await fs.readFile(fileURLToPath(url));

      if (extension === 'pcss') {
          return {
              format: 'module',
              shortCircuit: true,
              source: '',
          };
      }
      if (extension === 'hbs?raw') {
          return {
              format: 'module',
              shortCircuit: true,
              source:  `export default "${rawSource}"`,
          };
      }
  }

  return next(url, context);
}
