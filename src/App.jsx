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

const BORDERS = {
  top: {
    color: "auto",
    space: 1,
    style: "single",
    size: 5,
  },
  bottom: {
    color: "auto",
    space: 1,
    style: "single",
    size: 5,
  },
  left: {
    color: "auto",
    space: 1,
    style: "single",
    size: 5,
  },
  right: {
    color: "auto",
    space: 1,
    style: "single",
    size: 5,
  },
};

function generate() {
  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 300,
              right: 300,
              bottom: 300,
              left: 300,
            },
          },
        },
        children: [
          new Paragraph({
            alignment: AlignmentType.BOTH,
            frame: {
              // position: {
              //   x: 6100,
              //   y: -1000,
              // },
              width: 4000,
              // height: 1000,
              anchor: {
                horizontal: FrameAnchorType.TEXT,
                vertical: FrameAnchorType.TEXT,
              },
              space: {
                horizontal: 2000,
                vertical: 2,
              },
              alignment: {
                x: HorizontalPositionAlign.RIGHT,
                y: VerticalPositionAlign.TOP,
              },
            },
            border: BORDERS,
            children: [
              new TextRun({
                text: "שלום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולום עולם",
                font: "Heebo",
              }),
            ],
          }),
        ],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, "example.docx");
  });
}

function App() {
  return <button onClick={generate}>הינה</button>;
}

export default App;
