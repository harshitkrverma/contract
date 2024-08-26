const { Verifier } = require('@pact-foundation/pact');
const path = require('/pacts');
const app = require('../app.js'); // Replace with your app path

describe('Pact Verification', () => {
	it('should validate the expectations of UserConsumer', async () => {
		const opts = {
			provider: 'UserProvider',
			providerBaseUrl: 'http://localhost:3000', // Replace with your app's base URL
			pactUrls: [path.resolve(__dirname, '../pacts/UserConsumer-UserProvider.json')],
			publishVerificationResult: false,
			providerVersion: '1.0.0',
			brokerUrl: 'http://localhost:9292', // Docker Pact Broker URL
			tags: ['dev'], // Optionally tag your provider version
		};
		
		await new Verifier(opts).verifyProvider();
	});
});
