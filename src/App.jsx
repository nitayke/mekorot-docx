import {
  Packer,
  Document,
  Paragraph,
  TextRun,
  FrameAnchorType,
  AlignmentType,
  BorderStyle,
  ColumnBreak,
} from "docx";
import { saveAs } from "file-saver";
import "./App.css";

const BORDER = {
  color: "auto",
  space: 1,
  style: BorderStyle.SINGLE,
  size: 5,
};

const BORDERS = {
  top: BORDER,
  bottom: BORDER,
  right: BORDER,
  left: BORDER,
};

const MARGIN = 300;
const WIDTH_SUM = 11050;
const FONT = "David";
const CHARS_IN_LINE = 128;
const LINE_HEIGHT = 230;
const VERTICAL_SPACE = 150;
const HORIZONTAL_SPACE = 250;
const MAX_RATIO = 2.5; // If the ratio between 2 mekorot is below 2.5, I put them side-by-side
const MEKOROT_COUNT = 8;
const EXAMPLE_MAKOR = `אבל בפני ע"א לא אמרינן דאיתרע שטרא. ואינו דומה לנסכא דר"א דשם הוי מחויב שבועה דאורייתא ואיל"מ מה שאין כן זה שאין לו אלא שבועת המשנה בע"א שהוא פרוע לכן ל"א בי' מתוך כ"כ בעל התרומות בשם הרמב"ן שהשיב לו כך. והנה ראיתי כל הגדולים וחשובים יוצאים לקראת משה רבינו והקשו דברי הרמב"ן אהדדי דכאן דעתו דבע"א לא אתרע שטרא ולא אמרינן בי' מתוך ובפרק חזקת הבתים דף ל"ד גבי נסכא דר"א כתב להדיא דאבימי קודם שנתקנה שבועת היסת דכיון דאי הוי מכחיש לשליח הי' צריך לישבע להכחיש את השליח לא הוי מגו ואתרע שטרא וכ"כ תוספות בעובדא דאבימי בפ' הכותב והנה בש"ך כתב עצה נכונה ליישב והוא דהתוספות והרמב"ן מיירי בתר פרעון דאם פקח הוא מייתי לידי שבועה דאורייתא ובתר פרעון כיון דהוי לי' ש"ד הוי לי' מחויב שואיל"מ ועיין שם דמותיב אנפשי' מאי הקשו מעובד' דאבימי דילמא מיירי עובדא דאבימי קודם פרעון ועיין שם אלא דסתימת דברי הרמ"א משמע דלעולם לא איתרע שטרא בפני ע"א דאם לא כן ה"ל לפרש דבתר פרעון צריך לחזור משום דהוי לי' מתוך שאינו יכול לישבע משלם ועוד דאם כן הפוכי מטרתי למה כיון דבתר פרעון יצטרך להחזיר למה יפרע. ולכן נראה דבתר פרעון לא שייך דין מתוך כיון דלדעת הרמ"א אפילו בשני עדים מעידים על הפרעון בסתם דאינו יכול לטעון סטראי אבל אי תפס לא מפקינן מיני' ואם כן ודאי בתר פרעון לא שייך דין מתוך שיצטרך לחזור המעות דהא אפילו שני עדים מעידים על פרעון סתם יכול לומר סטראי ואין צריך המגו כלל רק להוציא אבל להחזיק מה שתפוס ועומד סטראי מחמת עצמה טענה אפילו בשני עדים וז"ב. ואפילו לדעת השלחן ערוך דל"מ תפיסה לטענת סטראי היכא דאי' שני' על הפרעון סתם היינו משום דהאי שטרא איתרע לגמרי ואינו נאמן לתפוס על חוב שבשטר דכבר איתרע אבל תביעת ממון ודאי ליכא דהא מבואר בשלחן ערוך סימן ע"ט אמר לו מנה הלויתיך בפני פ' ופ' וכו' אבל טען אמת שקבלתי מנה אבל בפרעון חובי נאמן והרי משמע להדיא דאין בזה משום תביעת ממון אלא הא דאיתרע שטרו ואינו נאמן בתפיס' היינו משום דהאי שטרא איתרע לגמרי וכנ"ל ואם כן גבי אי פקת הוא דמייתי לידי ש"ד היינו דמוקים לי' לקמאי בהלואה דע"א אינו נאמן לארועי שטרא וכמ"ש בש"ך סימן עיין דאינו אלא משום פלגינן דיבורי' ואמרינן דמוקי' לה בהלואה. וכיון דהעיד בסתמא ל"מ דעל מנה סתם מצי אמר לפרעון חובו. ואם כן בתר פרעון אפילו לדעת ש"ע לא אמרינן משואיל"מ וכן מוכח מתשובת הרא"ש כלל פ"ו דאם על חוב שבשטר הוא בא בהרשאה ועל הממון שהודה שקיבל הוא בא מכח עצמו דאי בעי ון ודו"ק:`;

