import {
  PAGE_WIDTH,
  CHARS_IN_LINE,
  LINE_HEIGHT,
  SINGLE_TEXTBOX_WIDTH,
  MAX_RATIO,
} from "./constants";

function concatenateMekorotLength(firstLength, secondLength) {
  return (firstLength + secondLength) * 1.1;
}

function calculateTwoBoxesWidth(ratio) {
  let leftWidth = (ratio / (ratio + 1)) * PAGE_WIDTH;
  return { left: leftWidth, right: PAGE_WIDTH - leftWidth };
}

function calculateTextBoxHeight(textLength) {
  let lines_count = Math.floor(textLength / CHARS_IN_LINE) + 2;
  return lines_count * LINE_HEIGHT;
}

function addSingleBoxDimensions(makor) {
  makor.height = calculateTextBoxHeight(makor.content.length);
  makor.width = SINGLE_TEXTBOX_WIDTH;
}

function isRatioValid(ratio) {
  return ratio < MAX_RATIO && ratio > 1 / MAX_RATIO;
}

function calculateTextBoxesDimensions(mekorot) {
  for (let i = 0; i < mekorot.length; i++) {
    if (i === mekorot.length - 1) {
      addSingleBoxDimensions(mekorot[i]);
      break;
    }
    const firstLength = mekorot[i].content.length;
    const secondLength = mekorot[i + 1].content.length;
    const ratio = firstLength / secondLength;
    if (isRatioValid(ratio)) {
      const { left, right } = calculateTwoBoxesWidth(ratio);
      mekorot[i].width = left;
      mekorot[i + 1].width = right;
      mekorot[i].height = mekorot[i + 1].height = calculateTextBoxHeight(
        concatenateMekorotLength(firstLength, secondLength)
      );
      i++;
    } else {
      addSingleBoxDimensions(mekorot[i]);
    }
  }
}

export { calculateTextBoxesDimensions };
