//E2E test for the compare two cards functionality - Carolina González A01284948

describe("Load three cards", () => {
  it("passes", () => {
    // Prepare the database
    cy.request("http://localhost:3000/api/testing")
    cy.login()
    cy.wait(8000)
    cy.visit("http://localhost:3000/")
    cy.wait(8000)
    cy.setCookie(
      "compareData",
      "%7B%22categories%22%3A%5B%22Description%22%2C%22Price%22%2C%22Sound%20quality%22%2C%22Brand%20reputation%22%2C%22Design%22%2C%22Key%20action%22%5D%2C%22results%22%3A%5B%7B%22Name%22%3A%22Steinway%20%26%20Sons%22%2C%22Description%22%3A%22Handcrafted%20pianos%20with%20a%20focus%20on%20quality%20and%20tradition.%22%2C%22Categories%22%3A%5B%7B%22Name%22%3A%22Price%22%2C%22Value%22%3A%22High%22%7D%2C%7B%22Name%22%3A%22Sound%20quality%22%2C%22Value%22%3A%22Excellent%22%7D%2C%7B%22Name%22%3A%22Brand%20reputation%22%2C%22Value%22%3A%22Iconic%20and%20renowned%22%7D%2C%7B%22Name%22%3A%22Design%22%2C%22Value%22%3A%22Elegant%20and%20timeless%22%7D%2C%7B%22Name%22%3A%22Key%20action%22%2C%22Value%22%3A%22Superb%22%7D%5D%7D%2C%7B%22Name%22%3A%22Yamaha%22%2C%22Description%22%3A%22Japanese%20manufacturer%20known%20for%20innovation%2C%20reliability%2C%20and%20versatility.%22%2C%22Categories%22%3A%5B%7B%22Name%22%3A%22Price%22%2C%22Value%22%3A%22Moderate%20to%20high%22%7D%2C%7B%22Name%22%3A%22Sound%20quality%22%2C%22Value%22%3A%22Very%20good%22%7D%2C%7B%22Name%22%3A%22Brand%20reputation%22%2C%22Value%22%3A%22Renowned%22%7D%2C%7B%22Name%22%3A%22Design%22%2C%22Value%22%3A%22Modern%20and%20sleek%22%7D%2C%7B%22Name%22%3A%22Key%20action%22%2C%22Value%22%3A%22Excellent%22%7D%5D%7D%2C%7B%22Name%22%3A%22Bechstein%22%2C%22Description%22%3A%22German%20manufacturer%20known%20for%20craftsmanship%20and%20rich%2C%20powerful%20sound.%22%2C%22Categories%22%3A%5B%7B%22Name%22%3A%22Price%22%2C%22Value%22%3A%22High%22%7D%2C%7B%22Name%22%3A%22Sound%20quality%22%2C%22Value%22%3A%22Excellent%22%7D%2C%7B%22Name%22%3A%22Brand%20reputation%22%2C%22Value%22%3A%22Renowned%22%7D%2C%7B%22Name%22%3A%22Design%22%2C%22Value%22%3A%22Elegant%20and%20luxurious%22%7D%2C%7B%22Name%22%3A%22Key%20action%22%2C%22Value%22%3A%22Superb%22%7D%5D%7D%2C%7B%22Name%22%3A%22Kawai%22%2C%22Description%22%3A%22Japanese%20manufacturer%20known%20for%20quality%2C%20innovation%2C%20and%20value.%22%2C%22Categories%22%3A%5B%7B%22Name%22%3A%22Price%22%2C%22Value%22%3A%22Moderate%22%7D%2C%7B%22Name%22%3A%22Sound%20quality%22%2C%22Value%22%3A%22Very%20good%22%7D%2C%7B%22Name%22%3A%22Brand%20reputation%22%2C%22Value%22%3A%22Distinguished%22%7D%2C%7B%22Name%22%3A%22Design%22%2C%22Value%22%3A%22Modern%20and%20stylish%22%7D%2C%7B%22Name%22%3A%22Key%20action%22%2C%22Value%22%3A%22Excellent%22%7D%5D%7D%2C%7B%22Name%22%3A%22Grotrian-Steinweg%22%2C%22Description%22%3A%22German%20manufacturer%20known%20for%20craftsmanship%2C%20sound%20quality%2C%20and%20tradition.%22%2C%22Categories%22%3A%5B%7B%22Name%22%3A%22Price%22%2C%22Value%22%3A%22High%22%7D%2C%7B%22Name%22%3A%22Sound%20quality%22%2C%22Value%22%3A%22Excellent%22%7D%2C%7B%22Name%22%3A%22Brand%20reputation%22%2C%22Value%22%3A%22Renowned%22%7D%2C%7B%22Name%22%3A%22Design%22%2C%22Value%22%3A%22Elegant%20and%20luxurious%22%7D%2C%7B%22Name%22%3A%22Key%20action%22%2C%22Value%22%3A%22Superb%22%7D%5D%7D%2C%7B%22Name%22%3A%22Baldwin%22%2C%22Description%22%3A%22American%20manufacturer%20known%20for%20quality%20and%20affordability.%22%2C%22Categories%22%3A%5B%7B%22Name%22%3A%22Price%22%2C%22Value%22%3A%22Moderate%22%7D%2C%7B%22Name%22%3A%22Sound%20quality%22%2C%22Value%22%3A%22Good%22%7D%2C%7B%22Name%22%3A%22Brand%20reputation%22%2C%22Value%22%3A%22Distinguished%22%7D%2C%7B%22Name%22%3A%22Design%22%2C%22Value%22%3A%22Traditional%20and%20classic%22%7D%2C%7B%22Name%22%3A%22Key%20action%22%2C%22Value%22%3A%22Very%20good%22%7D%5D%7D%5D%7D",
    )
    cy.visit("http://localhost:3000/dashboard/phase3")
    cy.wait(8000)

    cy.get("table").should("exist")
    cy.contains(
      "Handcrafted pianos with a focus on quality and tradition.",
    ).click()
    cy.contains(
      "Japanese manufacturer known for innovation, reliability, and versatility.",
    ).click()
    cy.contains(
      "German manufacturer known for craftsmanship and rich, powerful sound.",
    ).click()

    cy.get("button").contains("Compare").click()

    cy.get("h2").contains("Steinway & Sons")
    cy.get("h2").contains("Yamaha")
    cy.get("h2").contains("Bechstein")
  })
})
