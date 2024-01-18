import { input, button, circle } from '../../src/constants/test'

describe('test queue', () => {
  beforeEach(function() {
    cy.visit('http://localhost:3000/queue');
  });
  
  it('input value null => button = disabled', () => {
    cy.get(input).should('contain', '')
    cy.get(button).should('be.disabled')
  })

  it('add element in queue', () => {
    for(let i = 0; i < 5; i++) {
      cy.get(input).type(`40${i}`)
      cy.get(button).click()

      cy.get(circle).eq(i).should('have.css', 'border-color', 'rgb(210, 82, 225)')
      cy.get(circle).eq(i).should('have.css', 'border-color', 'rgb(0, 50, 255)')

      if(i === 0) {
        cy.get('div[class*="circle_head"]')
          .eq(i)
          .should('have.text', 'head')
      }
      cy.get('div[class*="circle_tail"]')
          .eq(i)
          .should('have.text', 'tail')
    }
  })

  it('correct delete in queue', () => {
    for (let i = 0; i < 3; i++) {
      cy.get(input).type(`40${i}`);
      cy.get(button).click();

      cy.get('[data-cy="deleteButton"]').click()

      cy.get(circle)
        .eq(i)
        .should('have.css', 'border-color', 'rgb(210, 82, 225)') // фиолетовый

        cy.get('div[class*="circle_content"]').eq(i).should('not.have.text', 'head')
    }
  })

  it('click clear button', () => {
    for (let i = 0; i < 4; i++) {
      cy.get(input).type(`40${i}`);
      cy.get(button).click();
    }

    cy.get('[data-cy="clearButton"]').click();
  
      // Проверка, что текстовое содержимое удалено для каждого элемента массива
      cy.get(circle).each((elm) => {
        cy.wrap(elm).should('not.have.text');
      });
  });
})