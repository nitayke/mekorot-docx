import {
  Packer,
  Document,
  Paragraph,
  TextRun,
  FrameAnchorType,
  AlignmentType,
  OnOffElement,
} from "docx";
import { saveAs } from "file-saver";
import { calculateTextBoxesDimensions } from "./calculateTextBoxes";
import {
  EXAMPLE_MAKOR,
  FONT,
  FONT_SIZE,
  HORIZONTAL_SPACE,
  MEKOROT_COUNT,
  PAGE_SIZE,
  SIMPLE_MARGIN,
  SINGLE_TEXTBOX_WIDTH,
  TEXT_BOXES_MARGIN,
  VERTICAL_SPACE,
  BORDERS,
} from "./constants";

let currentPosition = 0;

function getMargins(margin) {
  return { top: margin, bottom: margin, right: margin, left: margin };
}

function generateMekorotList() {
  let mekorot = [];
  const makor = EXAMPLE_MAKOR.repeat(3);
  for (let i = 0; i < MEKOROT_COUNT; i++) {
    let start = randomInt(makor.length);
    let end = start + randomInt(makor.length - start);
    let currentString = makor.slice(start, end);
    mekorot.push({ title: "כותרת לדוגמה", content: currentString });
  }
  return mekorot;
}

function randomInt(max) {
  return Math.floor(Math.random() * max);
}

function getContentTextRun(text) {
  return new TextRun({
    text,
    font: FONT,
    size: FONT_SIZE,
    rightToLeft: true,
  });
}

function getTitleTextRun(text) {
  return new TextRun({
    text,
    font: FONT,
    size: FONT_SIZE + 4,
    rightToLeft: true,
    bold: true,
  });
}

function newTextBox(horizontalPosition, makor) {
  const { content, title, height, width } = makor;
  let pageBreak =
    currentPosition + height > PAGE_SIZE["height"] - TEXT_BOXES_MARGIN;
  if (pageBreak) currentPosition = 0;
  return new Paragraph({
    bidirectional: true,
    alignment: AlignmentType.BOTH,
    frame: {
      position: {
        x: horizontalPosition,
        y: currentPosition,
      },
      width,
      height,
      anchor: {
        horizontal: FrameAnchorType.TEXT,
        vertical: FrameAnchorType.TEXT,
      },
    },
    border: BORDERS,
    children: [getTitleTextRun(title + ": "), getContentTextRun(content)],
    pageBreakBefore: pageBreak,
  });
}

function getSideBySideTextBoxes(first, second) {
  return [
    newTextBox(0, first),
    newTextBox(first.width + HORIZONTAL_SPACE, second),
  ];
}

function getSingleTextBox(makor) {
  return newTextBox(0, makor);
}

function textBoxesDesign(mekorot) {
  currentPosition = 0;
  let textBoxes = [];
  for (let i = 0; i < mekorot.length; i++) {
    const { height, width } = mekorot[i];
    if (width === SINGLE_TEXTBOX_WIDTH) {
      textBoxes.push(getSingleTextBox(mekorot[i]));
    } else {
      textBoxes.push(...getSideBySideTextBoxes(mekorot[i], mekorot[i + 1]));
      i++;
    }
    currentPosition += height + VERTICAL_SPACE;
  }

  return new Document({
    sections: [
      {
        properties: {
          page: {
            margin: getMargins(TEXT_BOXES_MARGIN),
            size: PAGE_SIZE,
          },
        },
        children: textBoxes,
      },
    ],
  });
}

function simpleDesign(mekorot) {
  let paragraphs = [];
  for (let i = 0; i < mekorot.length; i++) {
    paragraphs.push(
      new Paragraph({
        bidirectional: true,
        children: [getTitleTextRun(mekorot[i].title)],
      })
    );
    paragraphs.push(
      new Paragraph({
        bidirectional: true,
        alignment: AlignmentType.BOTH,
        children: [getContentTextRun(mekorot[i].content)],
      })
    );
  }
  let doc = new Document({
    sections: [
      {
        properties: {
          column: { count: 2 },
          page: {
            margin: getMargins(SIMPLE_MARGIN),
            size: PAGE_SIZE,
          },
        },
        children: paragraphs,
      },
    ],
  });
  // RTL
  doc.documentWrapper.document.body.sections[0].root.push(
    new OnOffElement("w:bidi", true)
  );
  return doc;
}

function saveFile(doc, name) {
  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, name + ".docx");
  });
}

function createSimpleDaf(mekorot) {
  let doc = simpleDesign(mekorot);
  saveFile(doc, "סגנון 1");
}

function createTextBoxesDaf(mekorot) {
  calculateTextBoxesDimensions(mekorot);
  let doc = textBoxesDesign(mekorot);
  saveFile(doc, "סגנון 2");
  return doc;
}

export { createSimpleDaf, createTextBoxesDaf, generateMekorotList };
