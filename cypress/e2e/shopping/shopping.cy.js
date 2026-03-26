import shoppingPage from '../../pages/shopping/ShoppingPage';
import cartPage from '../../pages/shopping/CartPage';

const buildPriceText = (whole, decimals) => {
    return `${whole}${decimals}Lei`.replace(/\s+/g, '');
};

const buildPriceNumber = (wholeText, decimalText) => {
    const whole = wholeText.replace(/\./g, '').replace(/[^\d]/g, '');
    const decimal = decimalText.replace(/[^\d]/g, '');

    return Number(`${whole}.${decimal}`);
};

const roundToTwo = (value) => Number(value.toFixed(2));

describe('Shopping flow - eMAG', () => {
    it('adds a Samsung TV and a Samsung remote control, then verifies brand, individual prices and total', () => {
        shoppingPage.visit();

        shoppingPage.openTelevisionsCategory();

        shoppingPage.applyMinimumRatingBrandStockAndSort({
            ratingOptionId: '3-5',
            brandName: 'Samsung',
            sortOption: 'Pret descrescator'
        });

        shoppingPage.getFirstProductName().invoke('text').then((text) => {
            const tvName = text.trim();
            expect(tvName.toLowerCase()).to.include('samsung');
            cy.wrap(tvName).as('tvName');
        });

        shoppingPage.getFirstProductPriceWhole().invoke('text').then((text) => {
            cy.wrap(text.trim()).as('tvPriceWhole');
        });

        shoppingPage.getFirstProductPriceDecimals().invoke('text').then((text) => {
            cy.wrap(text.trim()).as('tvPriceDecimal');
        });

        cy.get('@tvPriceWhole').then((tvWhole) => {
            cy.get('@tvPriceDecimal').then((tvDecimal) => {
                cy.wrap(buildPriceText(tvWhole, tvDecimal)).as('tvPriceText');
            });
        });

        shoppingPage.addFirstProductToCart();
        shoppingPage.closeAddToCartPopup();

        shoppingPage.openRemoteControlsCategory();

        shoppingPage.applyMinimumRatingBrandStockAndSort({
            ratingOptionId: '3-5',
            brandName: 'Samsung',
            sortOption: 'Pret crescator'
        });

        shoppingPage.getFirstProductName().invoke('text').then((text) => {
            const remoteName = text.trim();
            expect(remoteName.toLowerCase()).to.include('samsung');
            cy.wrap(remoteName).as('remoteName');
        });

        shoppingPage.getFirstProductPriceWhole().invoke('text').then((text) => {
            cy.wrap(text.trim()).as('remotePriceWhole');
        });

        shoppingPage.getFirstProductPriceDecimals().invoke('text').then((text) => {
            cy.wrap(text.trim()).as('remotePriceDecimal');
        });

        cy.get('@remotePriceWhole').then((remoteWhole) => {
            cy.get('@remotePriceDecimal').then((remoteDecimal) => {
                cy.wrap(buildPriceText(remoteWhole, remoteDecimal)).as('remotePriceText');
            });
        });

        shoppingPage.addFirstProductToCart();
        cartPage.clickViewCartDetails();

        cartPage.verifyBrandForCartItem(1, 'Samsung');
        cartPage.verifyBrandForCartItem(2, 'Samsung');

        cy.get('@tvPriceWhole').then((tvWhole) => {
            cy.get('@tvPriceDecimal').then((tvDecimal) => {
                cartPage.verifyCartItemPrice(1, tvWhole, tvDecimal);
            });
        });

        cy.get('@remotePriceWhole').then((remoteWhole) => {
            cy.get('@remotePriceDecimal').then((remoteDecimal) => {
                cartPage.verifyCartItemPrice(2, remoteWhole, remoteDecimal);
            });
        });

        cy.get('@tvPriceWhole').then((tvWhole) => {
            cy.get('@tvPriceDecimal').then((tvDecimal) => {
                cy.get('@remotePriceWhole').then((remoteWhole) => {
                    cy.get('@remotePriceDecimal').then((remoteDecimal) => {
                        const expectedTotal = roundToTwo(
                            buildPriceNumber(tvWhole, tvDecimal) + buildPriceNumber(remoteWhole, remoteDecimal)
                        );

                        cartPage.getTotalWhole()
                            .invoke('text')
                            .then((totalWhole) => {
                                cartPage.getTotalDecimals()
                                    .invoke('text')
                                    .then((totalDecimal) => {
                                        const actualTotal = roundToTwo(buildPriceNumber(totalWhole, totalDecimal));
                                        expect(actualTotal).to.eq(expectedTotal);
                                    });
                            });
                    });
                });
            });
        });
    });
});