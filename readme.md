# eBookDys.css

The aim of this repo is to provide a simple eBook stylesheet which follows the best practices regarding styles for dyslexia. Please note I am by no means what you would call an expert, I’m just trying to help and make positive stuff.

Let’s hope it shakes people a little bit so that we don’t just embed dedicated typefaces in Reading Systems and call the job done. Hopefully, it will also offer a sensible starting point for people to whom it might be useful.

You are warmly welcomed to give feedback.

## Licence

All files available in this repo are licensed under [Creative Commons Zero](https://creativecommons.org/publicdomain/zero/1.0/deed.en), which means you can copy, modify, distribute and use them for free, including commercial purposes, without asking permission from or providing attribution to me.

## How to

Just add this stylesheet in an eBook. It was designed to override the stylesheets that are already present in the file. However, given the state of eBook Production, it is quite impossible to override anything in the best conditions (e.g. unsemantic markup).

## Sources

- [British Dyslexia Association](http://www.bdadyslexia.org.uk/common/ckeditor/filemanager/userfiles/About_Us/policies/Dyslexia_Style_Guide.pdf)
- [Typography Guru](http://typography.guru/journal/letters-symbols-misrecognition/)
- [PNAS](http://www.pnas.org/content/109/28/11455.short)
- [James Jackson, Michigan State University](http://fr.slideshare.net/mobile/Jamesedjac/towards-universally-accessible-typography-a-review-of-research-on-dyslexia)

## Abstract

To sum things up:

- Trebuchet MS is the default typeface (it seems it is one of the dyslexic readers’ favorite).
- text is left-aligned, without hyphens.
- italics are styled as bold.
- we try to override drop caps.
- headings in bigger `font-size` + bold + lowercase.
- block paragraphs (no indent, top margin).
- larger `line-height` (1.75).
- yellow and mint green are provided as classes for body if needed.
- a border is declared for `aside`.
- the title of `abbr` is displayed between parentheses after the term.
- the `vertical-align` for `sub/sup` is set to baseline.
- since decorative images may interfere, we try to hide them.

## To do

- `letter-` and `word-spacing`
- a horizontal line to show text’s baseline may help some