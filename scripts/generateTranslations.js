const fs = require('fs');
const path = require('path');

const en = {
  header: {
    dashboard: "Dashboard",
    portals: "Portals",
    report: "Report",
    track: "Track",
    language: "Language",
    profile: "Profile"
  },
  dashboard: {
    greeting: "Welcome back, Citizen",
    overview: "Civic Issues Overview",
    reportAction: "Report New Issue",
    trackAction: "Track Issue",
    portalsAction: "Find Portals"
  },
  portals: {
    title: "Government Portal Directory",
    desc: "Discover verified official grievance and service portals across Central, State, and Local authorities.",
    searchPlaceholder: "Search portals by name, department, or service...",
    resetFilters: "Reset Filters",
    openPortal: "Open Portal",
    noResults: "No verified portals found",
    allStates: "All States & UTs (Jurisdiction)",
    totalRecords: "Total Records"
  },
  assistant: {
    greeting: "Hi! I am CIVIC AI. I can help you find government portals, classify civic issues, and track your complaints. How can I help?",
    placeholder: "Ask CIVIC AI... (Shift+Enter for new line)",
    q1: "Where should I report a pothole?",
    q2: "How can I complain about garbage collection?",
    q3: "Which portal handles water supply issues?",
    q4: "How do I report a broken streetlight?",
    clear: "Clear Conversation"
  }
};

