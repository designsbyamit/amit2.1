"""Builds 1200x630 share images into public/og/. Re-run after covers change: python3 tools/seo/og.py"""
from PIL import Image, ImageDraw
import os
R='public/images'; O='public/og'; os.makedirs(O,exist_ok=True)
W,H=1200,630
def fit(im):
    s=max(W/im.width,H/im.height); im=im.resize((round(im.width*s),round(im.height*s)),Image.LANCZOS)
    x=(im.width-W)//2; y=(im.height-H)//2; return im.crop((x,y,x+W,y+H))
for n in ['airline-app','data-ai','dnetworx','engaze','sap-agentic','sap-search']:
    fit(Image.open(f'{R}/covers/{n}-1600.webp').convert('RGB')).save(f'{O}/{n}.jpg',quality=86,optimize=True)
# Home: portrait on the right of a dark panel
bg=Image.new('RGB',(W,H),(15,16,19)); p=Image.open(f'{R}/about/amit-hero-bw.webp').convert('RGB')
s=H/p.height; p=p.resize((round(p.width*s),H),Image.LANCZOS); bg.paste(p,(W-p.width,0))
d=ImageDraw.Draw(bg)
for x in range(0,W-p.width+300):  # soft fade between panel and photo
    pass
bg.save(f'{O}/home.jpg',quality=88,optimize=True)
