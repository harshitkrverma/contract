export default {
	transform: {
		'^.+\\.jsx?$': 'babel-jest', // Transform JavaScript files using Babel
	},
	// extensionsToTreatAsEsm: ['.js'], // Treat .js files as ESM
	transformIgnorePatterns: ['<rootDir>/node_modules/'], // Transform files in node_modules
	moduleFileExtensions: ['js', 'json', 'node'], // Extensions for module resolution
};
