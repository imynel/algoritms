import { circle } from "../../src/constants/test";

describe('test list', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/list');
  });

  it('input value null => button = disabled', () => {
    cy.get('[data-cy="valueInput"]').should('contain', '')
    cy.get('[data-cy="addHeadButton"]').should('be.disabled')
    cy.get('[data-cy="addTailButton"]').should('be.disabled')

    cy.get('[data-cy="indexInput"]').should('contain', '')
    cy.get('[data-cy="addIndexButton"]').should('be.disabled')
    cy.get('[data-cy="deleteIndexButton"]').should('be.disabled')
  })
  
  it('correct default list', () => {
    cy.get(circle).each(elm => {
      cy.wrap(elm).should('not.have.text', '')
    })
  })

  it('add element in head', () => {
    cy.get('[data-cy="valueInput"]').type('123')
    cy.get('[data-cy="addHeadButton"]').click()

    cy.wait(1500)
    cy.get(circle).should('have.length', 5)
  })

  it('ghj', () => {
    const a = cy.get(circle).length

    if(a === cy.get(circle).length) cy.get(circle).should('exist')
  })

})