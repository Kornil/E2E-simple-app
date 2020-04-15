import React from "react";
import { render } from "@testing-library/react";

import Annotations from "./annotations";

jest.mock("uuid/v4", () => () => "test-id");

describe("<Annotations />", () => {
  it("matches snapshots", () => {
    const { container } = render(<Annotations />);
    expect(container).toMatchSnapshot();
  });
});
