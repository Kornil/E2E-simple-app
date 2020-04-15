import React from "react";
import styled from "@emotion/styled";
import { v4 as uuidv4 } from "uuid";
import { Global, css } from "@emotion/core";

import { INote } from "../models";
import { Note } from ".";

// do your magic here 👇

const styles = css`
  @font-face {
    font-family: "Quicksand", sans-serif;
    /* stylelint-disable-next-line */
    src: url(https://fonts.gstatic.com/s/quicksand/v20/6xK-dSZaM9iE8KbpRA_LJ3z8mH9BOJvgkP8o58m-wi40.woff2)
      format("woff2");
  }
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #fff;
  position: relative;
  font-family: "Quicksand", sans-serif;
`;

const Annotations = () => {
  const [notes, setNotes] = React.useState<INote[]>([]);

  const handleSelection = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    const { pageX: xPosition, pageY: yPosition } = event;
    setNotes([
      ...notes,
      {
        id: uuidv4(),
        xPosition,
        yPosition,
        text: "",
      },
    ]);
  };

  const handleDeleteNote = (id: INote["id"]): void => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  const handleEditNote = (id: INote["id"], text: string): void => {
    const newNotes = notes.map((note) =>
      note.id === id ? { ...note, text } : note
    );
    setNotes(newNotes);
  };

  return (
    <Container onClick={handleSelection}>
      Click to add a note
      <br />
      Click on a note button to edit its content
      <br />
      Right click on a note button to delete it
      <Global styles={styles} />
      {notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          onDeleteNote={handleDeleteNote}
          onEditNote={handleEditNote}
        />
      ))}
    </Container>
  );
};

export default Annotations;
