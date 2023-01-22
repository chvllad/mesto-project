const presets = [
  ['@babel/preset-env', {
    targets: {
      firefox: '100',
      chrome: '100',
      safari: '16',
    },
    useBuiltIns: 'entry',
    corejs: {
      version: '3.27.1',
      proposals: true,
    },
  }],
];

export default { presets };
