# Image Upload Template

Use this template when adding new product images.

## Folder structure

- /images/products/cubicle/<model-slug>/ — split by model type (see below), not flat
- /images/products/accessible/
- /images/products/glass/
- /images/products/changing-room/
- /images/products/lower-cabinet/
- /images/products/wall-panel/
- /images/projects/
- /images/brand/
- /images/hero/

Cubicle has far more model types and photos than the other categories,
so its files live one level deeper — a subfolder per model slug — to
stay manageable at scale:

- /images/products/cubicle/basic/
- /images/products/cubicle/design/
- /images/products/cubicle/kids/
- /images/products/cubicle/metal/
- /images/products/cubicle/metro/
- /images/products/cubicle/ordermade/
- /images/products/cubicle/stainless/
- /images/products/cubicle/urinal/

Adding a new cubicle model type? Create its subfolder here and add a
matching entry in the `models` array in `src/lib/products.ts`.

## Recommended naming pattern

- lowercase only
- use hyphens instead of spaces
- use descriptive, category-based names

## Product image examples

### Cubicle

- cubicle/stainless/cubicle-stainless-01.jpg
- cubicle/stainless/cubicle-stainless-02.jpg
- cubicle/kids/cubicle-kids-01.jpg
- cubicle/kids/cubicle-kids-02.jpg
- cubicle/metro/cubicle-metro-01.jpg
- cubicle/basic/cubicle-basic-01.jpg
- cubicle/design/cubicle-design-01.jpg
- cubicle/urinal/cubicle-urinal-01.jpg

### Accessible

- accessible-sliding-01.jpg
- accessible-sliding-02.jpg
- accessible-double-sliding-01.jpg
- accessible-folding-01.jpg
- accessible-auto-door-01.jpg

### Glass

- glass-partition-01.jpg
- glass-partition-02.jpg
- glass-shower-partition-01.jpg
- glass-shower-booth-01.jpg
- glass-transparent-01.jpg

### Changing room

- changing-room-01.jpg
- changing-room-02.jpg
- changing-room-locker-01.jpg
- changing-room-shower-01.jpg

### Lower cabinet

- lower-cabinet-01.jpg
- lower-cabinet-02.jpg
- lower-cabinet-sink-01.jpg
- lower-cabinet-detail-01.jpg

### Wall panel

- wall-panel-01.jpg
- wall-panel-02.jpg
- wall-panel-texture-01.jpg
- wall-panel-smart-board-01.jpg

## Upload checklist

- [ ] File is saved in the correct folder
- [ ] File name follows the naming pattern
- [ ] Image size is reasonable for web use
- [ ] Image is optimized for web
- [ ] Product category matches the folder
- [ ] Filename is unique and not duplicated
- [ ] Path is updated in the product data if needed
