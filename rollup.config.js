import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import pkg from './package.json'

const dependencies = Object.keys(require('./package').dependencies)
const devDependencies = Object.keys(require('./package').devDependencies)

export default [
  {
    input: 'src/main.js',
    external: [...dependencies, ...devDependencies],
    output: {
      name: pkg.name,
      file: pkg.browser,
      format: 'umd',
      globals: { react: 'react', 'react-native': 'react-native' }
    },
    plugins: [
      babel({ exclude: 'node_modules/**' }),
      resolve(),
      commonjs()
    ]
  },
  {
    input: 'src/main.js',
    external: [...dependencies, ...devDependencies],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ],
    plugins: [
      babel({ exclude: 'node_modules/**' }),
      resolve(),
      commonjs()
    ]
  }
]
