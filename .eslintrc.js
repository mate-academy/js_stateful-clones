module.exports = {
	extends: '@mate-academy/eslint-config',
	env: {
		jest: true,
	},
	rules: {
		'no-proto': 0,
		indent: [0, 'tab'],
		'no-tabs': 0,
		'no-console': 'off',
	},
	plugins: ['jest'],
};
