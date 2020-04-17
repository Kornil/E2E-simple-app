it("successfully loads", () => {
  cy.visit("/");
});

it("click generates a note in the defined position", () => {
  // First, we check that our base div is indeed empty,
  // no note elements are present in the page
  cy.get("#app > div").children().should("have.length", 0);

  // Cypress provides a very intuitive api for mouse actions
  const pos = 100;
  cy.get("#app > div").click({ x: pos, y: pos });

  // now that we have clicked the div
  // we can check that a note appeared on top of our div
  cy.get("#app > div").children().should("have.length", 1);

  // Checking the position on the div of our new note
  cy.get("#app > div button")
    .should("have.css", "top")
    // we detract half the size of the button on note.tsx
    // 100 - 12 padding = 88
    .and("match", /88/);

  cy.get("#app > div button")
    .should("have.css", "left")
    // we detract half the size of the button on note.tsx
    // 100 - 12 padding = 88
    .and("match", /88/);
});

it("left click on note edits the note content", () => {
  // We don't care for position of the click
  // as long as the click happens inside the note
  cy.get("#app > div button").click();

  // Typing does not happen instantly, but one key at a time
  cy.get("input").type("Hello World");
  // {enter} will tell cypress to hit the enter key
  // this will save our text and close the edit input
  cy.get("input").type("{enter}");

  // Check to make sure our note has been edited correctly
  cy.get("#app > div div").contains("Hello World");
});

it("right click on note deletes a note", () => {
  // defensive check to make sure our note is still there
  cy.get("#app > div").children("button").should("have.length", 1);

  // right click on the note button
  cy.get("#app > div button").rightclick();

  // Check to make sure the note disappeared
  cy.get("#app > div").children("button").should("have.length", 0);
});
