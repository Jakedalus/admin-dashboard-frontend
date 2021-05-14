describe('Admin app', function() {
	// const user1 = {
	// 	username     : 'test_user',
	// 	name         : 'Francis Bacon',
	// 	passwordHash : 'abc123xyz',
	// 	email        : 'francis@gmail.com',
	// 	courses      : []
	// };
	// const user2 = {
	// 	username     : 'test_user_2',
	// 	name         : 'M. John Harrison',
	// 	passwordHash : 'secret!!!',
	// 	email        : 'harrison@yahoo.net',
	// 	courses      : []
	// };
	beforeEach(function() {
		cy.request(
			'POST',
			'http://localhost:3001/api/testing/reset'
		);

		// cy.request(
		// 	'POST',
		// 	'http://localhost:3001/api/users',
		// 	user1
		// );
		// cy.request(
		// 	'POST',
		// 	'http://localhost:3001/api/users',
		// 	user2
		// );

		cy.visit('http://localhost:3000');
	});

	it('front page can be opened', function() {
		cy.visit('http://localhost:3000');
		cy.contains('Welcome Back :)');
		cy.contains("Don't have an account? Create a new one");
	});
});
