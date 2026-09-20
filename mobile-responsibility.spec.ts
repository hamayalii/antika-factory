import { test, expect } from '@playwright/test';

test.describe('Mobile Responsiveness Tests', () => {
  let baseURL = 'http://localhost:4188';

  const viewports = [
    { width: 320, height: 667, name: '320px-portrait' },
    { width: 360, height: 640, name: '360px-portrait' },
    { width: 375, height: 667, name: '375px-portrait' },
    { width: 390, height: 844, name: '390px-portrait' },
    { width: 412, height: 915, name: '412px-portrait' },
    { width: 430, height: 932, name: '430px-portrait' },
    { width: 600, height: 800, name: '600px-portrait' },
    { width: 768, height: 1024, name: '768px-portrait' },
    { width: 820, height: 1180, name: '820px-portrait' },
    { width: 1024, height: 768, name: '1024px-landscape' },
  ];

  // Test 200% zoom in landscape
  test('200% Text Zoom in Landscape', async ({ page }) => {
    console.log(`\n=== Testing 200% zoom in landscape ===`);

    await page.setViewportSize({ width: 667, height: 375 });
    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');

    // Set 200% zoom
    await page.evaluate(() => {
      document.documentElement.style.fontSize = '200%';
    });
    await page.waitForTimeout(1000);

    // Check for overflow
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    const actualOverflow = scrollWidth > clientWidth;
    
    console.log(`Scroll width at 200% landscape: ${scrollWidth}, Client width: ${clientWidth}`);
    console.log(`Actual horizontal scroll at 200% landscape: ${actualOverflow ? 'YES' : 'NO'}`);
    expect(actualOverflow).toBe(false);
    console.log(`✓ No horizontal scroll at 200% zoom in landscape`);

    await page.screenshot({
      path: `verification/screenshots/landscape-200percent-zoom.png`,
      fullPage: false
    });
    console.log(`✓ 200% zoom landscape screenshot saved`);
  });

  // Test 200% zoom at 1024px
  test('200% Text Zoom at 1024px', async ({ page }) => {
    console.log(`\n=== Testing 200% zoom at 1024px ===`);
    
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');

    // Set 200% zoom
    await page.evaluate(() => {
      document.documentElement.style.fontSize = '200%';
    });
    await page.waitForTimeout(1000);

    // Check for overflow
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    const actualOverflow = scrollWidth > clientWidth;
    
    console.log(`Scroll width at 200% (1024px): ${scrollWidth}, Client width: ${clientWidth}`);
    console.log(`Actual horizontal scroll at 200% (1024px): ${actualOverflow ? 'YES' : 'NO'}`);
    expect(actualOverflow).toBe(false);
    console.log(`✓ No horizontal scroll at 200% zoom at 1024px`);

    await page.screenshot({
      path: `verification/screenshots/1024px-200percent-zoom.png`,
      fullPage: false
    });
    console.log(`✓ 200% zoom 1024px screenshot saved`);
  });

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

      // Take screenshot (viewport only to avoid WebKit 32767px limit)
      await page.screenshot({
        path: `verification/screenshots/${name}-200percent-zoom.png`,
        fullPage: false
      });
      console.log(`✓ 200% zoom screenshot saved`);

      // Check for overflow at 200% zoom (skip decorative and contained elements)
      const overflowData = await page.evaluate(() => {
        const clientWidth = document.documentElement.clientWidth;
        const offenders = [...document.querySelectorAll('*')].filter(e => {
          // Skip decorative elements
          if (e.classList.contains('pointer-events-none')) return false;
          const style = window.getComputedStyle(e);
          if (style.position === 'absolute' || style.position === 'fixed') return false;
          if (e.classList.contains('animate-marquee') || e.classList.contains('w-max')) return false;
          
          // Skip elements inside overflow-hidden containers
          let parent = e.parentElement;
          while (parent) {
            const parentStyle = window.getComputedStyle(parent);
            if (parentStyle.overflow === 'hidden' || parentStyle.overflowX === 'hidden') {
              return false;
            }
            parent = parent.parentElement;
          }
          
          const rect = e.getBoundingClientRect();
          return rect.right > clientWidth || rect.left < 0;
        });
        
        return {
          count: offenders.length,
          details: offenders.slice(0, 20).map(e => {
            const style = window.getComputedStyle(e);
            const parent = e.parentElement;
            const parentStyle = parent ? window.getComputedStyle(parent) : null;
            const rect = e.getBoundingClientRect();
            return {
              tag: e.tagName,
              className: e.className,
              id: e.id,
              rect: {
                left: rect.left,
                right: rect.right,
                width: rect.width
              },
              computed: {
                width: style.width,
                minWidth: style.minWidth,
                whiteSpace: style.whiteSpace,
                display: style.display
              },
              parentDisplay: parentStyle ? parentStyle.display : 'no parent'
            };
          })
        };
      });
      console.log(`Problematic overflow elements at 200% zoom: ${overflowData.count}`);
      if (overflowData.count > 0) {
        console.log('Overflow details:', JSON.stringify(overflowData.details, null, 2));
      }
      expect(overflowData.count).toBe(0);
      console.log(`✓ No problematic overflow at 200% zoom`);
    });
  });

  // STAGE 4: Tap Target Coverage
  test('Tap Target Coverage - Stage 4', async ({ page }) => {
    console.log(`\n=== STAGE 4: Tap Target Coverage ===`);
    
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');

    // Open mobile menu to include its links
    const menuButton = page.getByRole('button', { name: /مێنیو/ });
    await menuButton.click();
    await page.waitForTimeout(500);

    // Count all interactive elements
    const tapTargetData = await page.evaluate(() => {
      const interactiveElements = [
        ...document.querySelectorAll('a'),
        ...document.querySelectorAll('button'),
        ...document.querySelectorAll('input'),
        ...document.querySelectorAll('select'),
        ...document.querySelectorAll('textarea'),
        ...document.querySelectorAll('[role="button"]'),
        ...document.querySelectorAll('[tabindex]:not([tabindex="-1"])')
      ];

      const results = interactiveElements.map(e => {
        const rect = e.getBoundingClientRect();
        const style = window.getComputedStyle(e);
        const parent = e.parentElement;
        const parentStyle = parent ? window.getComputedStyle(parent) : null;
        
        // Check if it's an inline link within sentence content
        const isInlineLink = e.tagName === 'A' && 
                            parentStyle && 
                            parentStyle.display === 'inline' &&
                            !e.classList.contains('btn-') &&
                            !e.classList.contains('grid') &&
                            !e.classList.contains('flex');

        return {
          tag: e.tagName,
          selector: e.className || e.id || e.tagName,
          text: e.textContent?.slice(0, 50) || '',
          width: rect.width,
          height: rect.height,
          isVisible: rect.width > 0 && rect.height > 0,
          isInlineLink,
          display: style.display
        };
      });

      return {
        total: results.length,
        visible: results.filter(r => r.isVisible).length,
        under44px: results.filter(r => r.isVisible && (r.width < 44 || r.height < 44) && !r.isInlineLink),
        allResults: results.filter(r => r.isVisible)
      };
    });

    console.log(`Total interactive elements: ${tapTargetData.total}`);
    console.log(`Visible interactive elements: ${tapTargetData.visible}`);
    console.log(`Elements under 44px (non-inline): ${tapTargetData.under44px.length}`);
    
    if (tapTargetData.under44px.length > 0) {
      console.log('Elements under 44px:', JSON.stringify(tapTargetData.under44px, null, 2));
    }

    // Print 10 smallest elements
    const sortedBySize = [...tapTargetData.allResults].sort((a, b) => (a.width * a.height) - (b.width * b.height));
    const smallest10 = sortedBySize.slice(0, 10);
    console.log('10 smallest tap targets:', JSON.stringify(smallest10, null, 2));

    expect(tapTargetData.under44px.length).toBe(0);
    console.log(`✓ All non-inline tap targets ≥ 44px`);

    // Close menu
    await menuButton.click();
    await page.waitForTimeout(500);
  });

  // STAGE 5: Images
  test('Images - Stage 5', async ({ page }) => {
    console.log(`\n=== STAGE 5: Images ===`);
    
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');

    const imageData = await page.evaluate(() => {
      const images = [...document.querySelectorAll('img')];
      return images.map(img => {
        const rect = img.getBoundingClientRect();
        return {
          src: img.src,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          renderedWidth: rect.width,
          renderedHeight: rect.height,
          hasSrcset: img.hasAttribute('srcset'),
          hasSizes: img.hasAttribute('sizes'),
          loading: img.loading,
          fetchPriority: img.fetchPriority
        };
      });
    });

    console.log(`Total images: ${imageData.length}`);
    console.log('Image data:', JSON.stringify(imageData, null, 2));

    // Check LCP
    const lcpData = await page.evaluate(() => {
      return new Promise((resolve) => {
        if ('PerformanceObserver' in window) {
          const obs = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lcp = entries.find(e => e.entryType === 'largest-contentful-paint');
            if (lcp) {
              resolve({
                element: (lcp as any).element?.tagName || 'unknown',
                src: (lcp as any).element?.src || 'unknown',
                url: (lcp as any).url || 'unknown',
                size: (lcp as any).size || 0
              });
              obs.disconnect();
            }
          });
          obs.observe({ type: 'largest-contentful-paint', buffered: true });
          
          // If no LCP after 2s, return null
          setTimeout(() => {
            obs.disconnect();
            resolve({ element: 'not detected', src: 'not detected', url: 'not detected', size: 0 });
          }, 2000);
        } else {
          resolve({ element: 'PerformanceObserver not supported', src: 'n/a', url: 'n/a', size: 0 });
        }
      });
    });

    console.log('LCP data:', JSON.stringify(lcpData, null, 2));

    // Test at 1280px
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');

    const imageData1280 = await page.evaluate(() => {
      const images = [...document.querySelectorAll('img')];
      return images.map(img => {
        const rect = img.getBoundingClientRect();
        return {
          src: img.src.split('/').pop(),
          renderedWidth: rect.width,
          renderedHeight: rect.height
        };
      });
    });

    console.log('Image sizes at 1280px:', JSON.stringify(imageData1280, null, 2));

    // Check if any images have srcset
    const hasSrcset = imageData.some(img => img.hasSrcset);
    console.log(`Images with srcset: ${hasSrcset ? 'YES' : 'NO'}`);
    
    if (!hasSrcset) {
      console.log('NOTE: No images have srcset attributes. Responsive image variants not implemented.');
    }
  });
});
