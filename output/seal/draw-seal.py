from pathlib import Path
from xml.sax.saxutils import escape

OUT = Path(__file__).parent
# Original vector drawing. Coordinates describe lettering, not embedded font glyphs.
# White seal script is cut out through a luminance mask; the paper remains transparent.

def path(d, w=12):
    return f'<path d="{d}" fill="none" stroke="black" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round"/>'
def eye(x,y,r=4):
    return f'<circle cx="{x}" cy="{y}" r="{r}" fill="white"/>'
def bird(x,y,flip=False):
    # A head grows from a stroke terminal; eye is an island of ink within the cut.
    t = f'translate({x} {y})' + (' scale(-1 1)' if flip else '')
    return f'<g transform="{t}"><path d="M-6 18C-17 9-17-6-5-12C7-18 20-11 19-1C22 1 27 0 30-3C28 5 22 9 15 9C12 20 1 27-6 18Z" fill="black"/><circle cx="4" cy="0" r="3.4" fill="white"/></g>'
def grp(id,label,x,y,parts):
    return f'<g id="{id}" aria-label="{escape(label)}" transform="translate({x} {y}) scale(1.12)">\n'+'\n'.join(parts)+'\n</g>'

# 成: 戊 surrounds the internal 丁. A long curved diagonal acts as the bird's body.
cheng = [
    path('M34 73C64 65 99 67 127 67C170 67 205 66 235 57'),
    path('M39 46C46 71 44 112 40 143C37 170 30 201 15 228'),
    path('M28 46C18 47 12 34 19 25C28 13 46 16 51 27C57 38 51 49 40 53',9),
    eye(32,31,3.5),
    path('M141 17C146 48 141 84 149 120C157 157 173 204 204 227C219 239 239 234 242 218C245 205 235 194 225 196C215 198 213 209 220 214',13),
    path('M145 32C169 32 179 23 181 11',10),
    path('M228 98C215 128 189 148 169 162C143 180 112 197 79 219',12),
    path('M215 99C207 87 214 77 226 79C237 81 242 90 237 99',9),
    eye(226,89,3),
    path('M70 104C82 102 105 102 117 105C124 129 121 165 115 188C109 209 107 229 112 243',12),
    path('M70 103C64 134 65 161 61 185C59 199 52 209 46 217',10),
    path('M72 157C83 160 101 158 120 153',9),
    path('M147 178C141 198 146 223 156 237',8),
    path('M171 216C168 228 174 243 188 245',7),
    bird(205,26),
    path('M196 40C188 47 179 49 171 48',7),
    path('M78 28C95 16 109 19 111 32C113 43 99 48 88 42C79 37 72 40 69 47',8),
]
# 造: 辵 on the left and beneath; 告 retains its upright, crossbar, and enclosed mouth.
zao = [
    path('M41 15C42 37 29 43 11 50',11),
    path('M45 49C47 69 28 78 12 83',11),
    path('M47 84C48 105 28 112 11 119',11),
    path('M45 114C57 134 55 162 45 182C39 194 35 207 41 223C66 244 129 231 167 237C193 241 227 241 243 227',13),
    path('M17 145C12 169 12 208 19 226C23 237 30 242 43 243',10),
    path('M61 128C70 142 73 159 68 171C63 183 61 195 65 205',8),
    path('M165 18C163 46 164 91 164 126',12),
    path('M111 22C107 42 108 56 119 61C142 69 192 68 211 58C224 51 222 33 222 20',12),
    path('M96 102C131 96 200 96 237 101',12),
    path('M115 134C141 129 195 131 220 135C226 150 226 176 218 192C187 201 137 199 113 192C106 176 107 149 115 134Z',12),
    path('M99 145C87 153 86 174 94 188',7),
    path('M122 214C147 205 178 214 197 215C214 216 231 207 240 193',8),
    bird(164,18),
    bird(228,20,True),
    path('M193 145C181 155 180 173 191 179C202 186 214 172 206 162C201 156 195 158 193 163',7),
    path('M83 24C75 34 77 49 83 57C92 71 87 82 74 90',7),
]
# 境: 土 remains on the left. 竟 on the right has its top, enclosed centre and two feet.
jing = [
    path('M42 17C45 68 43 141 43 208',13),
    path('M15 93C30 84 60 84 74 93',12),
    path('M11 214C27 220 58 217 76 208',12),
    bird(42,21),
    path('M16 121C28 124 28 139 21 149C13 160 15 177 24 183',7),
    path('M61 120C70 130 70 148 63 156C56 165 60 181 70 185',7),
    path('M174 10L174 38',12),
    path('M97 45C124 35 209 37 243 45',12),
    path('M108 59C111 77 127 86 147 89',11),
    path('M231 59C228 77 212 87 192 89',11),
    path('M91 102C122 94 214 94 246 102',12),
    path('M115 121C135 116 207 117 225 123C232 135 232 160 224 173C207 181 132 180 115 173C107 162 107 134 115 121Z',12),
    path('M115 147C146 142 199 144 226 147',10),
    path('M153 184C151 204 134 221 117 236C105 247 90 244 87 232C85 222 92 212 101 214',12),
    path('M190 185C189 207 192 228 213 236C228 243 242 235 242 222C242 211 230 206 224 216',12),
    path('M143 61C145 70 151 74 158 74',7),
    path('M205 62C204 68 196 75 189 76',7),
    bird(174,14),
    path('M157 217C161 231 159 242 148 245',7),
    path('M197 241C182 236 174 226 175 214',7),
]
# 遊: a modern seal-style treatment of 辵 + 斿 (flag and child), per the dictionary note.
you = [
    path('M31 15C35 34 24 44 10 49',10),
    path('M34 52C39 71 24 81 10 88',10),
    path('M36 92C42 108 27 116 13 125',10),
    path('M37 127C52 146 49 168 39 186C31 199 32 219 51 229C78 244 120 231 158 235C193 239 221 246 243 228',12),
    path('M14 151C9 175 12 207 21 221',9),
    path('M90 14C89 33 87 62 88 87C91 119 87 156 69 190',11),
    path('M57 52C77 44 113 47 138 52',11),
    path('M89 80C103 76 121 80 127 89C136 116 133 157 121 183C115 197 101 205 91 196C82 188 90 177 99 181',11),
    path('M97 112C107 114 121 112 129 105',7),
    path('M167 17C160 32 150 46 141 58',10),
    path('M157 39C180 33 216 35 240 40',11),
    path('M174 60C196 66 216 66 237 58',9),
    path('M189 84C174 81 162 89 164 103C166 117 189 122 205 113C222 103 213 86 198 83Z',11),
    path('M193 119C193 139 196 162 190 182C185 196 173 205 161 197C150 190 154 179 164 178',11),
    path('M149 144C170 148 213 150 238 140',11),
    path('M225 161C234 173 233 192 222 201C212 209 197 211 184 214',8),
    bird(90,16),
    bird(236,41,True),
    path('M64 105C60 124 64 138 71 148',7),
]

