// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
Cypress.Commands.add('login', ({ username, password }) => {
	cy
		.request(
			'POST',
			'http://localhost:3001/api/auth/signin',
			{
				username,
				password
			}
		)
		.then(response => {
			console.log('response.body', response.body);
			localStorage.setItem(
				'signedInUser',
				JSON.stringify(response.body)
			);
			cy.visit('http://localhost:3000');
		});
});

Cypress.Commands.add(
	'createCourse',
	({ title, teacher, subject, questions }) => {
		console.log(
			`JSON.parse(
					localStorage.getItem('signedInUser')
				).token`,
			JSON.parse(localStorage.getItem('signedInUser')).token
		);

		cy.request({
			url     : 'http://localhost:3001/api/courses',
			method  : 'POST',
			body    : { title, teacher, subject, questions },
			headers : {
				Authorization : `bearer ${JSON.parse(
					localStorage.getItem('signedInUser')
				).token}`
			}
		});

		cy.visit('http://localhost:3000');
	}
);

//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
