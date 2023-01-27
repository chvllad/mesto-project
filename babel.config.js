const presets = [
  ['@babel/preset-env', {
    useBuiltIns: 'entry',
    corejs: {
      version: '3.27.1',
      proposals: true,
    },
  }],
];

export default { presets };
