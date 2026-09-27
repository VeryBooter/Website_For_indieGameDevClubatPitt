from pathlib import Path
import sys, math, re
import xml.etree.ElementTree as ET
sys.path.insert(0, '/tmp/pitt-seal-tools')
from svgpathtools import parse_path, Line
from shapely.geometry import Polygon, Point, LineString, box
from shapely import affinity
from shapely.ops import unary_union
OUT = Path(__file__).parent
master = OUT/'zaojing-chengyou-editable.svg'
root = ET.parse(master).getroot()
ns = '{http://www.w3.org/2000/svg}'

def shape(element):
    tag=element.tag.replace(ns,'')
    if tag=='circle': return Point(float(element.get('cx','0')),float(element.get('cy','0'))).buffer(float(element.get('r')),resolution=24)
    if tag=='rect': return box(float(element.get('x','0')),float(element.get('y','0')),float(element.get('x','0'))+float(element.get('width')),float(element.get('y','0'))+float(element.get('height')))
    if tag!='path': return None
    d=parse_path(element.get('d'))
    paths=[]
    for sub in d.continuous_subpaths():
        pts=[]
        for segment in sub:
            steps=1 if isinstance(segment,Line) else max(6,math.ceil(segment.length()/1.1))
            pts.extend((segment.point(i/steps).real, segment.point(i/steps).imag) for i in range(steps))
        pts.append((sub.end.real,sub.end.imag))
        if element.get('fill')=='none':
            paths.append(LineString(pts).buffer(float(element.get('stroke-width','1'))/2,cap_style=1,join_style=1,resolution=12))
        else: paths.append(Polygon(pts).buffer(0))
    return unary_union(paths)

def transform(geometry,t):
    # SVG transform lists compose right-to-left.
    for name,raw in reversed(re.findall(r'(translate|scale)\(([^)]*)\)',t)):
        vals=[float(v) for v in re.split(r'[ ,]+',raw.strip())]
        if name=='translate': geometry=affinity.translate(geometry,vals[0],vals[1] if len(vals)>1 else 0)
        else: geometry=affinity.scale(geometry,vals[0],vals[1] if len(vals)>1 else vals[0],origin=(0,0))
    return geometry
mask=box(0,0,640,640)

def walk(element,transforms=(),inherited_fill='black'):
    global mask
    chain=transforms+(element.get('transform',''),)
    fill=element.get('fill',inherited_fill)
    geom=shape(element)
    if geom is not None:
        for t in reversed(chain): geom=transform(geom,t)
        color=element.get('stroke') if fill=='none' else fill
        mask=mask.difference(geom) if color=='black' else mask.union(geom)
    for child in element: walk(child,chain,fill)
for el in root.find(f'{ns}defs/{ns}mask'): walk(el)
ink=root.find(f'{ns}path')
result=shape(ink).intersection(mask).simplify(.035,preserve_topology=True)

def ring(coords):
    seq=list(coords)
    return 'M'+' '.join(f'{x:.2f},{y:.2f}' for x,y in seq[:-1])+'Z'
polygons=list(result.geoms) if result.geom_type=='MultiPolygon' else [result]
paths=[]
for i,poly in enumerate(polygons):
    d=ring(poly.exterior.coords)+''.join(ring(r.coords) for r in poly.interiors)
    paths.append(f'<path id="ink-{i+1}" d="{d}"/>')
svg='''<svg xmlns="http://www.w3.org/2000/svg" width="640" height="640" viewBox="0 0 640 640" role="img" aria-labelledby="title description">
<title id="title">造境成遊 — 鳥蟲篆風格方印</title>
<desc id="description">Contemporary bird-worm-inspired lettering. Read 造境 down the right column, then 成遊 down the left. Original design study, not an authenticated ancient inscription. Transparent cutout strokes; no font dependencies.</desc>
<g id="seal-ink" fill="#a42e28" fill-rule="evenodd">
'''+ '\n'.join(paths)+'\n</g>\n</svg>\n'
(OUT/'zaojing-chengyou-birdworm.svg').write_text(svg)
print(f'Exported {len(polygons)} ink outlines, {len(svg):,} bytes. Geometry valid: {result.is_valid}')
