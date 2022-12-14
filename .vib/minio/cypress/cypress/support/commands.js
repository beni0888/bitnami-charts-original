const COMMAND_DELAY = 2000;

for (const command of ['click', 'type', 'selectFile']) {
  Cypress.Commands.overwrite(command, (originalFn, ...args) => {
    const origVal = originalFn(...args);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(origVal);
      }, COMMAND_DELAY);
    });
  });
}

Cypress.Commands.add(
  'login',
  (username = Cypress.env('username'), password = Cypress.env('password')) => {
    cy.clearCookies();
    cy.visit('/login');
    cy.get('input#accessKey').type(username);
    cy.get('input#secretKey').type(password);
    cy.get('button[type="submit"]').click();
  }
);
