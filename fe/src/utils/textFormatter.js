/**
 * Tiện ích xử lý văn bản tiếng Nhật
 */

/**
 * Tách chuỗi có furigana dạng "漢字[かんじ]" thành mảng
 * @param {string} text - VD: "日本語[にほんご]を勉強[べんきょう]する"
 * @returns {Array<{kanji: string, reading: string} | string>}
 */
export function parseFurigana(text) {
    if (!text) return [];

    const regex = /([一-龯々ヶ]+)\[([^\]]+)\]/g;
    const result = [];
    let lastIndex = 0;

    let match;
    while ((match = regex.exec(text)) !== null) {
        // Text trước kanji
        if (match.index > lastIndex) {
            result.push(text.slice(lastIndex, match.index));
        }
        // Kanji + furigana
        result.push({ kanji: match[1], reading: match[2] });
        lastIndex = match.index + match[0].length;
    }

    // Phần còn lại
    if (lastIndex < text.length) {
        result.push(text.slice(lastIndex));
    }

    return result;
}

/**
 * Tạo cloze (ẩn từ khóa) trong câu
 * @param {string} sentence - Câu đầy đủ
 * @param {string} target - Từ cần ẩn
 * @returns {string} - Câu với {{cloze}} thay thế
 */
export function createCloze(sentence, target) {
    if (!sentence || !target) return sentence;
    return sentence.replace(target, '{{cloze}}');
}

/**
 * Highlight từ khóa trong câu
 * @param {string} text - Câu đầy đủ
 * @param {string} keyword - Từ cần highlight
 * @returns {Array<{text: string, highlighted: boolean}>}
 */
export function highlightKeyword(text, keyword) {
    if (!text || !keyword) return [{ text, highlighted: false }];

    const parts = text.split(keyword);
    const result = [];

    parts.forEach((part, i) => {
        if (part) result.push({ text: part, highlighted: false });
        if (i < parts.length - 1) {
            result.push({ text: keyword, highlighted: true });
        }
    });

    return result;
}
