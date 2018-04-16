function keyDownEvent(e) {
  let isKeyNum = ((e.keyCode < 96 && e.keyCode >= 65) || (e.keyCode !== 190 && e.keyCode > 105 && e.keyCode !== 110));
  // 只能有一个小数点
  let isDot = (e.key === '.') && /[.]/g.test(e.target.value);

  // 支持删除键
  let keyPass = !(/Backspace/.test(e.key));

  // 支持ctrl(cmd)组合键
  let noCtrl = e.ctrlKey || e.metaKey;
  if (((isKeyNum && keyPass) || isDot) && !noCtrl) {
    e.preventDefault();
  }
}

function setCaretPosition(elem, endPos) { // 设置光标位置函数
  if (elem.createTextRange) {
    let range = elem.createTextRange();

    range.move('character', endPos);
    range.select();
  } else {
    elem.setSelectionRange(endPos, endPos);
  }
}

function dealVal(el, decimal) {
  let oldVal = el.value;
  let pos = el.selectionEnd;
  let result = el.value;

  result = result.replace(/[^0123456789.]/g, '').replace(/^0+/g, 0).replace(/^0(\d+)/g, '$1');
  if (decimal && /[.]/.test(el.value)) {
    let strAry = result.split('.');
    if (strAry[1].length > decimal) {
      result = [strAry[0], strAry[1].substr(0, decimal)].join('.');
    }
  }
  if (decimal === 0 && /[.]/.test(el.value)) {
    result = result.split('.')[0];
  }

  el.value = result;
  if (oldVal.length !== pos && el === document.activeElement) {
    setCaretPosition(el, pos);
  }
  return result;
}

export {dealVal, keyDownEvent};
