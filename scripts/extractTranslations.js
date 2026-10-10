const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src');
const localesDir = path.join(__dirname, '../src/lib/locales');

function findTsxFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const stat = fs.statSync(path.join(dir, file));
    if (stat.isDirectory()) {
      findTsxFiles(path.join(dir, file), fileList);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      fileList.push(path.join(dir, file));
    }
  }
  return fileList;
}

const files = findTsxFiles(srcDir);
const extracted = {};

const regex = /t\(['"`]([\w.]+)['"`]\s*,\s*['"`](.*?)['"`]\)/g;

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');
  let match;
  while ((match = regex.exec(content)) !== null) {
    const keyPath = match[1].split('.');
    let current = extracted;
    for (let i = 0; i < keyPath.length; i++) {
      if (i === keyPath.length - 1) {
        current[keyPath[i]] = match[2];
      } else {
        current[keyPath[i]] = current[keyPath[i]] || {};
        current = current[keyPath[i]];
      }
    }
  }
});

// Also merge with existing generateTranslations script keys
const existingEn = require(path.join(localesDir, 'en.json'));
const merged = { ...existingEn };

function mergeDeep(target, source) {
  for (const key in source) {
    if (source[key] instanceof Object) {
      Object.assign(source[key], mergeDeep(target[key] || {}, source[key]));
    }
  }
  Object.assign(target || {}, source);
  return target;
}
mergeDeep(merged, extracted);

fs.writeFileSync(path.join(localesDir, 'en.json'), JSON.stringify(merged, null, 2));
console.log('Extracted translations to en.json successfully.');

// Backfill empty keys in all languages
const languages = ['hi', 'te', 'ta', 'kn', 'ml', 'bn', 'mr', 'gu', 'pa', 'or', 'as', 'ur', 'sa', 'ks', 'kok', 'mni', 'ne', 'brx', 'sat', 'doi', 'mai'];

languages.forEach(lang => {
  const file = path.join(localesDir, `${lang}.json`);
  let langData = {};
  if (fs.existsSync(file)) {
    langData = JSON.parse(fs.readFileSync(file, 'utf8'));
  }
  
  function backfill(sourceObj, targetObj) {
    for (const key in sourceObj) {
      if (sourceObj[key] instanceof Object) {
        targetObj[key] = targetObj[key] || {};
        backfill(sourceObj[key], targetObj[key]);
      } else {
        if (!(key in targetObj)) {
          targetObj[key] = ''; // Missing
        }
      }
    }
  }
  backfill(merged, langData);
  fs.writeFileSync(file, JSON.stringify(langData, null, 2));
});
