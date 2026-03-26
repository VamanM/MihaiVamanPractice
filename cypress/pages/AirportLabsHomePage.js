class AirportLabsHomePage {
  visit() {
    cy.visit('/');
  }

  getCompanyMenuItem() {
    return cy.get('.about-us .navbar-text');
  }

  getCompanyUpdatesLink() {
    return cy.get('.about-us a[href="/blog"]');
  }

  getLogo() {
    return cy.get('header img, nav img').first();
  }

  getFacebookLink() {
    return cy.get('a[href="https://www.facebook.com/AirportLabs"]');
  }

  getInstagramLink() {
    return cy.get('a[href="https://www.instagram.com/airportlabspeople/"]');
  }

  getLinkedinLink() {
    return cy.get('a[href="https://www.linkedin.com/company/airportlabs/"]');
  }

  getTrustedByStatisticTitle() {
    return cy.contains('h3', 'Trusted by 100+ airports worldwide');
  }

  getProductsSectionTitle() {
    return cy.get('.products-wrapper div:nth-child(2)>.h4');
  }

  getProductsMenuItem() {
    return cy.get('.products-wrapper');
  }

  getProductsSectionLinks() {
    return cy.get('.products-wrapper .dropdown-grid a');
  }

  getHomeBannerCloseButton() {
    return cy.get('.close');
  }

  openCompanyUpdatesPage() {
    this.getCompanyMenuItem().click();
    this.getCompanyUpdatesLink().click();
  }

  openProductsDropDown() {
    return this.getProductsMenuItem().click();
  }

  closeHomeBanner() {
    return this.getHomeBannerCloseButton().click();
  }
}

export default new AirportLabsHomePage();