import { nodeResolve } from '@rollup/plugin-node-resolve';
import ts from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import terser from '@rollup/plugin-terser';
import progress from 'rollup-plugin-progress';
import { visualizer } from 'rollup-plugin-visualizer';
import cleanup from 'rollup-plugin-cleanup';
import copy from 'rollup-plugin-copy';
import typescript from 'typescript';
import dotenv from 'dotenv';
import process from 'process';
import pkg from './package.json' with { type: 'json' };

dotenv.config();

const production = process.env.NODE_ENV === 'production'
const buildType = process.env.ROLLUP_BUILD

const commonPlugins = [
  cleanup(),
  replace({
    'process.env.NODE_ENV': JSON.stringify(production ? 'production' : 'development')
  }),
  commonjs(),
  nodeResolve(),
  progress(),
  json(),
  ts({
    typescript,
    tsconfig: './tsconfig.json',
    sourceMap: !production,
  }),
];

const buildLibConfig = {
  input: 'lib/index.ts',
  output: [
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: !production,
    },
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: !production,
    },
    {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'Moxie',
      sourcemap: !production,
    },
    {
      file: 'dist/index.js',
      format: 'iife',
      name: 'Moxie',
      sourcemap: !production,
    },
  ],
  plugins: [
    ...commonPlugins,
    visualizer({
      filename: 'dist/stats.html',
      template: 'treemap',
    }),
    production && terser(),
  ].filter(Boolean),
};

const buildExampleConfig = {
  input: 'example/index.ts',
  output: {
    entryFileNames: '[name].js',
    dir: 'dist',
    format: 'esm',
    sourcemap: !production,
  },
  external: [],
  plugins: [
    ...commonPlugins,
    serve({
      verbose: true,
      contentBase: ['dist'],
      host: "localhost",
      port: 3000,
    }),
    !production && livereload(),
    copy({
      targets: [
        { src: ['example/index.html', 'example/style.css'], dest: 'dist' },
      ]
    })
  ].filter(Boolean),
};

const configs = [];

if (buildType === 'lib') {
  configs.push(buildLibConfig);
}

if (buildType === 'example') {
  configs.push(buildExampleConfig);
}

export default configs;