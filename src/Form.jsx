import { useState } from "react";

export default function Form() {
  const [source, setSource] = useState("");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://www.sefaria.org/api/texts/${source}?context=0&pad=0&lang=he`
      );
      const data = await response.json();
      setData(data["he"]);
      setIsLoading(false);
      setError("");
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

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
      <form onSubmit={submit}>
        <div>
          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="הזן מקור..."
          />
        </div>
        <button type="submit">שלח</button>
      </form>

      {isLoading && <p>טוען...</p>}
      {error && <p>משהו השתבש: {error.message}</p>}
      {data && (
        <div>
          <pre>{data}</pre>
        </div>
      )}
    </>
  );
}
