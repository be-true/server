'use_strict'

/**
 * Выдает mime тип файла по его расширению
 * 
 * @param {String} ext - расширение файла
 * @returns {String}
 */
function mime(ext) {
    const ext_ = ext.toLowerCase();
    let type = mapExtToMime[ext_];
    if (!type) type = mapExtToMime[alias[ext_]];
    return type;
}

const alias = {
    'htm': 'html',
    'jpg': 'jpeg',
    '3gp': '3gpp',
    '3g2': '3gpp2',
}

const mapExtToMime = {
    // application
    'binary': 'application/octet-stream', // двоичный файл без указания формата (RFC 2046)
    'json': 'application/json', // JavaScript Object Notation JSON (RFC 4627)
    'js': 'application/javascript', // JavaScript (RFC 4329)
    'ogg': 'application/ogg', // Ogg (RFC 5334)
    'pdf': 'application/pdf', // Portable Document Format, PDF (RFC 3778)
    'woff': 'application/font-woff', // Web Open Font Format
    'xhtml': 'application/xhtml+xml', // XHTML (RFC 3236)
    'zip': 'application/zip', // ZIP
    'gzip': 'application/gzip', // Gzip
    'xml': 'application/xml', // XML
    'doc': 'application/msword', // DOC
    // images
    'gif': 'image/gif', // GIF (RFC 2045 и RFC 2046)
    'jpeg': 'image/jpeg', // JPEG (RFC 2045 и RFC 2046)
    'png': 'image/png', // Portable Network Graphics(RFC 2083)
    'svg': 'image/svg+xml', // SVG[11]
    'tiff': 'image/tiff', // TIFF (RFC 3302)
    'ico': 'image/vnd.microsoft.icon', // ICO[12]
    'wbmp': 'image/vnd.wap.wbmp', // WBMP
    'webp': 'image/webp', // WebP
    // text
    'plain': 'text/plain', // текстовые данные (RFC 2046 и RFC 3676)
    'css': 'text/css', // Cascading Style Sheets (RFC 2318)
    'csv': 'text/csv', // CSV (RFC 4180)
    'html': 'text/html', // HTML (RFC 2854)
    'php': 'text/php', // Скрипт языка PHP
    'xml': 'text/xml', // Extensible Markup Language (RFC 3023)
    'markdown': 'text/markdown', // файл языка разметки Markdown (RFC 7763)
    'cache': 'text/cache-manifest', // файл манифеста(RFC 2046)
    // video
    'mpeg': 'video/mpeg', //  MPEG-1 (RFC 2045 и RFC 2046)
    'mp4': 'video/mp4', //  MP4 (RFC 4337)
    'ogg': 'video/ogg', // Ogg Theora или другое видео (RFC 5334)
    'webm': 'video/webm', // WebM
    'wmv': 'video/x-ms-wmv', // Windows Media Video
    'flv': 'video/x-flv', // FLV
    'avi': 'video/x-msvideo', // AVI
    '3gpp': 'video/3gpp', // .3gpp .3gp
    '3gpp2': 'video/3gpp2', // .3gpp2 .3g2
    // audio
    'acc': 'audio/aac', // AAC
    'mp3': 'audio/mpeg', // MP3 или др. MPEG (RFC 3003)
    'ogg': 'audio/ogg', // Ogg (RFC 5334)
    'wma': 'audio/x-ms-wma', // Windows Media Audio
    'wav': 'audio/vnd.wave', // WAV (RFC 2361)
}

module.exports = {
    mime
}