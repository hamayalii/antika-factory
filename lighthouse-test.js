import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'http://localhost:4178';

async function runLighthouse() {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const options = {
    logLevel: 'info',
    output: 'json',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    port: chrome.port,
    formFactor: 'mobile',
    screenEmulation: {
      mobile: true,
      width: 375,
      height: 667,
      deviceScaleFactor: 2,
      disabled: false,
    },
    throttling: {
      rttMs: 40,
      throughputKbps: 10240,
      cpuSlowdownMultiplier: 4,
      requestLatencyMs: 0,
      downloadThroughputKbps: 0,
      uploadThroughputKbps: 0,
    },
    emulatedUserAgent: true,
  };

  console.log('Running Lighthouse Mobile Test 1...');
  const runnerResult1 = await lighthouse(BASE_URL, options);
  const report1 = runnerResult1.report;
  
  // Write first report
  fs.writeFileSync('verification/lighthouse-report-1.json', report1);
  const result1 = JSON.parse(report1);
  
  console.log('\n=== LIGHTHOUSE TEST 1 RESULTS ===');
  console.log(`Performance: ${result1.categories.performance.score * 100}`);
  console.log(`Accessibility: ${result1.categories.accessibility.score * 100}`);
  console.log(`Best Practices: ${result1.categories['best-practices'].score * 100}`);
  console.log(`SEO: ${result1.categories.seo.score * 100}`);
  console.log(`LCP: ${result1.audits['largest-contentful-paint'].numericValue}ms`);
  console.log(`CLS: ${result1.audits['cumulative-layout-shift'].numericValue}`);
  console.log(`INP/TBT: ${result1.audits['total-blocking-time']?.numericValue || 'N/A'}ms`);

  await chrome.kill();

  // Run second test
  console.log('\nRunning Lighthouse Mobile Test 2...');
  const chrome2 = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  options.port = chrome2.port;
  
  const runnerResult2 = await lighthouse(BASE_URL, options);
  const report2 = runnerResult2.report;
  
  // Write second report
  fs.writeFileSync('verification/lighthouse-report-2.json', report2);
  const result2 = JSON.parse(report2);
  
  console.log('\n=== LIGHTHOUSE TEST 2 RESULTS ===');
  console.log(`Performance: ${result2.categories.performance.score * 100}`);
  console.log(`Accessibility: ${result2.categories.accessibility.score * 100}`);
  console.log(`Best Practices: ${result2.categories['best-practices'].score * 100}`);
  console.log(`SEO: ${result2.categories.seo.score * 100}`);
  console.log(`LCP: ${result2.audits['largest-contentful-paint'].numericValue}ms`);
  console.log(`CLS: ${result2.audits['cumulative-layout-shift'].numericValue}`);
  console.log(`INP/TBT: ${result2.audits['total-blocking-time']?.numericValue || 'N/A'}ms`);

  await chrome2.kill();

  // Calculate median
  const perf1 = result1.categories.performance.score * 100;
  const perf2 = result2.categories.performance.score * 100;
  const a11y1 = result1.categories.accessibility.score * 100;
  const a11y2 = result2.categories.accessibility.score * 100;
  const bp1 = result1.categories['best-practices'].score * 100;
  const bp2 = result2.categories['best-practices'].score * 100;
  const seo1 = result1.categories.seo.score * 100;
  const seo2 = result2.categories.seo.score * 100;

  console.log('\n=== MEDIAN RESULTS ===');
  console.log(`Performance: ${Math.round((perf1 + perf2) / 2)}`);
  console.log(`Accessibility: ${Math.round((a11y1 + a11y2) / 2)}`);
  console.log(`Best Practices: ${Math.round((bp1 + bp2) / 2)}`);
  console.log(`SEO: ${Math.round((seo1 + seo2) / 2)}`);
}

runLighthouse().catch(console.error);
