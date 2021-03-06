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

		it('fails with incorrect credentials', function() {
			cy.get('#username').type('test_user');
			cy.get('#password').type('wrong_password');
			cy.get('#signin-button').click();

			cy.contains('Welcome Back :)');
			cy.contains(
				"Don't have an account? Create a new one"
			);

			cy.get('.error').contains('Wrong credentials');
			cy
				.get('.error')
				.should(
					'have.css',
					'background-color',
					'rgb(231, 76, 60)'
				);
		});

		describe("When logged in and another user's course exists", function() {
			beforeEach(function() {
				///// BYPASS THE UI
				cy.login({
					username : 'test_user_2',
					password : 'secret!!!'
				});

				cy.createCourse({
					title   : 'test title 2',
					teacher : 'test teacher 2',
					subject : 'test subject 2'
				});

				localStorage.clear();

				cy.login({
					username : 'test_user',
					password : 'abc123xyz'
				});
			});

			it('A new course can be created', function() {
				cy.contains('Courses').click();
				cy.contains('Create a new course').click();
				cy.get('#title').type('test title');
				cy.get('#teacher').type('test teacher');
				cy.get('#subject').type('test subject');
				cy.get('#question').type('test question');
				cy.get('#answer').type('test answer');
				cy.get('#add-question-button').click();
				cy.get('#save-course-button').click();

				cy.contains('test title');
				cy.contains('test teacher');
				cy
					.get('.success')
					.should(
						'contain',
						'Created new course: test title'
					);
				cy
					.get('.success')
					.should(
						'have.css',
						'background-color',
						'rgb(26, 188, 156)'
					);
			});

			describe('and a course exists', function() {
				beforeEach(function() {
					cy.createCourse({
						title   : 'test title',
						teacher : 'test teacher',
						subject : 'test subject',
						courses : [
							{
								question : 'question 1',
								answer   : 'answer 1'
							},
							{ question: 'question 2', answer: 'answer 2' }
						]
					});
				});

				it('should be able to update course', function() {
					cy.contains('Courses').click();
					cy
						.get('.course')
						.eq(1)
						.contains('View Detail')
						.click();

					cy.contains('Edit').click();
					cy.get('#title').type(' edited!');
					cy.get('#save-course-button').click();

					cy.contains('test title edited!');
					cy
						.get('.success')
						.should('contain', 'Updated course');
					cy
						.get('.success')
						.should(
							'have.css',
							'background-color',
							'rgb(26, 188, 156)'
						);
				});

				it('user can delete their own course', function() {
					cy.createCourse({
						title  : 'test title 3',
						author : 'test author 3',
						url    : 'www.test.com 3'
					});
					cy
						.get('.course')
						.eq(2)
						.contains('View Detail')
						.click();
					cy.contains('Delete').click();

					cy.contains('Deleted course');
					cy
						.get('.course')
						.should('not.contain', 'test title 3');
				});

				it("user cannot delete another user's blog", function() {
					cy
						.get('.course')
						.eq(0)
						.contains('View Detail')
						.click();
					cy.contains('Delete').should('not.exist');
				});

				it('user can change their password', function() {
					cy.contains('Francis Bacon').click();
					cy.contains('Profile').click();

					cy.contains('Change Password').click();
					cy.get('#old').type('abc123xyz');
					cy.get('#new').type('newpassword');
					cy.get('#confirm').type('newpassword');
					cy.contains('Update Password').click();

					cy
						.get('.success')
						.should(
							'contain',
							'Sucessfully changed password'
						);

					cy
						.get('.success')
						.should(
							'have.css',
							'background-color',
							'rgb(26, 188, 156)'
						);
				});

				it('user cannot change their password with wrong old password', function() {
					cy.contains('Francis Bacon').click();
					cy.contains('Profile').click();

					cy.contains('Change Password').click();
					cy.get('#old').type('thisiswrong');
					cy.get('#new').type('newpassword');
					cy.get('#confirm').type('newpassword');
					cy.contains('Update Password').click();

					cy
						.get('.error')
						.should('contain', 'Wrong credentials');

					cy
						.get('.error')
						.should(
							'have.css',
							'background-color',
							'rgb(231, 76, 60)'
						);
				});
			});
		});
	});
});
