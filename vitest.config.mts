import { defineConfig } from 'vitest/config';
import babel from '@rolldown/plugin-babel';

function decoratorPreset(options: Record<string, unknown>) {
  return {
    preset: () => ({
      plugins: [['@babel/plugin-proposal-decorators', options]],
    }),
    rolldown: {
      // ne s'applique qu'aux fichiers qui contiennent un "@"
      filter: { code: '@' },
    },
  };
}

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [babel({ presets: [decoratorPreset({ version: '2023-11' })] })],
  test: {},
});