const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '../src/lib/locales');
const languages = ['en', 'hi', 'te', 'ta', 'kn', 'ml', 'bn', 'mr', 'gu', 'pa', 'or', 'as', 'ur', 'sa', 'ks', 'kok', 'mni', 'ne', 'brx', 'sat', 'doi', 'mai'];

function flattenObject(ob) {
    let toReturn = {};
    for (let i in ob) {
        if (!ob.hasOwnProperty(i)) continue;
        if ((typeof ob[i]) == 'object' && ob[i] !== null) {
            let flatObject = flattenObject(ob[i]);
            for (let x in flatObject) {
                if (!flatObject.hasOwnProperty(x)) continue;
                toReturn[i + '.' + x] = flatObject[x];
            }
        } else {
            toReturn[i] = ob[i];
        }
    }
    return toReturn;
}

const getTranslations = (lang) => {
    const file = path.join(localesDir, `${lang}.json`);
    if (!fs.existsSync(file)) return {};
    return flattenObject(JSON.parse(fs.readFileSync(file, 'utf8')));
};

console.log("Translation Completeness Report\n==============================");

const englishKeys = getTranslations('en');
const totalKeys = Object.keys(englishKeys).length;

if (totalKeys === 0) {
    console.error("No keys found in English source. Run generateTranslations.js first.");
    process.exit(1);
}

let allPassed = true;

languages.forEach(lang => {
    const langKeys = getTranslations(lang);
    const missingKeys = [];
    const emptyKeys = [];
    const englishBleed = [];
    
    Object.keys(englishKeys).forEach(key => {
        if (!(key in langKeys)) {
            missingKeys.push(key);
        } else if (langKeys[key].trim() === '') {
            emptyKeys.push(key);
        } else if (lang !== 'en' && langKeys[key] === englishKeys[key] && englishKeys[key].match(/[a-zA-Z]/)) {
            // Checks if a translation is required but it's just a copy of English
            englishBleed.push(key);
        }
    });
    
    const translatedKeys = totalKeys - missingKeys.length - emptyKeys.length - englishBleed.length;
    const percentage = ((translatedKeys / totalKeys) * 100).toFixed(2);
    
    console.log(`\n[${lang}] - ${percentage}% Complete`);
    if (missingKeys.length > 0) console.log(`  - Missing: ${missingKeys.length} keys`);
    if (emptyKeys.length > 0) console.log(`  - Empty: ${emptyKeys.length} keys`);
    if (englishBleed.length > 0) console.log(`  - English Bleed: ${englishBleed.length} keys`);
    
    if (missingKeys.length > 0 || emptyKeys.length > 0) {
        allPassed = false;
    }
});

if (!allPassed) {
    console.error("\nERROR: Incomplete translations detected.");
    process.exit(1);
}

console.log("\nSUCCESS: All translations are fully mapped.");
