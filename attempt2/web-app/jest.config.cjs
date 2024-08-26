// jest.config.cjs
module.exports = {
	transform: {
		"^.+\\.js$": "babel-jest",
	},
	transformIgnorePatterns: [
		"/node_modules/(?!axios)/"  // Add exceptions for modules that need to be transformed
	],
	testEnvironment: 'node',
	// extensionsToTreatAsEsm: ['.js'],
	moduleNameMapper: {
		'^(\\.{1,2}/.*)\\.js$': '$1',
	},
};
