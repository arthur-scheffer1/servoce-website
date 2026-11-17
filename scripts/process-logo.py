# Gera versões da logo a partir do JPG original (fundo azul).
from PIL import Image, ImageFilter
import sys, os
src = sys.argv[1]; out = sys.argv[2]
os.makedirs(out, exist_ok=True)
im = Image.open(src).convert("RGB")
W, H = im.size
px = im.load()
# cor de fundo: média dos cantos
corners = [px[5,5], px[W-6,5], px[5,H-6], px[W-6,H-6]]
bg = tuple(sum(c[i] for c in corners)//4 for i in range(3))
print("size", W, H, "bg", bg)

def extract(target=None):
    o = Image.new("RGBA", (W, H))
    op = o.load()
    for y in range(H):
        for x in range(W):
            r,g,b = px[x,y]
            a = (r - bg[0]) / (255 - bg[0])
            a = max(0.0, min(1.0, a))
            if a < 0.04:
                op[x,y] = (0,0,0,0); continue
            fg = [ (c - (1-a)*bc)/a for c,bc in zip((r,g,b), bg) ]
            fg = [max(0,min(255,v)) for v in fg]
            if target:
                # quanto do pixel é "branco" (vs. amarelo): canal azul alto
                w = max(0.0, min(1.0, (fg[2]-90)/140))
                fg = [fg[i]*(1-w) + target[i]*w for i in range(3)]
            op[x,y] = (int(fg[0]),int(fg[1]),int(fg[2]),int(a*255))
    return o

white = extract()
blue = extract((14, 104, 168))
# remove a ponta do "V" que invade a área do símbolo
for img in (white, blue):
    ip = img.load()
    for y in range(300, 425):
        for x in range(1000, 1205):
            ip[x,y] = (0,0,0,0)
# recortes (coordenadas da imagem 1420x1108)
full_box = (150, 225, 1340, 870)     # wordmark + símbolo + "Clínica de Psicologia Integrada"
mark_box = (1005, 310, 1335, 745)     # cérebro, flores e borboleta
for name, img in (("white", white), ("blue", blue)):
    bb = img.crop(full_box); bb = bb.crop(bb.getbbox()); bb.save(f"{out}/logo-{name}.png", optimize=True)
    mk = img.crop(mark_box); mk = mk.crop(mk.getbbox()); mk.save(f"{out}/simbolo-{name}.png", optimize=True)
# imagem de compartilhamento 1200x630 com fundo azul
og = Image.new("RGB", (1200, 630), bg)
lg = white.crop(full_box); lg = lg.crop(lg.getbbox())
lg.thumbnail((1000, 520), Image.LANCZOS)
og.paste(lg, ((1200-lg.width)//2, (630-lg.height)//2), lg)
og.save(f"{out}/og.jpg", quality=88)
# ícone: símbolo branco sobre azul
ic = Image.new("RGB", (512, 512), bg)
mk = white.crop(mark_box); mk = mk.crop(mk.getbbox()); mk.thumbnail((400, 400), Image.LANCZOS)
ic.paste(mk, ((512-mk.width)//2, (512-mk.height)//2), mk)
ic.save(f"{out}/icon.png")
im.save(f"{out}/logo-original.jpg", quality=90)
print("ok")
