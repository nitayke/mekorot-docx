import {
  Packer,
  Document,
  Paragraph,
  TextRun,
  FrameAnchorType,
  HorizontalPositionAlign,
  VerticalPositionAlign,
  AlignmentType,
} from "docx";
import { saveAs } from "file-saver";
import "./App.css";

const BORDER = {
  color: "auto",
  space: 1,
  style: "single",
  size: 5,
};

const BORDERS = {
  top: BORDER,
  bottom: BORDER,
  right: BORDER,
  left: BORDER,
};

const MARGIN = 300;
const WIDTH_SUM = 11100;
const FONT = "Heebo";
let currentPosition = 0;

const WIDTH = 6000;
const HEIGHT = 2000;

function generate() {
  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: MARGIN,
              right: MARGIN,
              bottom: MARGIN,
              left: MARGIN,
            },
          },
        },
        children: [
          new Paragraph({
            alignment: AlignmentType.BOTH,
            frame: {
              position: {
                x: 0,
                y: 0,
              },
              width: WIDTH,
              height: HEIGHT,
              anchor: {
                horizontal: FrameAnchorType.TEXT,
                vertical: FrameAnchorType.TEXT,
              },
              // alignment: {
              //   x: HorizontalPositionAlign.LEFT,
              //   y: VerticalPositionAlign.TOP,
              // },
            },
            border: BORDERS,
            children: [
              new TextRun({
                text: "כותרת",
                bold: true,
                font: FONT,
              }),
              new TextRun({
                text: "שלום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולו",
                break: 1,
                font: FONT,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.BOTH,
            frame: {
              position: {
                x: WIDTH + MARGIN - 20,
                y: currentPosition,
              },
              width: WIDTH_SUM - WIDTH,
              height: HEIGHT,
              anchor: {
                horizontal: FrameAnchorType.TEXT,
                vertical: FrameAnchorType.TEXT,
              },
              // alignment: {
              //   x: HorizontalPositionAlign.RIGHT,
              //   y: VerticalPositionAlign.TOP,
              // },
            },
            border: BORDERS,
            children: [
              new TextRun({
                text: "שלום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולו",
                font: FONT,
              }),
            ],
          }),
        ],
      },
    ],
  });

  console.log(doc);

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, "example.docx");
  });
}

function App() {
  return <button onClick={generate}>הינה</button>;
}

export default App;
