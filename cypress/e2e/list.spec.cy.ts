import { addHeadButton, addIndexButton, addTailButton, circle, indexInput, valueInput } from "../../src/constants/test";

describe('test list', () => {

  beforeEach(() => {
    cy.visit('list');
  });

  it('input value null => button = disabled', () => {
    cy.get(valueInput).should('contain', '')
    cy.get(addHeadButton).should('be.disabled')
    cy.get(addTailButton).should('be.disabled')

    cy.get(indexInput).should('contain', '')
    cy.get(addIndexButton).should('be.disabled')
    cy.get('[data-cy="deleteIndexButton"]').should('be.disabled')
  })
  
  it('correct default list', () => {
    cy.get(circle).each(elm => {
      cy.wrap(elm).should('not.have.text', '')
    })
  })

  it('add element in head', () => {
    cy.get(valueInput).type('111')
    cy.get(addHeadButton).click()

    cy.get(circle).first().should('have.text', '111')
  })

  it('add element in tail', () => {
    cy.get(valueInput).type('222');
    cy.get(addTailButton).click();
  
    cy.get(circle).last().should('have.text', '222')
    });

  it('add element in index', () => {
    const index = 3
    cy.get(valueInput).type('333');
    cy.get(indexInput).type(index);
    cy.get(addIndexButton).click();

    cy.wait(3500)
    cy.get(circle).eq(index).should('have.text', '333')
  })

    it('delete element in head', () => {
    cy.get(valueInput).type('444')
    

    cy.get(circle).eq(0).then((elm) => {
      cy.get(addHeadButton).click()
      cy.get(circle).eq(0).should('not.have.text', elm.text())
    })

  })

  it('delete element in tail', () => {
    cy.get(valueInput).type('555')
    

    cy.get(circle).last().then((elm) => {
      cy.get(addTailButton).click()
      cy.get(circle).last().should('not.have.text', elm.text())
    })

  })

  it('delete element in index', () => {
    const index = 3
    cy.get(valueInput).type('666')
    cy.get(indexInput).type(index)
    

    cy.get(circle).eq(index).then((elm) => {
      cy.get(addHeadButton).click()
      cy.get(circle).eq(index).should('not.have.text', elm.text())
    })
  })
  
})