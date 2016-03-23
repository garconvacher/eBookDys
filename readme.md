# eBookDys.css

The aim of this repo is to provide a simple eBook stylesheet which follows the best practices regarding styles for dyslexia. Please note I am by no means what you would call an expert, I’m just trying to help and make a positive impact.

Let’s hope it shakes people a little bit so that we don’t just embed dedicated typefaces in Reading Systems and call the job done. Hopefully, it will also offer a sensible starting point for people to whom it might be useful.

You are warmly invited to give feedback.

## Licence

All files available in this repo are licensed under [Creative Commons Zero](https://creativecommons.org/publicdomain/zero/1.0/deed.en), which means you can copy, modify, distribute and use them for free, including commercial purposes, without asking permission or providing attribution.

## How to

Just add this stylesheet in your eBook. It was designed to override the stylesheets that are already present in the file. However, given the state of eBook Production, it is quite impossible to override anything in the best conditions (e.g. unsemantic markup).

## Sources

- [British Dyslexia Association](http://www.bdadyslexia.org.uk/common/ckeditor/filemanager/userfiles/About_Us/policies/Dyslexia_Style_Guide.pdf)
- [Typography Guru](http://typography.guru/journal/letters-symbols-misrecognition/)
- [PNAS](http://www.pnas.org/content/109/28/11455.short)
- [James Jackson, Michigan State University](http://fr.slideshare.net/mobile/Jamesedjac/towards-universally-accessible-typography-a-review-of-research-on-dyslexia)

## Abstract

- Trebuchet MS is the default typeface (it seems to be one of the dys readers’ favorites).
- Text is left-aligned, without hyphens.
- Italics are styled as bold. **(to confirm)**
- We try to override drop caps.
- Headings in bigger `font-size` + bold + lowercase.
- Block paragraphs (no indent, top margin).
- Larger `line-height` (1.75).
- Yellow, mint, blue and pink backgrounds are provided as classes for body if needed.
- A baseline grid can be added using class `.baseline` to body.
- A border is declared for `aside`.
- The title of `abbr` is displayed between parentheses. **(to confirm)**
- The `vertical-align` for `sub/sup` is set to baseline. **(to confirm)**
- Since decorative images may interfere, we try to hide them. **(to confirm or make functional `body` class)**

## To do

- `letter-` and `word-spacing` (gah, weird bug in webkit)
- ~~lake placid blue and pink backgrounds~~
- ~~a horizontal line to show text’s baseline may help some~~

## Useful resources 

- [Microsoft Fluent Calibri and Sitka typefaces](https://www.microsoft.com/en-us/download/details.aspx?id=50721)
- [Open Dyslexic typeface](http://opendyslexic.org)
- [Complete list of EPUB 3 a11y metadata (opf)](https://gist.github.com/JayPanoz/19d105d90cc62d09ae8b)
