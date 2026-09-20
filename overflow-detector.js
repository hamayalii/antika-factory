// Overflow detector script - paste this in browser console
// Run this at different viewport sizes to detect overflow issues

function detectOverflow() {
  const offenders = [...document.querySelectorAll('*')].filter(e => {
    const rect = e.getBoundingClientRect();
    return rect.right > document.documentElement.clientWidth || rect.left < 0;
  });
  
  console.log(`Found ${offenders.length} elements causing overflow:`);
  offenders.forEach((el, i) => {
    const rect = el.getBoundingClientRect();
    const classes = el.className;
    const tag = el.tagName;
    console.log(`${i + 1}. ${tag}${classes ? '.' + classes : ''}`, {
      right: rect.right,
      viewportWidth: document.documentElement.clientWidth,
      overflow: rect.right - document.documentElement.clientWidth,
      left: rect.left
    });
  });
  
  return offenders;
}

// Also check for horizontal scroll on body
function checkHorizontalScroll() {
  const hasHorizontalScroll = document.documentElement.scrollWidth > document.documentElement.clientWidth;
  console.log('Horizontal scroll detected:', hasHorizontalScroll);
  console.log('Document width:', document.documentElement.scrollWidth);
  console.log('Viewport width:', document.documentElement.clientWidth);
  if (hasHorizontalScroll) {
    console.log('Overflow amount:', document.documentElement.scrollWidth - document.documentElement.clientWidth);
  }
  return hasHorizontalScroll;
}

// Run both
checkHorizontalScroll();
detectOverflow();
