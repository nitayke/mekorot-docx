import "./App.css";
import Form from "./Form";
import { useState } from "react";
import * as Docx from "../DafMaker/designDoc";

export default function App() {
  const [mekorot, setMekorot] = useState([]);

  function onSubmit({ content, title }) {
    setMekorot((prev) => [...prev, { content, title }]);
  }

  return (
    <>
      <h3>יצירת מראי מקומות נכונים לבקשה:</h3>
      <p>
        סימני פסוק אינם אמורים לעורר בעיות: רווח, פסיק, נקודה או נקודתיים ברפרנס
        יהיו בסדר. למקף (-) יש משמעות מיוחדת: הוא מסמן טווח. כל מקף מיותר עלול
        להכשיל את הזיהוי. המחולל מסוגל לזהות כמה סוגי ניסוח נפוצים לאותו מקור.
        לדוגמה, את מלכים ב הוא יזהה עבור הכותרות: מלכים ב׳, ו-מל"ב. העיקרון
        הכללי הוא לציין מראה מקום מלא בלי לכלול שום דבר אחר. המחולל פועל גם ברמת
        הפרק או הפסוק ומזהה גם טווח מוגדר של פסוקים. על כן אפשרויות אלה תקינות:
      </p>
      <p>
        מלכים ב' א | מל"ב א:ה | מל"ב א ה | מל"ב א-ד | מל"ב ב:ג-ו | מל"ב ב:ג-ג:ג
        | מל"ב ב, ג | מל"ב פרק ב פסוק ג | שבת ז: | שבת דף ז עמוד ב | רי"ף שבת ז:
      </p>
      <h3>מקורות שהוספת עד כה:</h3>
      {mekorot.map(({ title }) => (
        <p key={title}>{title}</p>
      ))}
      <Form onSubmit={onSubmit} />
      <button onClick={() => Docx.createSimpleDaf(mekorot)}>
        הורד דף - עיצוב 1
      </button>
      <button onClick={() => Docx.createTextBoxesDaf(mekorot)}>
        הורד דף - עיצוב 2
      </button>
      <button onClick={() => Docx.createSimpleDaf(Docx.generateMekorotList())}>
        הורד דף לדוגמה - עיצוב 1
      </button>
      <button
        onClick={() => Docx.createTextBoxesDaf(Docx.generateMekorotList())}
      >
        הורד דף לדוגמה - עיצוב 2
      </button>
    </>
  );
}
