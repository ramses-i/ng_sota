import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: [
    '../src/app/**/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../shared/ui/**/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../features/login/**/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../features/feed/**/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../features/profile/**/*.@(mdx|stories.@(js|jsx|ts|tsx))',
  ],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
};

export default config;

// To customize your webpack configuration you can use the webpackFinal field.
// Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
// and https://nx.dev/recipes/storybook/custom-builder-configs
