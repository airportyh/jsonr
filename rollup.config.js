import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: "jsonr.js",
  
  output: {
    file: 'jsonr.lib.js',
    format: 'iife',
    name: "Jsonr"
  },
  plugins: [commonjs(), nodeResolve()]
};