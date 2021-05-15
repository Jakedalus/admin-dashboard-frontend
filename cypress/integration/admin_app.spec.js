describe('Admin app', function() {
	const user1 = {
		username : 'test_user',
		name     : 'Francis Bacon',
		password : 'abc123xyz',
		email    : 'francis@gmail.com',
		courses  : []
	};
	const user2 = {
		username : 'test_user_2',
		name     : 'M. John Harrison',
		password : 'secret!!!',
		email    : 'harrison@yahoo.net',
		courses  : []
	};
	beforeEach(function() {
		cy.request(
			'POST',
			'http://localhost:3001/api/testing/reset'
		);

		cy.request(
			'POST',
			'http://localhost:3001/api/auth/signup',
			user1
		);
		cy.request(
			'POST',
			'http://localhost:3001/api/auth/signup',
			user2
		);

		cy.visit('http://localhost:3000');
	});

	it('front page can be opened', function() {
		cy.visit('http://localhost:3000');
		cy.contains('Welcome Back :)');
		cy.contains("Don't have an account? Create a new one");
	});

	it('Sign in form is shown', function() {
		cy.visit('http://localhost:3000');
		cy.contains('Username');
		cy.contains('Password');
		cy.contains('Sign In');
	});

	describe('Signup test', function() {
		it('succeeds with correct credentials', function() {
			cy.contains('Create a new one').click();
			cy.get('#username').type('test_user3');
			cy.get('#name').type('Test User the Third');
			cy.get('#email').type('test_user3@gmail.com');

			cy.get('#password').type('abc123xyz');
			cy.get('#confirm').type('abc123xyz');

			cy.get('#signup-button').click();

			cy.contains(`Welcome, test_user3`);
		});
	});

	describe('Signin tests', function() {
		it('succeeds with correct credentials', function() {
			cy.get('#username').type('test_user');
			cy.get('#password').type('abc123xyz');
			cy.get('#signin-button').click();

			cy.contains(`Welcome, ${user1.username}`);
		});
	});
});
