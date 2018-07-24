// https://eslint.org/docs/user-guide/configuring

module.exports = {
	root: true,
	parserOptions: {
		parser: 'babel-eslint'
	},
	env: {
		browser: true,
	},
	// https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
	// consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
	extends: ['plugin:vue/essential', 'airbnb-base'],
	// required to lint *.vue files
	plugins: [
		'vue'
	],
	// check if imports actually resolve
	settings: {
		'import/resolver': {
			webpack: {
				config: 'webpack/webpack.base.conf.js'
			}
		}
	},
	// add your custom rules here
	rules: {
		// don't require .vue extension when importing
		'import/extensions': ['error', 'always', {
			js: 'never',
			vue: 'never'
		}],
		"no-new": 0,
		// disallow reassignment of function parameters
		// disallow parameter object manipulation except for specific exclusions
		'no-param-reassign': ['error', {
			props: true,
			ignorePropertyModificationsFor: [
				'state', // for vuex state
				'acc', // for reduce accumulators
				'e' // for e.returnvalue
			]
		}],
		// allow optionalDependencies
		'import/no-extraneous-dependencies': ['error', {
			optionalDependencies: ['test/unit/index.js']
		}],
		// allow debugger during development
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'indent': [2, 4],
		'func-names': ["error", "never"],
		'comma-dangle': ["error", "never"],
		'no-underscore-dangle': 0,
		'object-shorthand': 0,
		'space-before-function-paren': 0,
		'linebreak-style': 0,
		'no-lonely-if': 0,
		'no-else-return': 0,
		'newline-per-chained-call': 0,
		'no-param-reassign': 0,
		'prefer-const': 0,
		'no-useless-escape': 0,
		'one-var': 0,
		'max-len': 0,
		'no-restricted-syntax': ['error', 'WithStatement', 'BinaryExpression[operator="in"]'],
		'object-curly-spacing': 0,
		'prefer-arrow-callback': 0,
		'no-var': 0,
		'consistent-return': 0,
		'no-unused-vars': 0,
		'no-plusplus': 0,
		'import/extensions': 0,
		'import/first': 0,
		'keyword-spacing': 0,
		'prefer-rest-params': 0,
		'prefer-spread': 0,
		'no-unused-expressions': 0,
		'no-multi-assign': 0,
		'no-restricted-globals': 0,
		'prefer-destructuring': 0,
		'no-trailing-spaces': 0,
		'no-alert': 0,
		'guard-for-in': 0,
		'object-curly-newline': 0
	}
}
