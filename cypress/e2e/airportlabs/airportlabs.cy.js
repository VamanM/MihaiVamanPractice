import airportLabsHomePage from '../../pages/airportlabs/AirportLabsHomePage';
import airportLabsBlogPage from '../../pages/airportlabs/AirportLabsBlogPage';

describe('AirportLabs Homepage - Part 1', () => {
  beforeEach(() => {
    airportLabsHomePage.visit();
  });

  it('Scenario 1 - verifies Company Updates title text, font size, font weight and visibility on desktop', () => {
    airportLabsHomePage.openCompanyUpdatesPage();

    cy.url().should('include', '/blog');

    airportLabsBlogPage
      .getCompanyUpdatesTitle()
      .should('be.visible')
      .and('have.text', 'Company Updates')
      .and('have.css', 'font-size', '60px')
      .and('have.css', 'font-weight', '300');
  });

  it('Scenario 1 - verifies Company Updates title text, font size, font weight and visibility on mobile', () => {
    airportLabsHomePage.openCompanyUpdatesPage();

    cy.url().should('include', '/blog');

    cy.viewport('iphone-xr');

    airportLabsBlogPage
      .getCompanyUpdatesTitle()
      .should('be.visible')
      .and('have.text', 'Company Updates')
      .and('have.css', 'font-size', '60px')
      .and('have.css', 'font-weight', '300');
  });

  it('Scenario 2 - verifies one statistic value, label and style using fixture data', () => {
    cy.fixture('activityStats').then((stats) => {
      stats.forEach((stat) => {
        airportLabsHomePage
          .getTrustedByStatisticTitle()
          .scrollIntoView()
          .should('be.visible')
          .and('contain.text', stat.value)
          .and('contain.text', stat.label)
          .and('have.css', 'font-size', '40px')
          .and('have.css', 'font-weight', '300');
      });
    });
  });


  it('Scenario 3 - verifies social media links visibility, href correctness, and opened URL domain', () => {
    airportLabsHomePage
      .getFacebookLink()
      .scrollIntoView()
      .should('be.visible')
      .and('have.attr', 'href', 'https://www.facebook.com/AirportLabs')
      .and('have.attr', 'target', '_blank');

    airportLabsHomePage
      .getInstagramLink()
      .scrollIntoView()
      .should('be.visible')
      .and('have.attr', 'href', 'https://www.instagram.com/airportlabspeople/')
      .and('have.attr', 'target', '_blank');

    airportLabsHomePage
      .getLinkedinLink()
      .scrollIntoView()
      .should('be.visible')
      .and('have.attr', 'href', 'https://www.linkedin.com/company/airportlabs/')
      .and('have.attr', 'target', '_blank');

    airportLabsHomePage
      .getFacebookLink()
      .scrollIntoView()
      .invoke('removeAttr', 'target')
      .click();

    cy.origin('https://www.facebook.com', () => {
      cy.location('hostname').should('eq', 'www.facebook.com');
    });

    cy.go('back');

    airportLabsHomePage
      .getInstagramLink()
      .scrollIntoView()
      .invoke('removeAttr', 'target')
      .click();

    cy.origin('https://www.instagram.com', () => {
      cy.location('hostname').should('eq', 'www.instagram.com');
    });

    cy.go('back');

    airportLabsHomePage
      .getLinkedinLink()
      .scrollIntoView()
      .invoke('removeAttr', 'target')
      .click();

    cy.origin('https://www.linkedin.com', () => {
      cy.location('hostname').should('eq', 'www.linkedin.com');
    });
  });

  it('Scenario 4 - verifies logo visibility, rendered dimensions and negative assertion', () => {
    airportLabsHomePage
      .getLogo()
      .should('be.visible')
      .and(($logo) => {
        expect($logo[0].naturalWidth).to.be.greaterThan(0);
        expect($logo[0].naturalHeight).to.be.greaterThan(0);
      });

    airportLabsHomePage
      .getLogo()
      .should('not.have.css', 'display', 'none');
  });


  it('Scenario 5 - verifies all products from the Products section are visible and correctly linked', () => {
    const expectedProducts = [
      'SkyCore AODB',
      'Airport Community App',
      'VisionAir FIDS',
      'Laminar Queue Management',
      'GCAM',
      'Allegra RMS',
      'RealTime Airport',
      'ADR',
      'Pocket Flights',
      'AirTalk',
      'AirportLabs Billing'
    ];
    airportLabsHomePage.closeHomeBanner();

    airportLabsHomePage.openProductsDropDown();

    airportLabsHomePage
      .getProductsSectionTitle()
      .should('be.visible')
      .and('have.text', 'Our Products');

    airportLabsHomePage
      .getProductsSectionLinks()
      .should('have.length', 11);

    expectedProducts.forEach((productName) => {
      cy.contains('.products-wrapper .dropdown-grid a', productName)
        .should('be.visible')
        .and('have.attr', 'href')
        .and('include', '/product-tours/');
    });
  });

});