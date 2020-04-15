import React from "react";
import { render } from "@testing-library/react";

import Note from "./note";
import { INote } from "models";

jest.mock("uuid/v4", () => () => "test-id");

const mockNote: INote = {
  id: "test-id",
  yPosition: 100,
  xPosition: 100,
  text: "Hello World",
};

describe("<Note />", () => {
  it("matches snapshots", () => {
    const { container } = render(
      <Note note={mockNote} onEditNote={jest.fn()} onDeleteNote={jest.fn()} />
    );
    expect(container).toMatchSnapshot();
  });
});
