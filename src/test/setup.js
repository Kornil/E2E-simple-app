import serializer from "jest-emotion";

expect.addSnapshotSerializer(serializer);

import "@testing-library/jest-dom/extend-expect";
