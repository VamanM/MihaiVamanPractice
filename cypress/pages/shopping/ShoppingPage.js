class ShoppingPage {
  visit() {
    cy.visit('https://www.emag.ro/');
    cy.wait(500);
    this.refuseTermsAndConditionsIfPresent();
    cy.wait(500);
  }

  getRefuseTermsButton() {
    return cy.get('.js-refuse');
  }

  refuseTermsAndConditionsIfPresent() {
    cy.get('body').then(($body) => {
      if ($body.find('.js-refuse').length) {
        this.getRefuseTermsButton().click({ force: true });
      }
    });
  }

  getMainCategoryButton() {
    return cy.contains('a, button, span, div', 'TV, Audio-Video & Foto').first();
  }

  getTelevisionsLink() {
    return cy.get('a[href*="/televizoare/"]').first();
  }

  getRemoteControlsLink() {
    return cy.contains('a, span', 'Telecomenzi').first();
  }

  openTelevisionsCategory() {
    this.getMainCategoryButton()
      .scrollIntoView({ block: 'center' })
      .should('be.visible')
      .click({ force: true });

    cy.wait(500);

    this.getTelevisionsLink()
      .scrollIntoView({ block: 'center' })
      .should('be.visible')
      .click({ force: true });

    cy.wait(500);
    this.waitForProductsToLoad();
  }

  openRemoteControlsCategory() {
    this.getRemoteControlsLink()
      .scrollIntoView({ block: 'center' })
      .should('be.visible')
      .click({ force: true });

    cy.wait(500);
    this.waitForProductsToLoad();
  }

  getMinimumRatingSection() {
    return cy.contains('div, section, aside, span', 'Rating minim');
  }

  getBrandSection() {
    return cy.contains('div, section, aside, span', /^Brand$/i);
  }

  getStockSection() {
    return cy.contains('div, section, aside, span', /^Disponibilitate$/i);
  }

  selectMinimumRating(ratingOptionId) {
    this.getMinimumRatingSection()
      .scrollIntoView({ block: 'center' })
      .should('be.visible');

    cy.wait(500);

    cy.get(`a[data-option-id="${ratingOptionId}"]`)
      .scrollIntoView({ block: 'center' })
      .should('be.visible')
      .click({ force: true });

    cy.wait(500);
    this.waitForProductsToLoad();
  }

  selectBrand(brandName) {
    this.getBrandSection()
      .scrollIntoView({ block: 'center' })
      .should('be.visible');

    cy.wait(500);

    cy.get(`a[data-name="${brandName}"]`)
      .scrollIntoView({ block: 'center' })
      .should('be.visible')
      .click({ force: true });

    cy.wait(500);
    this.waitForProductsToLoad();
  }

  selectInStock() {
    this.getStockSection()
      .scrollIntoView({ block: 'center' })
      .should('be.visible');

    cy.wait(500);

    cy.get('a[data-name="In Stoc"]')
      .scrollIntoView({ block: 'center' })
      .should('be.visible')
      .click({ force: true });

    cy.wait(500);
    this.waitForProductsToLoad();
  }

  getSortDropdownButton() {
    return cy.get('button.sort-control-btn').first();
  }

  openSortDropdown() {
    this.getSortDropdownButton()
      .scrollIntoView({ block: 'center' })
      .should('be.visible')
      .click({ force: true });

    cy.wait(500);
  }

  selectSortOption(sortOption) {
    const sortMap = {
      'Pret descrescator': {
        sortId: 'price',
        sortDir: 'desc'
      },
      'Pret crescator': {
        sortId: 'price',
        sortDir: 'asc'
      }
    };

    this.openSortDropdown();

    cy.get(
      `a.js-sort-option[data-sort-id="${sortMap[sortOption].sortId}"][data-sort-dir="${sortMap[sortOption].sortDir}"]`
    )
      .scrollIntoView({ block: 'center' })
      .should('exist')
      .click({ force: true });

    cy.wait(500);
    this.waitForProductsToLoad();
  }

  waitForProductsToLoad() {
    cy.get('.card-v2-wrapper', { timeout: 20000 })
      .should('exist')
      .its('length')
      .should('be.greaterThan', 0);

    cy.wait(500);
  }

  applyMinimumRatingBrandStockAndSort({ ratingOptionId, brandName, sortOption }) {
    this.selectMinimumRating(ratingOptionId);
    this.selectBrand(brandName);
    this.selectInStock();
    this.selectSortOption(sortOption);
  }

  getFirstProductName() {
    return cy.get('.card-item:nth-child(1) .card-v2-title-wrapper');
  }

  getFirstProductPriceWhole() {
    return cy.get('.card-item:nth-child(1) .product-new-price');
  }

  getFirstProductPriceDecimals() {
    return cy.get('.card-item:nth-child(1) .product-new-price .mf-decimal');
  }

  getFirstProductAddToCartButton() {
    return cy
      .get(
        '.card-item:nth-child(1) .yeahIWantThisProduct, .card-item:nth-child(1) button[type="submit"]',
        { timeout: 15000 }
      )
      .first();
  }

  addFirstProductToCart(attempt = 0) {
    const maxAttempts = 5;

    cy.get('body').then(($body) => {
      const hasButton =
        $body.find('.card-item:nth-child(1) .yeahIWantThisProduct').length > 0 ||
        $body.find('.card-item:nth-child(1) button[type="submit"]').length > 0;

      if (hasButton) {
        this.getFirstProductAddToCartButton()
          .scrollIntoView({ block: 'center' })
          .should('exist')
          .click({ force: true });

        cy.wait(500);
        return;
      }

      if (attempt < maxAttempts) {
        cy.wait(1000);
        this.addFirstProductToCart(attempt + 1);
        return;
      }

      throw new Error(`Add to cart button was not found after ${maxAttempts + 1} attempts.`);
    });
  }

  closeAddToCartPopup() {
    cy.wait(500);

    cy.get('.modal-header button[aria-label="Inchide"]', { timeout: 10000 })
      .should('exist')
      .should('be.visible')
      .click({ force: true });

    cy.wait(500);
  }
}

export default new ShoppingPage();