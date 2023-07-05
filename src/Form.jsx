import { useState } from "react";

// MAKE IT SELECTABLE?
function getCleanText(text) {
  if (Array.isArray(text)) text = text.join(": ");
  text = text.replace(/[\u05BE]/g, " "); // TURNS "־" TO " "
  text = text.replace(/<\/?[^>]+(>|$)/g, ""); // HTML TAGS
  text = text.replace(/{.*?}/g, ""); // "{פ}"
  text = text.replace(/\s*\(.*?\)\s*/g, ": "); // "(הפניה)"
  return text.replace(
    /[\x21-\x39]|[\x3b-\x7e|\u0591-\u05C9|\u2010-\u2015]/gu,
    ""
  );
}

export default function Form({ onSubmit }) {
  const [source, setSource] = useState("");
  const { error, fetchData, isLoading } = useFetchData(source);

  async function submit(e) {
    e.preventDefault();
    const makor = await fetchData();
    if (typeof makor === "undefined") return;
    onSubmit(makor);
  }

  return (
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
      {error && <p>חלה תקלה: {error.message}</p>}
    </form>
  );
}

function useFetchData(source) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchData() {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://www.sefaria.org/api/texts/${source}?context=0&pad=0`
      );
      const data = await response.json();
      setIsLoading(false);
      setError("");
      return {
        content: getCleanText(data["he"]),
        title: source,
      };
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  }

  return { error, fetchData, isLoading };
}
