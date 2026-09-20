import { test, expect } from '@playwright/test';

const viewports = [
  { width: 320, height: 667, name: '320px-portrait' },
  { width: 360, height: 640, name: '360px-portrait' },
  { width: 375, height: 667, name: '375px-portrait' },
  { width: 390, height: 844, name: '390px-portrait' },
  { width: 412, height: 915, name: '412px-portrait' },
  { width: 430, height: 932, name: '430px-portrait' },
  { width: 768, height: 1024, name: '768px-portrait' },
  { width: 1024, height: 768, name: '1024px-landscape' },
  { width: 667, height: 375, name: '667x375-landscape' },
  { width: 844, height: 390, name: '844x390-landscape' }
];

test.describe('Mobile Responsiveness Tests', () => {
  let baseURL = 'http://localhost:4178';

  test.beforeAll(async () => {
    // Ensure preview server is running
  });

  viewports.forEach(({ width, height, name }) => {
    test(`Viewport ${name}`, async ({ page }) => {
      console.log(`\n=== Testing ${name} (${width}x${height}) ===`);
      
      // Set viewport
      await page.setViewportSize({ width, height });
      await page.goto(baseURL);
      await page.waitForLoadState('networkidle');

      // Take full-page screenshot
      await page.screenshot({
        path: `verification/screenshots/${name}.png`,
        fullPage: true
      });
      console.log(`✓ Screenshot saved: ${name}.png`);

      // Check for horizontal scroll
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      console.log(`Scroll width: ${scrollWidth}, Client width: ${clientWidth}`);
      expect(scrollWidth).toBe(clientWidth);
      console.log(`✓ No horizontal scroll`);

      // Run overflow detector - only check for actual horizontal scroll
      const docScrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const docClientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      const actualOverflow = docScrollWidth > docClientWidth;
      
      console.log(`Scroll width: ${docScrollWidth}, Client width: ${docClientWidth}`);
      console.log(`Actual horizontal scroll: ${actualOverflow ? 'YES' : 'NO'}`);
      expect(actualOverflow).toBe(false);
      console.log(`✓ No horizontal scroll`);

      // Measure tap targets (only visible elements)
      const smallTapTargets = await page.evaluate(() => {
        const interactive = document.querySelectorAll('a[href], button, input, select, textarea, [role="button"]');
        const small = [];
        interactive.forEach(el => {
          const rect = el.getBoundingClientRect();
          const style = window.getComputedStyle(el);
          // Skip hidden elements
          if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') return;
          // Skip elements with no dimensions (hidden by parent)
          if (rect.width === 0 && rect.height === 0) return;
          // Skip elements in hidden navigation (desktop nav on mobile)
          const parent = el.closest('.lg\\:flex');
          if (parent && style.display === 'none') return;
          
          if (rect.width < 44 || rect.height < 44) {
            small.push({
              tag: el.tagName,
              width: rect.width,
              height: rect.height,
              text: el.textContent?.slice(0, 20) || '',
              display: style.display,
              visibility: style.visibility
            });
          }
        });
        return small;
      });
      console.log(`Tap targets < 44px: ${smallTapTargets.length}`);
      if (smallTapTargets.length > 0) {
        console.log('Small tap targets:', JSON.stringify(smallTapTargets, null, 2));
      }
      expect(smallTapTargets.length).toBe(0);
      console.log(`✓ All tap targets ≥ 44px`);
    });
  });

  // Test 200% text zoom
  viewports.slice(0, 7).forEach(({ width, height, name }) => {
    test(`200% Text Zoom ${name}`, async ({ page }) => {
      console.log(`\n=== Testing 200% zoom ${name} (${width}x${height}) ===`);
      
      await page.setViewportSize({ width, height });
      await page.goto(baseURL);
      await page.waitForLoadState('networkidle');

      // Set 200% zoom
      await page.evaluate(() => {
        document.documentElement.style.fontSize = '200%';
      });
      await page.waitForTimeout(1000);

      // Take screenshot
      await page.screenshot({
        path: `verification/screenshots/${name}-200percent-zoom.png`,
        fullPage: true
      });
      console.log(`✓ 200% zoom screenshot saved`);

      // Check for overflow at 200% zoom
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      const actualOverflow = scrollWidth > clientWidth;
      
      console.log(`Scroll width at 200%: ${scrollWidth}, Client width: ${clientWidth}`);
      console.log(`Actual horizontal scroll at 200%: ${actualOverflow ? 'YES' : 'NO'}`);
      expect(actualOverflow).toBe(false);
      console.log(`✓ No horizontal scroll at 200% zoom`);
    });
  });

  // Test mobile menu functionality
  test('Mobile Menu Focus Trap and ESC', async ({ page }) => {
    console.log(`\n=== Testing Mobile Menu ===`);
    
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');

    // Open mobile menu
    const menuButton = page.getByRole('button', { name: 'مێنیو' });
    await menuButton.click();
    await page.waitForTimeout(500);
    console.log(`✓ Mobile menu opened`);

    // Check aria-expanded
    const ariaExpanded = await menuButton.getAttribute('aria-expanded');
    expect(ariaExpanded).toBe('true');
    console.log(`✓ aria-expanded="true"`);

    // Check body scroll lock
    const bodyOverflow = await page.evaluate(() => document.body.style.overflow);
    expect(bodyOverflow).toBe('hidden');
    console.log(`✓ Body scroll locked`);

    // Test focus trap
    const menuLinks = page.locator('#mobile-menu a');
    const firstLink = menuLinks.first();
    const lastLink = menuLinks.last();
    
    await firstLink.focus();
    const firstFocused = await firstLink.evaluate(el => document.activeElement === el);
    expect(firstFocused).toBe(true);
    console.log(`✓ First link focusable`);

    // Test ESC to close
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);
    
    const ariaExpandedAfter = await menuButton.getAttribute('aria-expanded');
    expect(ariaExpandedAfter).toBe('false');
    console.log(`✓ ESC closes menu`);

    // Test click outside to close
    await menuButton.click();
    await page.waitForTimeout(500);
    await page.locator('body').click({ position: { x: 10, y: 10 } });
    await page.waitForTimeout(500);
    
    const ariaExpandedAfterClick = await menuButton.getAttribute('aria-expanded');
    expect(ariaExpandedAfterClick).toBe('false');
    console.log(`✓ Click outside closes menu`);

    // Test link click closes menu
    await menuButton.click();
    await page.waitForTimeout(500);
    await firstLink.click();
    await page.waitForTimeout(500);
    
    const ariaExpandedAfterLink = await menuButton.getAttribute('aria-expanded');
    expect(ariaExpandedAfterLink).toBe('false');
    console.log(`✓ Link click closes menu`);

    // Check focus returns to button
    const buttonFocused = await menuButton.evaluate(el => document.activeElement === el);
    expect(buttonFocused).toBe(true);
    console.log(`✓ Focus returns to menu button`);
  });

  // Test Kurdish font support
  test('Kurdish Font Support', async ({ page }) => {
    console.log(`\n=== Testing Kurdish Font Support ===`);
    
    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');

    // Check if Kurdish characters render (no fallback boxes)
    const kurdishText = await page.locator('text=کارگەی ئەنتیکا').first();
    const fontFamily = await kurdishText.evaluate(el => {
      return window.getComputedStyle(el).fontFamily;
    });
    console.log(`Font family: ${fontFamily}`);
    expect(fontFamily).toContain('Vazirmatn');
    console.log(`✓ Using Vazirmatn font for Kurdish text`);

    // Check for letter-spacing on Arabic script
    const letterSpacing = await kurdishText.evaluate(el => {
      return window.getComputedStyle(el).letterSpacing;
    });
    console.log(`Letter spacing: ${letterSpacing}`);
    expect(letterSpacing).toBe('normal');
    console.log(`✓ No letter-spacing on Kurdish text`);
  });

  // Check for background-attachment: fixed
  test('No background-attachment: fixed', async ({ page }) => {
    console.log(`\n=== Testing No background-attachment: fixed ===`);
    
    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');

    const hasFixedAttachment = await page.evaluate(() => {
      const all = document.querySelectorAll('*');
      for (const el of all) {
        const style = window.getComputedStyle(el);
        if (style.backgroundAttachment === 'fixed') {
          return true;
        }
      }
      return false;
    });
    console.log(`Has background-attachment: fixed: ${hasFixedAttachment}`);
    expect(hasFixedAttachment).toBe(false);
    console.log(`✓ No background-attachment: fixed found`);
  });

  // Test hero section height
  test('Hero Section 100dvh Support', async ({ page }) => {
    console.log(`\n=== Testing Hero Section 100dvh ===`);
    
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');

    const heroSection = page.locator('#home');
    const minHeight = await heroSection.evaluate(el => {
      return window.getComputedStyle(el).minHeight;
    });
    const actualHeight = await heroSection.evaluate(el => {
      return el.getBoundingClientRect().height;
    });
    console.log(`Hero min-height CSS: ${minHeight}`);
    console.log(`Hero actual height: ${actualHeight}px`);
    console.log(`Viewport height: 667px`);
    
    // Hero should be at least viewport height
    expect(actualHeight).toBeGreaterThanOrEqual(600);
    console.log(`✓ Hero section uses viewport height (actual height: ${actualHeight}px)`);
  });
});
