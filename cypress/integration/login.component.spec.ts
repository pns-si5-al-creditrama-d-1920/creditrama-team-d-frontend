describe('POC Test', () => {
  let ibanTestUser2 = "";
  const bobNumber = Math.floor((Math.random() * 100) + 1);
  const aliceNumber = Math.floor((Math.random() * 100) + 1);
  const bob = { email: 'bob' + bobNumber + '@gmail.com', passowrd: 'TTB', username: 'bob' + bobNumber, firstName: 'bob' + bobNumber, lastName: 'strobbe'};
  const alice = { email: 'alice' + aliceNumber + '@gmail.com', passowrd: 'TTA', username: 'alice' + aliceNumber, firstName: 'alice' + aliceNumber, lastName: 'strobbe'};

  before(() => {
    //register test users and save their data
    cy.fixture('url').then(url => {
      const options = {
        method: 'POST',
        url: url.CLIENT_SERVICE_URL + 'register',
        body: {
          email: bob.email,
          password: bob.passowrd,
          username: bob.username,
          firstName: bob.firstName,
          lastName: bob.lastName
        },
      };
      cy.request(options).then(resp => cy.log(resp.body));
    });

    cy.fixture('url').then(url => {
      const options = {
        method: 'POST',
        url: url.CLIENT_SERVICE_URL + 'register',
        body: {
          email: alice.email,
          password: alice.passowrd,
          username: alice.username,
          firstName: alice.firstName,
          lastName: alice.lastName
        },
      };
      cy.request(options).then(resp => ibanTestUser2 = resp.body.bankAccounts[0]);
    });
  });

  it('Get Data for the test', function () {
    cy.log(ibanTestUser2);
    cy.fixture('url').then(url => {

      const options = {
        method: 'POST',
        url: url.AUTHORIZATION_SERVICE_URL + 'oauth/token',
        form: true,
        body: {
          grant_type: 'password',
          username: bob.username,
          password: bob.passowrd,
          client_id: 'mobile',
          client_secret: 'pin',
        },
      };
      cy.request(options).then(resp => cy.wrap(resp.body.access_token).as('bearer'));
    });
  });

  it('Login with Bob', () => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit('/login');
    cy.get('#mat-input-0').type(bob.username).should('have.value', bob.username);
    cy.get('#mat-input-1').type(bob.passowrd).should('have.value', bob.passowrd);
    cy.get('.mat-button-wrapper').click();
    cy.url().should('include', '/dashboard');
    cy.wait(5000);
  });

  it('Add a recipient', () => {
    cy.get('li').eq(1).click();
    cy.url().should('include', '/recipients');
    cy.get('form').within(() => {
      cy.get('input').type(ibanTestUser2).should('have.value', ibanTestUser2);
    })
    cy.get('#add').click();
    cy.get('mat-list-item').should('contain', alice.firstName + ' ' + alice.lastName);
    cy.wait(5000);
  });

  it('Disconnect creditrama', () => {
    cy.get('#disconnect').click();
    cy.url().should('include', '/login');
  });
});
