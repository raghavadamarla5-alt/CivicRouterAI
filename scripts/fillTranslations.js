const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '../src/lib/locales');

const newTranslations = {
  hi: {
    tracking: {
      title: "मेरी शिकायतें",
      searchPlaceholder: "शिकायत आईडी या समस्या द्वारा खोजें...",
      loading: "आपका ट्रैकिंग इतिहास लोड हो रहा है...",
      noComplaints: "कोई शिकायत नहीं मिली।",
      noComplaintsDesc: "अपने फ़िल्टर समायोजित करने का प्रयास करें या डैशबोर्ड पर वापस जाएं।"
    }
  },
  te: {
    tracking: {
      title: "నా ఫిర్యాదులు",
      searchPlaceholder: "ఫిర్యాదు ID ద్వారా శోధించండి...",
      loading: "మీ ట్రాకింగ్ చరిత్ర లోడ్ అవుతోంది...",
      noComplaints: "ఎలాంటి ఫిర్యాదులు కనుగొనబడలేదు.",
      noComplaintsDesc: "డాష్‌బోర్డ్‌కు తిరిగి వెళ్లండి."
    }
  },
  ta: {
    tracking: {
      title: "எனது புகார்கள்",
      searchPlaceholder: "புகார் ஐடி மூலம் தேடு...",
      loading: "உங்கள் வரலாறு ஏற்றப்படுகிறது...",
      noComplaints: "எந்த புகாரும் இல்லை.",
      noComplaintsDesc: "உங்கள் வடிப்பான்களை மாற்றவும் அல்லது டாஷ்போர்டுக்கு திரும்பவும்."
    }
  },
  kn: {
    tracking: {
      title: "ನನ್ನ ದೂರುಗಳು",
      searchPlaceholder: "ದೂರು ಐಡಿ ಮೂಲಕ ಹುಡುಕಿ...",
      loading: "ನಿಮ್ಮ ಇತಿಹಾಸವನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...",
      noComplaints: "ಯಾವುದೇ ದೂರುಗಳಿಲ್ಲ.",
      noComplaintsDesc: "ನಿಮ್ಮ ಫಿಲ್ಟರ್‌ಗಳನ್ನು ಹೊಂದಿಸಲು ಪ್ರಯತ್ನಿಸಿ ಅಥವಾ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಹಿಂತಿರುಗಿ."
    }
  },
  ml: {
    tracking: {
      title: "എന്റെ പരാതികൾ",
      searchPlaceholder: "പരാതി ഐഡി വഴി തിരയുക...",
      loading: "നിങ്ങളുടെ ചരിത്രം ലോഡുചെയ്യുന്നു...",
      noComplaints: "പരാതികളൊന്നും കണ്ടെത്തിയില്ല.",
      noComplaintsDesc: "നിങ്ങളുടെ ഫിൽട്ടറുകൾ ക്രമീകരിക്കുകയോ ഡാഷ്‌ബോർഡിലേക്ക് മടങ്ങുകയോ ചെയ്യുക."
    }
  }
};

Object.keys(newTranslations).forEach(lang => {
  const file = path.join(localesDir, `${lang}.json`);
  const existing = JSON.parse(fs.readFileSync(file, 'utf8'));
  
  function mergeDeep(target, source) {
    for (const key in source) {
      if (source[key] instanceof Object) {
        Object.assign(source[key], mergeDeep(target[key] || {}, source[key]));
      }
    }
    Object.assign(target || {}, source);
    return target;
  }
  
  mergeDeep(existing, newTranslations[lang]);
  fs.writeFileSync(file, JSON.stringify(existing, null, 2));
});

console.log("Updated core languages with tracking keys.");
