export const MEKOROT_COUNT = 50;
export const SIMPLE_MARGIN = 600;
export const TEXT_BOXES_MARGIN = 300;
export const PAGE_SIZE = { height: 16838, width: 11906 }; // SIZE OF A4
export const FONT = "David";
export const FONT_SIZE = 22;
export const CHARS_IN_LINE = PAGE_SIZE["width"] / (4.3 * FONT_SIZE);
export const LINE_HEIGHT = 10 * FONT_SIZE;
export const VERTICAL_SPACE = 150;
export const HORIZONTAL_SPACE = 250;
export const EXAMPLE_MAKOR = `אבל בפני ע"א לא אמרינן דאיתרע שטרא. ואינו דומה לנסכא דר"א דשם הוי מחויב שבועה דאורייתא ואיל"מ מה שאין כן זה שאין לו אלא שבועת המשנה בע"א שהוא פרוע לכן ל"א בי' מתוך כ"כ בעל התרומות בשם הרמב"ן שהשיב לו כך. והנה ראיתי כל הגדולים וחשובים יוצאים לקראת משה רבינו והקשו דברי הרמב"ן אהדדי דכאן דעתו דבע"א לא אתרע שטרא ולא אמרינן בי' מתוך ובפרק חזקת הבתים דף ל"ד גבי נסכא דר"א כתב להדיא דאבימי קודם שנתקנה שבועת היסת דכיון דאי הוי מכחיש לשליח הי' צריך לישבע להכחיש את השליח לא הוי מגו ואתרע שטרא וכ"כ תוספות בעובדא דאבימי בפ' הכותב והנה בש"ך כתב עצה נכונה ליישב והוא דהתוספות והרמב"ן מיירי בתר פרעון דאם פקח הוא מייתי לידי שבועה דאורייתא ובתר פרעון כיון דהוי לי' ש"ד הוי לי' מחויב שואיל"מ ועיין שם דמותיב אנפשי' מאי הקשו מעובד' דאבימי דילמא מיירי עובדא דאבימי קודם פרעון ועיין שם אלא דסתימת דברי הרמ"א משמע דלעולם לא איתרע שטרא בפני ע"א דאם לא כן ה"ל לפרש דבתר פרעון צריך לחזור משום דהוי לי' מתוך שאינו יכול לישבע משלם ועוד דאם כן הפוכי מטרתי למה כיון דבתר פרעון יצטרך להחזיר למה יפרע. ולכן נראה דבתר פרעון לא שייך דין מתוך כיון דלדעת הרמ"א אפילו בשני עדים מעידים על הפרעון בסתם דאינו יכול לטעון סטראי אבל אי תפס לא מפקינן מיני' ואם כן ודאי בתר פרעון לא שייך דין מתוך שיצטרך לחזור המעות דהא אפילו שני עדים מעידים על פרעון סתם יכול לומר סטראי ואין צריך המגו כלל רק להוציא אבל להחזיק מה שתפוס ועומד סטראי מחמת עצמה טענה אפילו בשני עדים וז"ב. ואפילו לדעת השלחן ערוך דל"מ תפיסה לטענת סטראי היכא דאי' שני' על הפרעון סתם היינו משום דהאי שטרא איתרע לגמרי ואינו נאמן לתפוס על חוב שבשטר דכבר איתרע אבל תביעת ממון ודאי ליכא דהא מבואר בשלחן ערוך סימן ע"ט אמר לו מנה הלויתיך בפני פ' ופ' וכו' אבל טען אמת שקבלתי מנה אבל בפרעון חובי נאמן והרי משמע להדיא דאין בזה משום תביעת ממון אלא הא דאיתרע שטרו ואינו נאמן בתפיס' היינו משום דהאי שטרא איתרע לגמרי וכנ"ל ואם כן גבי אי פקת הוא דמייתי לידי ש"ד היינו דמוקים לי' לקמאי בהלואה דע"א אינו נאמן לארועי שטרא וכמ"ש בש"ך סימן עיין דאינו אלא משום פלגינן דיבורי' ואמרינן קיבל הוא בא מכח עצמו דאי בעי ון ודו"ק:`;
const BORDER_SIZE = 10;
export const PAGE_WIDTH =
  PAGE_SIZE["width"] - TEXT_BOXES_MARGIN * 2 - HORIZONTAL_SPACE; // not sure if this is the correct use in constants
export const MAX_RATIO = 2.5; // If the ratio between two mekorot is below this number, I put them side-by-side
export const SINGLE_TEXTBOX_WIDTH = PAGE_WIDTH + HORIZONTAL_SPACE;

const BORDER = {
  color: "auto",
  space: 1,
  style: "single",
  size: BORDER_SIZE,
};

export const BORDERS = {
  top: BORDER,
  bottom: BORDER,
  right: BORDER,
  left: BORDER,
};
