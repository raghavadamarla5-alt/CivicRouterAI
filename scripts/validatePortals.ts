import { allPortals } from '../src/lib/portalsRegistry';
import * as fs from 'fs';

async function runValidation() {
  console.log("=========================================");
  console.log("CIVIC PORTAL REGISTRY - HEALTH CHECK TOOL");
  console.log("=========================================\n");

  const total = allPortals.length;
  console.log(`Total portal records: ${total}`);

  let missingUrls = 0;
  let invalidUrls = 0;
  let unverified = 0;
  let missingLevel = 0;
  let missingJurisdiction = 0;
  let missingDept = 0;

  const urlMap = new Map();
  const duplicates = [];

  for (const portal of allPortals) {
    if (!portal.url) {
      missingUrls++;
    } else {
      try {
        new URL(portal.url);
      } catch (e) {
        invalidUrls++;
        console.log(`[!] Invalid URL format in ${portal.id}: ${portal.url}`);
      }

      if (urlMap.has(portal.url)) {
        duplicates.push({ id1: urlMap.get(portal.url), id2: portal.id, url: portal.url });
      } else {
        urlMap.set(portal.url, portal.id);
      }
    }

    if (!portal.verified) unverified++;
    if (!portal.level) missingLevel++;
    if (!portal.jurisdiction) missingJurisdiction++;
    if (!portal.department) missingDept++;
  }

  console.log(`\n--- DATA QUALITY REPORT ---`);
  console.log(`Missing URLs: ${missingUrls}`);
  console.log(`Invalid URL formats: ${invalidUrls}`);
  console.log(`Duplicate URLs found: ${duplicates.length}`);
  if (duplicates.length > 0) {
    duplicates.forEach(d => console.log(`  -> ${d.id1} and ${d.id2} share URL: ${d.url}`));
  }
  
  console.log(`Unverified destinations: ${unverified}`);
  console.log(`Records missing government level: ${missingLevel}`);
  console.log(`Records missing jurisdiction: ${missingJurisdiction}`);
  console.log(`Records missing department: ${missingDept}`);
  
  console.log("\n(Note: Active HTTP validation of endpoints skipped to prevent automated blocking. Use manual verification for flagged uncertain records.)");
  console.log("=========================================");
}

runValidation();
