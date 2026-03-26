class CartPage {
    clickViewCartDetails() {
        cy.contains('button, a', 'Vezi detalii cos')
            .should('be.visible')
            .click({ force: true });

        cy.wait(500);
    }

    getCartItemTitle(index) {
        return cy.get(`div[class^="vendors-item"]:nth-child(${index}) .line-item-title`, {
            timeout: 15000
        });
    }

    getCartItemPriceWhole(index) {
        return cy.get(`div[class^="vendors-item"]:nth-child(${index}) .d-md-block .product-new-price`, {
            timeout: 15000
        });
    }

    getCartItemPriceDecimals(index) {
        return cy.get(`div[class^="vendors-item"]:nth-child(${index}) .d-md-block .mf-decimal`, {
            timeout: 15000
        });
    }

    getTotalWhole() {
        return cy.get('.order-summary-items-price', { timeout: 15000 }).last();
    }

    getTotalDecimals() {
        return cy.get('.order-summary-items-price .mf-decimal', { timeout: 15000 }).last();
    }

    verifyBrandForCartItem(index, brandName) {
        cy.wait(500);

        this.getCartItemTitle(index)
            .should('exist')
            .should('be.visible')
            .invoke('text')
            .then((text) => {
                const cleanedText = text.trim().toLowerCase();
                expect(cleanedText).to.not.eq('');
                expect(cleanedText).to.include(brandName.toLowerCase());
            });

        cy.wait(500);
    }

    verifyCartItemPrice(index, expectedWhole, expectedDecimal) {
        cy.wait(500);

        this.getCartItemPriceWhole(index)
            .should('exist')
            .should('be.visible')
            .invoke('text')
            .then((wholeText) => {
                this.getCartItemPriceDecimals(index)
                    .should('exist')
                    .should('be.visible')
                    .invoke('text')
                    .then((decimalText) => {
                        expect(wholeText.trim()).to.eq(expectedWhole.trim());
                        expect(decimalText.trim()).to.eq(expectedDecimal.trim());
                    });
            });

        cy.wait(500);
    }
}

export default new CartPage();