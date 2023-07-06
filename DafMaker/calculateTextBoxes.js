import {
  PAGE_WIDTH,
  CHARS_IN_LINE,
  LINE_HEIGHT,
  SINGLE_TEXTBOX_WIDTH,
  MAX_RATIO,
} from "./constants";

function concatenateMekorotLength(firstLength, secondLength) {
  return (firstLength + secondLength) * 1.05;
}

function calculateTwoBoxesWidth(ratio) {
  let leftWidth = (ratio / (ratio + 1)) * PAGE_WIDTH;
  return { left: leftWidth, right: PAGE_WIDTH - leftWidth };
}

function calculateTextBoxHeight(textLength) {
  let lines_count = Math.ceil(textLength / CHARS_IN_LINE) + 1;
  return lines_count * LINE_HEIGHT;
}

function addSingleBoxDimensions(makor) {
  makor.height = calculateTextBoxHeight(makor.content.length);
  makor.width = SINGLE_TEXTBOX_WIDTH;
}

function addSideBySideDimensions(first, second) {
  const firstLength = first.content.length;
  const secondLength = second.content.length;
  const { left, right } = calculateTwoBoxesWidth(firstLength / secondLength);
  first.width = left;
  second.width = right;
  first.height = second.height = calculateTextBoxHeight(
    concatenateMekorotLength(firstLength, secondLength)
  );
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
    if (
      isRatioValid(mekorot[i].content.length / mekorot[i + 1].content.length)
    ) {
      addSideBySideDimensions(mekorot[i], mekorot[i + 1]);
      i++;
    } else {
      addSingleBoxDimensions(mekorot[i]);
    }
  }
}

export { calculateTextBoxesDimensions };
