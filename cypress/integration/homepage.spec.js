it("successfully loads", () => {
  cy.visit("/");
});

it("click generates a note in the defined position", () => {
  cy.get("#app > div").children().should("have.length", 0);

  const pos = 100;
  cy.get("#app > div").click({ x: pos, y: pos });

  cy.get("#app > div").children().should("have.length", 1);

  cy.get("#app > div button")
    .should("have.css", "top")
    // we detract half the size of the button on note.tsx
    // 100 - 12 = 88
    .and("match", /88/);

  cy.get("#app > div button")
    .should("have.css", "left")
    // we detract half the size of the button on note.tsx
    // 100 - 12 = 88
    .and("match", /88/);
});

it("left click on note edits the note content", () => {
  cy.get("#app > div button").click();

  cy.get("input").type("Hello World");
  cy.get("input").type("{enter}");

  cy.get("#app > div div").contains("Hello World");
});

it("right click on note deletes a note", () => {
  cy.get("#app > div").children("button").should("have.length", 1);

  cy.get("#app > div button").rightclick();

  cy.get("#app > div").children("button").should("have.length", 0);
});
