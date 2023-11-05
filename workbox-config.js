module.exports = {
	globDirectory: './',
	globPatterns: [
		'**/*.{css,jpg,html,js,json,md}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};