function generateMekorotList() {
  let mekorot = [];
  for (let i = 0; i < MEKOROT_COUNT; i++) {
    let start = randomInt(EXAMPLE_MAKOR.length);
    let end = start + randomInt(EXAMPLE_MAKOR.length - start);
    let currentString = EXAMPLE_MAKOR.slice(start, end);
    mekorot.push(currentString);
  }
  return mekorot;
}

function randomInt(max) {
  return Math.floor(Math.random() * max);
}

function newTextBox(x, y, w, h, text) {
  return new Paragraph({
    bidirectional: true,
    alignment: AlignmentType.BOTH,
    frame: {
      position: {
        x: x,
        y: y,
      },
      width: w,
      height: h,
      anchor: {
        horizontal: FrameAnchorType.TEXT,
        vertical: FrameAnchorType.TEXT,
      },
    },
    border: BORDERS,
    children: [
      new TextRun({
        text: "כותרת",
        font: FONT,
        bold: true,
        size: 22,
        rightToLeft: true,
      }),
      new ColumnBreak(),
      new TextRun({
        break: 1,
        text: text,
        font: FONT,
        size: 22,
        rightToLeft: true,
      }),
    ],
  });
}

function locateSideBySide(textBoxes, ratio, first, second, currPosition) {
  let width = (ratio / (ratio + 1)) * WIDTH_SUM;
  let chars_in_curr_line = [
    (width / WIDTH_SUM) * CHARS_IN_LINE - HORIZONTAL_SPACE / 100,
    ((WIDTH_SUM - width) / WIDTH_SUM) * CHARS_IN_LINE - HORIZONTAL_SPACE / 100,
  ];
  let lines_count =
    Math.max(
      Math.floor(first.length / chars_in_curr_line[0]),
      Math.floor(second.length / chars_in_curr_line[1])
    ) + 2;
  let height = lines_count * LINE_HEIGHT;
  textBoxes.push(newTextBox(0, currPosition, width, height, first));
  textBoxes.push(
    newTextBox(
      width + HORIZONTAL_SPACE,
      currPosition,
      WIDTH_SUM - width,
      height,
      second
    )
  );
  return height;
}

function locateSingle(textBoxes, makor, currPosition) {
  let lines_count = Math.floor(makor.length / CHARS_IN_LINE) + 2.5;
  let height = lines_count * LINE_HEIGHT;
  textBoxes.push(
    newTextBox(0, currPosition, WIDTH_SUM + HORIZONTAL_SPACE, height, makor)
  );
  return height;
}

function generate() {
  let currentPosition = 0;
  let mekorot = generateMekorotList();
  let textBoxes = [];
  let height;
  for (let i = 0; i < mekorot.length; i++) {
    if (i === mekorot.length - 1) {
      locateSingle(textBoxes, mekorot[i], currentPosition);
      break;
    }
    let ratio = mekorot[i].length / mekorot[i + 1].length;
    if (ratio < MAX_RATIO && ratio > 1 / MAX_RATIO) {
      height = locateSideBySide(
        textBoxes,
        ratio,
        mekorot[i],
        mekorot[i + 1],
        currentPosition
      );
      i++;
    } else {
      height = locateSingle(textBoxes, mekorot[i], currentPosition);
    }
    currentPosition += height + VERTICAL_SPACE;
  }

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
        children: textBoxes,
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, "דף מקורות.docx");
  });
}

export default function App() {
  return <button onClick={generate}>קבל</button>;
}
