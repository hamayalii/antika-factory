// Verification script - paste in browser console to check mobile responsiveness

function verifyMobileResponsiveness() {
  console.log('=== MOBILE RESPONSIVENESS VERIFICATION ===\n');
  
  // 1. Check viewport meta tag
  const viewportMeta = document.querySelector('meta[name="viewport"]');
  console.log('1. Viewport Meta Tag:', viewportMeta ? viewportMeta.content : 'MISSING');
  console.log('   ✓ Has viewport-fit=cover:', viewportMeta?.content.includes('viewport-fit=cover'));
  
  // 2. Check RTL direction
  console.log('\n2. RTL Direction:');
  console.log('   HTML dir:', document.documentElement.dir);
  console.log('   HTML lang:', document.documentElement.lang);
  
  // 3. Check for horizontal scroll
  const hasHorizontalScroll = document.documentElement.scrollWidth > document.documentElement.clientWidth;
  console.log('\n3. Horizontal Scroll:');
  console.log('   Document width:', document.documentElement.scrollWidth);
  console.log('   Viewport width:', document.documentElement.clientWidth);
  console.log('   Has horizontal scroll:', hasHorizontalScroll ? '❌ FAIL' : '✓ PASS');
  
  // 4. Check overflow elements
  const offenders = [...document.querySelectorAll('*')].filter(e => {
    const rect = e.getBoundingClientRect();
    return rect.right > document.documentElement.clientWidth || rect.left < 0;
  });
  console.log('\n4. Overflow Elements:', offenders.length > 0 ? `❌ ${offenders.length} found` : '✓ PASS (0 found)');
  
  // 5. Check touch targets (minimum 44x44px)
  const buttons = document.querySelectorAll('button, a[href]');
  let smallTouchTargets = 0;
  buttons.forEach(btn => {
    const rect = btn.getBoundingClientRect();
    if (rect.width < 44 || rect.height < 44) {
      smallTouchTargets++;
    }
  });
  console.log('\n5. Touch Targets (< 44px):', smallTouchTargets > 0 ? `❌ ${smallTouchTargets} found` : '✓ PASS (all ≥ 44px)');
  
  // 6. Check input font sizes (should be ≥ 16px to prevent iOS zoom)
  const inputs = document.querySelectorAll('input, textarea');
  let smallInputs = 0;
  inputs.forEach(input => {
    const style = window.getComputedStyle(input);
    const fontSize = parseFloat(style.fontSize);
    if (fontSize < 16) {
      smallInputs++;
    }
  });
  console.log('\n6. Input Font Sizes (< 16px):', smallInputs > 0 ? `❌ ${smallInputs} found` : '✓ PASS (all ≥ 16px)');
  
  // 7. Check images have width/height attributes
  const images = document.querySelectorAll('img');
  let imagesWithoutDimensions = 0;
  images.forEach(img => {
    if (!img.width || !img.height) {
      imagesWithoutDimensions++;
    }
  });
  console.log('\n7. Images without width/height:', imagesWithoutDimensions > 0 ? `❌ ${imagesWithoutDimensions} found` : '✓ PASS (all have dimensions)');
  
  // 8. Check safe area support
  const header = document.querySelector('header');
  const headerStyle = header ? window.getComputedStyle(header) : null;
  console.log('\n8. Safe Area Support:');
  console.log('   Header has safe-area padding:', headerStyle?.paddingTop.includes('env') ? '✓ PASS' : '❌ FAIL');
  
  // 9. Check scroll margin on sections
  const sections = document.querySelectorAll('section[id]');
  let sectionsWithoutScrollMargin = 0;
  sections.forEach(section => {
    const style = window.getComputedStyle(section);
    if (!style.scrollMarginTop || style.scrollMarginTop === '0px') {
      sectionsWithoutScrollMargin++;
    }
  });
  console.log('\n9. Sections with scroll-margin-top:', sectionsWithoutScrollMargin > 0 ? `❌ ${sectionsWithoutScrollMargin} missing` : '✓ PASS (all have scroll margin)');
  
  // 10. Check theme color
  const themeColor = document.querySelector('meta[name="theme-color"]');
  console.log('\n10. Theme Color:', themeColor ? `✓ PASS (${themeColor.content})` : '❌ MISSING');
  
  console.log('\n=== VERIFICATION COMPLETE ===');
  return {
    viewport: !!viewportMeta?.content.includes('viewport-fit=cover'),
    rtl: document.documentElement.dir === 'rtl',
    noHorizontalScroll: !hasHorizontalScroll,
    noOverflow: offenders.length === 0,
    touchTargets: smallTouchTargets === 0,
    inputFontSize: smallInputs === 0,
    imageDimensions: imagesWithoutDimensions === 0,
    safeArea: headerStyle?.paddingTop.includes('env'),
    scrollMargin: sectionsWithoutScrollMargin === 0,
    themeColor: !!themeColor
  };
}

// Run verification
verifyMobileResponsiveness();
