# 造境成遊 · Bird-worm-inspired seal study

Original vector lettering study for the Indie Game Dev Club at Pitt, 2026-09-27.

## Deliverables

- `zaojing-chengyou-birdworm.svg`: portable final outline artwork; transparent background and transparent engraved lettering, one ink color (`#a42e28`). No fonts, embedded bitmaps, scripts, or external resources.
- `zaojing-chengyou-editable.svg`: working master with one named group per character and stroke-based construction inside a luminance mask.
- `zaojing-chengyou-preview.png`: 1200 px paper-colored preview of the same artwork.
- `zaojing-chengyou-transparent.png`: 640 px transparent PNG fallback.
- `draw-seal.py`: authoring source for the master.
- `export-outlines.py`: outline/boolean exporter, using svgpathtools and Shapely.

Reading order: right column top-to-bottom 造境, then left column top-to-bottom 成遊. The left column visually reads 成 above 遊.

## Design approach

The requested text is 造境成游; the inscription uses 遊 for play/roaming. The drawing borrows bird-worm seal methods: selective bird-head terminals, sinuous stroke extensions, eyes as isolated islands of ink, and contrast between dense and open spaces. It does not reuse or trace the supplied imperial-seal SVG paths.

Character structures studied:

- 造: 辵 + 告. The movement component wraps left and below the enclosed 告 component.
- 境: 土 + 竟. The left earth component is kept separate from the right component. The reference is in the later supplementary Shuowen material.
- 成: 戊 + 丁, retaining the interior stem and enclosing diagonal structure.
- 遊: seal-style interpretation of 辵 + 斿. The dictionary explicitly says 遊 is not recorded as a headword in the original Shuowen; it discusses related 斿 forms and their combination. The present lettering uses that component explanation, not a claim to reproduce an attested Qin form of 遊.

This is a contemporary bird-worm-inspired design draft. Component references do not authenticate the final stylized forms as historical bird-worm spellings. Artistic transformations should receive a qualified seal-carver's review before being advertised as philologically authoritative. Its intended use is a modern visual identity ornament.

## Research references

1. Han Tianheng, *鳥蟲篆印創作手記*: start from grounded character forms, study composition, abstract animal motifs instead of drawing literal animals; use positive/negative space deliberately. https://www.culturechina.cn/art/281951.html
2. Gu Songzhang, *20世紀的鳥蟲篆印創作*, hosted by Peking University: ornamental construction as a creative method, with individuality in the ornament language. https://shufa.pku.edu.cn/btwf/65982sfw98180.htm
3. *秦漢鳥蟲篆印章藝術芻議*: emphasize selected structural parts rather than uniformly ornamenting every stroke; study the interaction of script and seal composition. https://xmwb.xinmin.cn/lab/xmwb/html/2015-10/18/content_23_1.htm
4. Taiwan Ministry of Education, Dictionary of Chinese Character Variants, 造: https://dict.variants.moe.edu.tw/dictView.jsp?ID=45306
5. Same dictionary, 境: https://dict.variants.moe.edu.tw/dictView.jsp?ID=8384
6. Same dictionary, 成: https://dict.variants.moe.edu.tw/dictView.jsp?ID=16319
7. Same dictionary, 遊: https://dict.variants.moe.edu.tw/dictView.jsp?ID=45434

The downloaded reference images were used for structural study only and are not embedded in any deliverable. The supplied imperial-seal SVG informed the red-field / cut-letter aesthetic only.

## Validation

The final outline SVG was parsed as XML and rendered independently with resvg at 128, 640, and 1200 pixels. Alpha inspection confirms transparent background and cut-out strokes. The rendered large and small previews were visually inspected. The website has not been modified by this standalone lettering task.
