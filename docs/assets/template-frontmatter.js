(function (global, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    global.TemplateFrontmatter = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // Parse a YAML-like frontmatter block from markdown text.
  // Supports: flat key: value, flat arrays [a, b], quoted strings, numbers.
  // Does NOT support: nested objects, multi-line values, anchors/aliases.
  // Returns { data: Object, body: String }.
  function parseFrontmatter(text) {
    if (!text || typeof text !== 'string') return { data: {}, body: text || '' };
    if (!text.startsWith('---')) return { data: {}, body: text };

    var rest = text.slice(3);
    // Accept --- or ---\r\n (CRLF tolerance)
    var afterDashes = rest.replace(/^\r?\n/, '');
    var end = rest.indexOf('\n---');
    if (end === -1) return { data: {}, body: text };

    var yaml = rest.slice(0, end).trim();
    var body = rest.slice(end + 4).replace(/^\r?\n/, '');

    var data = {};
    var lines = yaml.split('\n');
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].trim();
      if (!line || line.charAt(0) === '#') continue;

      var colonIdx = line.indexOf(':');
      if (colonIdx === -1) continue;

      var key = line.slice(0, colonIdx).trim();
      var val = line.slice(colonIdx + 1).trim();
      if (!key) continue;

      // Flat inline array: [a, b, c]
      if (val.charAt(0) === '[' && val.charAt(val.length - 1) === ']') {
        var inner = val.slice(1, -1).trim();
        data[key] = inner
          ? inner.split(',').map(function (s) {
              return s.trim().replace(/^['"]|['"]$/g, '');
            }).filter(Boolean)
          : [];
        continue;
      }

      // Strip surrounding quotes
      if (
        (val.charAt(0) === '"' && val.charAt(val.length - 1) === '"') ||
        (val.charAt(0) === "'" && val.charAt(val.length - 1) === "'")
      ) {
        val = val.slice(1, -1);
      }

      // Coerce to number when the entire value is numeric
      if (val !== '' && !isNaN(Number(val))) {
        data[key] = Number(val);
        continue;
      }

      data[key] = val;
    }

    return { data: data, body: body };
  }

  return { parseFrontmatter: parseFrontmatter };
});
