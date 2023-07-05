import { calculateTextBoxesDimensions } from "./calculateTextBoxes";
import { EXAMPLE_MAKOR } from "./constants";
import { createTextBoxesDaf } from "./designDoc";
import { writeFileSync } from "fs";
import { Packer } from "docx";

function calculateAndsaveFile(mekorot) {
  const doc = createTextBoxesDaf(mekorot);
  Packer.toBuffer(doc).then((buffer) => {
    writeFileSync("../../../Downloads/דף מקורות.docx", buffer);
  });
}

describe("ratio validation", () => {
  it("should validate ratio", () => {
    const result = calculateTextBoxesDimensions([]);
    expect(result).toBe(undefined);
  });

  it("some", () => {
    // Arrange
    const mekorot = [
      {
        content: EXAMPLE_MAKOR,
        title: "test",
      },
    ];

    // Act
    calculateTextBoxesDimensions(mekorot);

    // Assert
    expect(mekorot[0].height).toBe(3960);
  });

  it("two textboxes", () => {
    // Arrange
    const mekorot = [
      {
        content: EXAMPLE_MAKOR,
        title: "test",
      },
      {
        content: EXAMPLE_MAKOR,
        title: "test",
      },
    ];

    // Act
    calculateAndsaveFile(mekorot);

    // Assert
    expect(mekorot[0].height).toBe(3960);
  });
});
