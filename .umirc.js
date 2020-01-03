import fs from 'fs';
import { resolve } from 'path';
import pxtorem from 'postcss-pxtorem';
import lessToJs from 'less-vars-to-js';

export default {
  plugins: [
    ['umi-plugin-react', {
      dva: {
        hmr: true,
      },
      antd: true,
      routes: {
        exclude: [/(.*)\/(assets|components|models|services)\/(.*)/],
      },
      library: 'react',
      dynamicImport: {
        loadingComponent: './components/Loading/index',
      },
      pwa: {
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
          importWorkboxFrom: 'local',
        },
      },
      fastClick: true,
    }],
  ],
  hash: true,
  targets: {
    ios: 9,
    android: 4,
  },
  theme: lessToJs(fs.readFileSync('./src/utils/themes.less', 'utf8')),
  alias: {
    '@/': resolve(__dirname, 'src/'),
    '@components': resolve(__dirname, 'src/components'),
    '@layouts': resolve(__dirname, 'src/layouts'),
    '@utils': resolve(__dirname, 'src/utils'),
    'components': resolve(__dirname, 'src/components'),
    'layouts': resolve(__dirname, 'src/layouts'),
    'utils': resolve(__dirname, 'src/utils'),
    '@tarojs/redux': 'dva',
    '@tarojs/taro': 'react',
    '@tarojs/components': resolve(__dirname, 'src/components'),
  },
  devtool: 'source-map',
  extraPostCSSPlugins: [
    pxtorem({
      rootValue: 75,
      propWhiteList: [],
      selectorBlackList: [/^html/, /^body$/]
    }),
  ],
  sass: {},
  manifest: {
    basePath: '/',
  },
  env: {
    production: {
      extraBabelPlugins: ['transform-remove-console'],
    }
  },
}
