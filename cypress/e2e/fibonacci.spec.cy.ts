import { input, button, circle } from '../../src/constants/test'

describe('test fibonacci', () => {

  beforeEach(function() {
    cy.visit('fibonacci');
  });

  it('input value null => button = disabled', () => {
    cy.get(input).should('contain', '')
    cy.get(button).should('be.disabled')
  })

  it('numbers are generated correctly', () => {
    cy.get(input).type('5')
    cy.get(button).click()
    cy.wait(4000)
    cy.get(circle).eq(-1).should('have.text', '8')
  })
})