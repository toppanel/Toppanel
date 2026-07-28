import hashlib
from pathlib import Path
import fitz

pdf_path = Path(r'D:\TopPannel\탑판넬_카다로그.pdf')
output_dir = Path(r'D:\TopPannel\TOPPANEL_Catalog_Images')
images_dir = output_dir / 'images'
logos_dir = output_dir / 'logos'

images_dir.mkdir(parents=True, exist_ok=True)
logos_dir.mkdir(parents=True, exist_ok=True)

seen = set()
manifest_lines = []
index = 0

doc = fitz.open(pdf_path)
for page_number in range(len(doc)):
    page = doc[page_number]
    for img_number, img in enumerate(page.get_images(full=True), start=1):
        xref = img[0]
        base_image = doc.extract_image(xref)
        md5 = hashlib.md5(base_image['image']).hexdigest()
        if md5 in seen:
            continue
        seen.add(md5)
        pix = fitz.Pixmap(doc, xref)
        if pix.n > 4 or (pix.colorspace and pix.colorspace.name == 'DeviceCMYK'):
            pix = fitz.Pixmap(fitz.csRGB, pix)
        w, h = pix.width, pix.height
        filename = f'catalog_page{page_number+1}_{img_number}_{w}x{h}.png'
        dest = logos_dir / filename if w * h <= 100000 and max(w, h) <= 300 else images_dir / filename
        pix.save(str(dest))
        if hasattr(pix, 'dispose'):
            pix.dispose()
        label = 'logo' if dest.parent == logos_dir else 'image'
        manifest_lines.append(f'{label}\t{page_number+1}\t{img_number}\t{w}x{h}\t{dest.name}')
        index += 1

doc.close()
output_dir.joinpath('manifest.txt').write_text('\n'.join(manifest_lines), encoding='utf-8')
print(f'Extracted {index} unique images to {output_dir}')
