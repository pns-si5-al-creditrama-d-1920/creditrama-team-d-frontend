/* tslint:disable:only-arrow-functions */

describe('POC Test', function() {
  it('Get Data for the test', function() {
	cy.fixture('url').then(url => {

		const options = {
			method: 'POST',
			url: url.AUTHORIZATION_SERVICE_URL + 'oauth/token',
      form: true,
			body: {
			grant_type: 'password',
			username: 'agardin',
			password: 'TT829Alexis',
			client_id: 'mobile',
			client_secret: 'pin',
			},
		};
		cy.request(options).then(resp => cy.wrap(resp.body.access_token).as('bearer'));
		});
	});

  it('Login with user', function() {
	cy.clearCookies();
	cy.clearLocalStorage();
	cy.visit('/login');
	cy.url().should('include', '/login');
	cy.get('#mat-input-0').type('agardin')
		.should('have.value', 'agardin');
	cy.get('#mat-input-1').type('TT829Alexis')
		.should('have.value', 'TT829Alexis');
	cy.get('.mat-button-wrapper').click();
	cy.url().should('include', '/dashboard');
	cy.wait(5000);
  });

  it('Disconnect creditrama', function() {
	cy.get('#disconnect').click();
	cy.url().should('include', '/login');
  });
});
