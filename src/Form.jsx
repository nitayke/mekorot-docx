import { useState } from "react";

// MAKE IT SELECTABLE?
function getCleanText(text) {
  text = text.replace(/[\u05BE]/g, " "); // TURNS "־" TO " "
  text = text.replace(/<\/?[^>]+(>|$)/g, ""); // HTML TAGS
  text = text.replace(/{.*?}/g, ""); // "{פ}"
  text = text.replace(/\s*\(.*?\)\s*/g, ": "); // "(הפניה)"
  return text.replace(/[\x21-\x7e|\u0591-\u05C4|\u2010-\u2015]/gu, "");
}

export default function Form({ setMekorot, setMekorotNames }) {
  const [source, setSource] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [mekorotList, setMekorotList] = useState([]);

  async function fetchData() {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://www.sefaria.org/api/texts/${source}?context=0&pad=0`
      );
      const data = await response.json();
      setIsLoading(false);
      setError("");
      setMekorotList((prev) => [...prev, source]);
      setMekorotNames((prev) => [...prev, source]);
      let text = data["he"];
      if (Array.isArray(data["he"])) text = data["he"].join("\n");
      setMekorot((prev) => [...prev, getCleanText(text)]);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  }

  function submit(e) {
    e.preventDefault();
    fetchData();
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
      {mekorotList.map((makor) => (
        <p key={makor}>{makor}</p>
      ))}
      <form onSubmit={submit}>
        <div>
          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="הזן מקור..."
          />
        </div>
        <button type="submit">{isLoading ? "טוען..." : "הוסף"}</button>
      </form>

      {error && <p>חלה תקלה: {error.message}</p>}
    </>
  );
}
