describe('test routing', () => {
  const routes = [
    { dataCy: 'string', path: '/recursion' },
    { dataCy: 'fibonacci', path: '/fibonacci' },
    { dataCy: 'sorting', path: '/sorting' },
    { dataCy: 'stack', path: '/stack' },
    { dataCy: 'queue', path: '/queue' },
    { dataCy: 'list', path: '/list' },
  ]

  beforeEach(function() {
      cy.visit('/');
    });

    routes.forEach(route => {
      it(`${route.dataCy} open path`, () => {
        cy.get(`[data-cy="${route.dataCy}"]`).click()
        cy.location('pathname').should('eq', route.path)
      })
    })
})