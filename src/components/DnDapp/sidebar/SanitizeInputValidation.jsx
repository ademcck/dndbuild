// Geçerli karakterler ve temizleme işlemi
export const sanitizeFileName = (input) => {
    // Türkçe karakterleri İngilizce'ye dönüştürmek için harita
    const turkishToEnglishMap = {
        ç: "c",
        ğ: "g",
        ü: "u",
        ş: "s",
        ı: "i",
        ö: "o",
        Ç: "c",
        Ğ: "g",
        Ü: "u",
        Ş: "s",
        İ: "i",
        Ö: "o",
    };

    // Türkçe karakterleri İngilizce'ye çevirme fonksiyonu
    const replaceTurkishChars = (text) =>
        text.replace(/ç|ğ|ü|ş|ı|ö|Ç|Ğ|Ü|Ş|İ|Ö/g, (char) => turkishToEnglishMap[char] || char);

    // Geçerli karakterler: İngilizce harfler, rakamlar, "-" ve "_"
    const validChars = /[^a-zA-Z0-9_-]/g; // Geçerli olmayan karakterler
    const reservedNames = ["index", "about", "home", "con", "prn", "aux", "nul", "com1", "com2", "com3", "com4", "com5", "com6", "com7", "com8", "com9", "lpt1", "lpt2", "lpt3", "lpt4", "lpt5", "lpt6", "lpt7", "lpt8", "lpt9"];

    // 1. Türkçe karakterleri İngilizce'ye dönüştür
    let cleanedPageName = replaceTurkishChars(input);

    // 2. Temizleme işlemi
    cleanedPageName = cleanedPageName
        .trim()
        .toLowerCase() // İngilizce küçük harf
        .replace(validChars, ""); // Geçerli olmayan karakterleri kaldır

    // 3. Rezerve edilmiş isim kontrolü
    // if (reservedNames.includes(cleanedPageName)) {
    //     cleanedPageName += "_page"; // Rezerve isimlere "_page" ekle
    // }

    // 4. Boş isim kontrolü
    if (!cleanedPageName || cleanedPageName === "") {
        cleanedPageName = ""; // Varsayılan isim
    }

    // 5. Çok uzun isimleri kısalt
    if (cleanedPageName.length > 50) {
        cleanedPageName = cleanedPageName.substring(0, 50);
    }

    return cleanedPageName;
};