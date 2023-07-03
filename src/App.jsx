import "./App.css";
import Form from "./Form";
import { useState } from "react";
import * as Docx from "./Docx";

export default function App() {
  const [mekorot, setMekorot] = useState([]);
  const [mekorotNames, setMekorotNames] = useState([]);
  return (
    <>
      <Form setMekorot={setMekorot} setMekorotNames={setMekorotNames} />
      <button onClick={() => Docx.createDaf(mekorot, mekorotNames, 1)}>
        הורד דף - עיצוב 1
      </button>
      <button onClick={() => Docx.createDaf(mekorot, mekorotNames, 2)}>
        הורד דף - עיצוב 2
      </button>
      <button
        onClick={() =>
          Docx.createDaf(
            Docx.generateMekorotList(),
            Array(Docx.MEKOROT_COUNT).fill("כותרת לדוגמה"),
            1
          )
        }
      >
        הורד דף לדוגמה - עיצוב 1
      </button>
      <button
        onClick={() =>
          Docx.createDaf(
            Docx.generateMekorotList(),
            Array(Docx.MEKOROT_COUNT).fill("כותרת לדוגמה"),
            2
          )
        }
      >
        הורד דף לדוגמה - עיצוב 2
      </button>
    </>
  );
}