glyphs = [grp('glyph-zao','造：右上',323,31,zao),grp('glyph-jing','境：右下',323,323,jing),grp('glyph-cheng','成：左上',31,31,cheng),grp('glyph-you','遊：左下',31,323,you)]
outer='M19 15C110 13 192 17 270 15L387 14 508 16 620 14L622 117 620 240 624 356 621 459 623 622L500 621 385 624 263 620 145 623 16 620L17 498 14 394 17 268 15 152Z'
# Hairline chips in the rim, intentionally few so small-size display stays coherent.
chips='''<g fill="black"><path d="M15 122l15 5-14 7Z"/><path d="M279 13l4 13 6-12Z"/><path d="M620 420l-11 5 13 7Z"/><path d="M100 622l5-12 7 12Z"/><path d="M484 621l4-9 6 10Z"/></g>'''
svg='''<svg xmlns="http://www.w3.org/2000/svg" width="640" height="640" viewBox="0 0 640 640" role="img" aria-labelledby="seal-title seal-desc">
<title id="seal-title">造境成遊 — 鳥蟲篆風格方印</title>
<desc id="seal-desc">Original contemporary bird-worm-inspired seal lettering, not an ancient facsimile or an authenticated historical spelling. Read top-to-bottom in the right column (造境), then the left column (成遊). Red ink with transparent cut-out strokes. Each character is an editable named vector group.</desc>
<metadata>Designed for the Indie Game Dev Club at Pitt, 2026-09-27. See README.md for sources, construction notes, and limits of the lettering study.</metadata>
<defs><mask id="cut-lettering" x="0" y="0" width="640" height="640" maskUnits="userSpaceOnUse" style="mask-type:luminance"><rect width="640" height="640" fill="white"/>
'''+ '\n'.join(glyphs)+chips+'''</mask></defs>
<path id="seal-ink" fill="#a42e28" d="'''+outer+'''" mask="url(#cut-lettering)"/>
</svg>\n'''
(OUT/'zaojing-chengyou-editable.svg').write_text(svg)
print('Created editable seal SVG.')