const translations = {
  en: en,
  hi: {
    header: { dashboard: "डैशबोर्ड", portals: "पोर्टल", report: "रिपोर्ट", track: "ट्रैक", language: "भाषा", profile: "प्रोफ़ाइल" },
    dashboard: { greeting: "वापसी पर स्वागत है, नागरिक", overview: "नागरिक समस्या अवलोकन", reportAction: "नई समस्या की रिपोर्ट करें", trackAction: "समस्या ट्रैक करें", portalsAction: "पोर्टल खोजें" },
    portals: { title: "सरकारी पोर्टल निर्देशिका", desc: "केंद्रीय, राज्य और स्थानीय अधिकारियों में सत्यापित आधिकारिक शिकायत और सेवा पोर्टल खोजें।", searchPlaceholder: "नाम, विभाग या सेवा द्वारा पोर्टल खोजें...", resetFilters: "फ़िल्टर रीसेट करें", openPortal: "पोर्टल खोलें", noResults: "कोई सत्यापित पोर्टल नहीं मिला", allStates: "सभी राज्य और केंद्र शासित प्रदेश (अधिकार क्षेत्र)", totalRecords: "कुल रिकॉर्ड" },
    assistant: { greeting: "नमस्ते! मैं CIVIC AI हूँ। मैं आपकी सहायता कर सकता हूँ।", placeholder: "CIVIC AI से पूछें...", q1: "गड्ढे की रिपोर्ट कहाँ करें?", q2: "कचरे की शिकायत कैसे करें?", q3: "जल आपूर्ति पोर्टल कौन सा है?", q4: "टूटी स्ट्रीटलाइट की रिपोर्ट कैसे करें?", clear: "बातचीत साफ़ करें" }
  },
  te: {
    header: { dashboard: "డాష్‌బోర్డ్", portals: "పోర్టల్స్", report: "రిపోర్ట్", track: "ట్రాక్", language: "భాష", profile: "ప్రొఫైల్" },
    dashboard: { greeting: "స్వాగతం, పౌరుడా", overview: "పౌర సమస్యల అవలోకనం", reportAction: "కొత్త సమస్యను నివేదించండి", trackAction: "సమస్యను ట్రాక్ చేయండి", portalsAction: "పోర్టల్‌లను కనుగొనండి" },
    portals: { title: "ప్రభుత్వ పోర్టల్ డైరెక్టరీ", desc: "అధికారిక ఫిర్యాదు మరియు సేవా పోర్టల్‌లను కనుగొనండి.", searchPlaceholder: "పోర్టల్‌లను శోధించండి...", resetFilters: "ఫిల్టర్‌లను రీసెట్ చేయండి", openPortal: "పోర్టల్ తెరవండి", noResults: "పోర్టల్‌లు కనుగొనబడలేదు", allStates: "అన్ని రాష్ట్రాలు (అధికార పరిధి)", totalRecords: "మొత్తం రికార్డులు" },
    assistant: { greeting: "నమస్తే! నేను CIVIC AI. నేను ఎలా సహాయం చేయగలను?", placeholder: "CIVIC AI ని అడగండి...", q1: "గుంతను ఎక్కడ నివేదించాలి?", q2: "చెత్త గురించి ఎలా ఫిర్యాదు చేయాలి?", q3: "నీటి సరఫరా పోర్టల్ ఏది?", q4: "వీధి దీపం గురించి ఎలా నివేదించాలి?", clear: "సంభాషణను క్లియర్ చేయండి" }
  },
  ta: {
    header: { dashboard: "டாஷ்போர்டு", portals: "போர்ட்டல்கள்", report: "புகார்", track: "கண்காணி", language: "மொழி", profile: "சுயவிவரம்" },
    dashboard: { greeting: "நல்வரவு, குடிமகனே", overview: "குடிமக்கள் பிரச்சனைகள்", reportAction: "புதிய புகாரை அளிக்கவும்", trackAction: "புகாரை கண்காணிக்கவும்", portalsAction: "போர்ட்டல்களை தேடு" },
    portals: { title: "அரசு போர்ட்டல் அடைவு", desc: "அதிகாரப்பூர்வ புகார் மற்றும் சேவை போர்ட்டல்களைக் கண்டறியவும்.", searchPlaceholder: "போர்ட்டல்களைத் தேடுங்கள்...", resetFilters: "வடிகட்டிகளை மீட்டமை", openPortal: "போர்ட்டலைத் திற", noResults: "போர்ட்டல்கள் இல்லை", allStates: "அனைத்து மாநிலங்களும்", totalRecords: "மொத்த பதிவுகள்" },
    assistant: { greeting: "வணக்கம்! நான் CIVIC AI. நான் எப்படி உதவ முடியும்?", placeholder: "CIVIC AI யிடம் கேளுங்கள்...", q1: "குழியை எங்கே புகாரளிப்பது?", q2: "குப்பை குறித்து எப்படி புகாரளிப்பது?", q3: "நீர் விநியோக போர்ட்டல் எது?", q4: "தெருவிளக்கு குறித்து எப்படி புகாரளிப்பது?", clear: "உரையாடலை அழிக்கவும்" }
  },
  kn: {
    header: { dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್", portals: "ಪೋರ್ಟಲ್‌ಗಳು", report: "ವರದಿ", track: "ಟ್ರ್ಯಾಕ್", language: "ಭಾಷೆ", profile: "ಪ್ರೊಫೈಲ್" },
    dashboard: { greeting: "ಸ್ವಾಗತ, ನಾಗರಿಕ", overview: "ನಾಗರಿಕ ಸಮಸ್ಯೆಗಳ ಅವಲೋಕನ", reportAction: "ಹೊಸ ಸಮಸ್ಯೆಯನ್ನು ವರದಿ ಮಾಡಿ", trackAction: "ಸಮಸ್ಯೆಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ", portalsAction: "ಪೋರ್ಟಲ್‌ಗಳನ್ನು ಹುಡುಕಿ" },
    portals: { title: "ಸರ್ಕಾರಿ ಪೋರ್ಟಲ್ ಡೈರೆಕ್ಟರಿ", desc: "ಅಧಿಕೃತ ದೂರು ಮತ್ತು ಸೇವಾ ಪೋರ್ಟಲ್‌ಗಳನ್ನು ಅನ್ವೇಷಿಸಿ.", searchPlaceholder: "ಪೋರ್ಟಲ್‌ಗಳನ್ನು ಹುಡುಕಿ...", resetFilters: "ಫಿಲ್ಟರ್‌ಗಳನ್ನು ಮರುಹೊಂದಿಸಿ", openPortal: "ಪೋರ್ಟಲ್ ತೆರೆಯಿರಿ", noResults: "ಯಾವುದೇ ಪೋರ್ಟಲ್‌ಗಳು ಕಂಡುಬಂದಿಲ್ಲ", allStates: "ಎಲ್ಲಾ ರಾಜ್ಯಗಳು", totalRecords: "ಒಟ್ಟು ದಾಖಲೆಗಳು" },
    assistant: { greeting: "ನಮಸ್ಕಾರ! ನಾನು CIVIC AI. ನಾನು ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?", placeholder: "CIVIC AI ಅನ್ನು ಕೇಳಿ...", q1: "ಗುಂಡಿಯನ್ನು ಎಲ್ಲಿ ವರದಿ ಮಾಡಬೇಕು?", q2: "ಕಸದ ಬಗ್ಗೆ ದೂರು ನೀಡುವುದು ಹೇಗೆ?", q3: "ನೀರು ಸರಬರಾಜು ಪೋರ್ಟಲ್ ಯಾವುದು?", q4: "ಬೀದಿದೀಪದ ಬಗ್ಗೆ ವರದಿ ಮಾಡುವುದು ಹೇಗೆ?", clear: "ಸಂಭಾಷಣೆಯನ್ನು ತೆರವುಗೊಳಿಸಿ" }
  },
  ml: {
    header: { dashboard: "ഡാഷ്ബോർഡ്", portals: "പോർട്ടലുകൾ", report: "റിപ്പോർട്ട്", track: "ട്രാക്ക്", language: "ഭാഷ", profile: "പ്രൊഫൈൽ" },
    dashboard: { greeting: "സ്വാഗതം, പൗരനേ", overview: "പൗര പ്രശ്നങ്ങളുടെ അവലോകനം", reportAction: "പുതിയ പ്രശ്നം റിപ്പോർട്ട് ചെയ്യുക", trackAction: "പ്രശ്നം ട്രാക്ക് ചെയ്യുക", portalsAction: "പോർട്ടലുകൾ കണ്ടെത്തുക" },
    portals: { title: "സർക്കാർ പോർട്ടൽ ഡയറക്ടറി", desc: "ഔദ്യോഗിക പരാതി, സേവന പോർട്ടലുകൾ കണ്ടെത്തുക.", searchPlaceholder: "പോർട്ടലുകൾ തിരയുക...", resetFilters: "ഫിൽട്ടറുകൾ പുനഃസജ്ജമാക്കുക", openPortal: "പോർട്ടൽ തുറക്കുക", noResults: "പോർട്ടലുകളൊന്നും കണ്ടെത്തിയില്ല", allStates: "എല്ലാ സംസ്ഥാനങ്ങളും", totalRecords: "ആകെ രേഖകൾ" },
    assistant: { greeting: "നമസ്കാരം! ഞാൻ CIVIC AI ആണ്. എനിക്ക് എങ്ങനെ സഹായിക്കാനാകും?", placeholder: "CIVIC AI-യോട് ചോദിക്കുക...", q1: "കുഴി എവിടെ റിപ്പോർട്ട് ചെയ്യണം?", q2: "മാലിന്യത്തെക്കുറിച്ച് എങ്ങനെ പരാതിപ്പെടാം?", q3: "ജലവിതരണ പോർട്ടൽ ഏതാണ്?", q4: "തെരുവുവിളക്ക് എങ്ങനെ റിപ്പോർട്ട് ചെയ്യാം?", clear: "സംഭാഷണം മായ്ക്കുക" }
  }
};

const outDir = path.join(__dirname, '../src/lib/locales');
for (const [lang, data] of Object.entries(translations)) {
  fs.writeFileSync(path.join(outDir, `${lang}.json`), JSON.stringify(data, null, 2));
}
console.log("Translations generated!");
