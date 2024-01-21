import { input, button, circle } from '../../src/constants/test'
describe('test string', () => {

  beforeEach(function() {
    cy.visit('recursion');
  });
  
  it('input value null => button = disabled', () => {
    cy.get(input).should('contain', '')
    cy.get(button).should('be.disabled')
  })

  it('the string expands correctly', () => {
    const testText = '12342'
    cy.get(input).type(testText)
    cy.get(button).click()

    for(let i = 0;  i < testText.length / 2; i++) {
      cy.get(circle)
              .eq(i)
              .should('have.css', 'border-color', 'rgb(210, 82, 225)')

      cy.get(circle)
          .eq(testText.length - 1 - i)
          .should('have.css', 'border-color', 'rgb(210, 82, 225)')

      cy.wait(1000);

      cy.get(circle)
          .eq(i)
          .should('have.css', 'border-color', 'rgb(127, 224, 81)')

      cy.get(circle)
          .eq(testText.length - 1 - i)
          .should('have.css', 'border-color', 'rgb(127, 224, 81)')

    }
  })
})