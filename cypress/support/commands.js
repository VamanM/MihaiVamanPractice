Cypress.Commands.add('verifyExternalLinkDomain', (selector, expectedDomain) => {
  cy.get(selector)
    .should('be.visible')
    .should('have.attr', 'href')
    .then((href) => {
      expect(href).to.include(expectedDomain);

      const normalizedHref = href.startsWith('http') ? href : `https://${href}`;
      const url = new URL(normalizedHref);

      expect(url.hostname).to.include(expectedDomain);
    });
});