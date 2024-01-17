import { button, circle, input } from "../../src/constants/test";

describe('template spec', () => {
  beforeEach(function() {
    cy.visit('http://localhost:3000/stack');
  });
  
  it('input value null => button = disabled', () => {
    cy.get(input).should('contain', '')
    cy.get(button).should('be.disabled')
  })

  it('add element in stack', () => {
    
// 4 раза будет добавлено значение
    for(let i = 0; i < 4; i++) { 
      cy.get(input).type(`40${i}`)
      cy.get(button).click()

      cy.get(circle)
        .eq(i)
        .should('have.css', 'border-color', 'rgb(210, 82, 225)') // фиолетовый

      cy.get(circle)
        .eq(i)
        .should('have.css', 'border-color', 'rgb(0, 50, 255)') // синий
    }
  })

  it('delete element in stack', () => {
    for(let i = 0; i < 4; i++) { 
      cy.get(input).type(`40${i}`)
      cy.get(button).click()
      cy.wait(500)
    }

    for(let i = 0; i < 4; i++) { 
      cy.get('[data-cy="deletButton"]')
        .click()
        
      cy.get(circle)
        .eq(-1)
        .should('have.css', 'border-color', 'rgb(210, 82, 225)') // фиолетовый
    }
    
    
  })  

  it('state button clear', () => {
    for(let i = 0; i < 4; i++) { 
      cy.get(input).type(`40${i}`)
      cy.get(button).click()
      cy.wait(500)
    }   

    cy.get('[data-cy="clearButton"]').click()
      cy.get(circle).should('not.exist');
  })

})