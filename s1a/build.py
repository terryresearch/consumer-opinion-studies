#!/usr/bin/env python3
"""Inline src/ into the single-file index.html that GitHub Pages serves."""
import pathlib
here = pathlib.Path(__file__).parent
src = here / "src"
html = (src / "index.html").read_text(encoding="utf-8")
html = html.replace('<link rel="stylesheet" href="study.css">',
                    "<style>\n" + (src / "study.css").read_text(encoding="utf-8") + "\n</style>")
html = html.replace(
    '<script src="config.js"></script>\n<script src="measures.js"></script>\n<script src="study.js"></script>',
    "<script>\n" + (src / "config.js").read_text(encoding="utf-8") + "\n</script>\n\n"
    "<script>\n" + (src / "measures.js").read_text(encoding="utf-8") + "\n</script>\n\n"
    "<script>\n" + (src / "study.js").read_text(encoding="utf-8") + "\n</script>")
for bad in ('href="study.css"', 'src="study.js"', 'src="config.js"', 'src="measures.js"'):
    assert bad not in html, bad
(here / "index.html").write_text(html, encoding="utf-8")
print("wrote", here / "index.html", len(html), "bytes")
