import React from "react";
import styled from "@emotion/styled";

import { INote } from "../models";

interface INoteProps {
  top: number;
  left: number;
}

const NOTE_SIZE = 24;
const NOTE_SIZE_HALF = NOTE_SIZE / 2;

const NoteButton = styled.button<INoteProps>`
  cursor: pointer;
  position: absolute;
  top: ${(props) => `calc(${props.top}px - ${NOTE_SIZE_HALF}px) `};
  left: ${(props) => `calc(${props.left}px - ${NOTE_SIZE_HALF}px) `};
  height: ${NOTE_SIZE}px;
  width: ${NOTE_SIZE}px;
  background-color: rgb(255, 156, 102);
  border: none;
  border-radius: 4px;

  :hover {
    z-index: 1;
  }
`;

const NoteText = styled.div<INoteProps>`
  position: absolute;
  top: ${(props) => `calc(${props.top}px - ${NOTE_SIZE_HALF}px) `};
  left: ${(props) => `calc(${props.left}px + ${NOTE_SIZE}px) `};
  border: none;
  border-radius: 4px;
  background-color: rgb(246, 246, 246);
  color: rgb(148, 148, 148);
  padding: 8px 16px;
  z-index: 2;

  input {
    border: none;
    color: rgb(148, 148, 148);
  }
`;

interface IProps {
  note: INote;
  onDeleteNote: (id: INote["id"]) => void;
  onEditNote: (id: INote["id"], text: string) => void;
}

const Note: React.FC<IProps> = ({ note, onDeleteNote, onEditNote }) => {
  const [show, setShow] = React.useState<boolean>(false);
  const [edit, setEdit] = React.useState<boolean>(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleLeftClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    event.stopPropagation();
    setShow(true);
    setEdit(true);
    if (edit && inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleRightClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    onDeleteNote(note.id);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onEditNote(note.id, event.target.value);
  };

  React.useEffect(() => {
    if (edit && inputRef.current) {
      inputRef.current.focus();
    }
  }, [edit]);

  return (
    <>
      <NoteButton
        onClick={handleLeftClick}
        onContextMenu={handleRightClick}
        top={note.yPosition}
        left={note.xPosition}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => {
          setShow(false);
          setEdit(false);
        }}
      />
      {show &&
        (edit ? (
          <NoteText top={note.yPosition} left={note.xPosition}>
            <input
              ref={inputRef}
              type="text"
              value={note.text}
              onChange={handleChange}
              onKeyDown={(e) => e.keyCode == 13 && setEdit(false)}
            />
          </NoteText>
        ) : (
          <NoteText top={note.yPosition} left={note.xPosition}>
            {note.text || "Click to Edit"}
          </NoteText>
        ))}
    </>
  );
};

export default Note;
