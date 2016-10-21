# eBookDys.css

The aim of this repo is to provide a simple eBook stylesheet which follows the best practices regarding styles for dyslexia. Please note I am by no means what you would call an expert, I’m just trying to help and make a positive impact.

Let’s hope it shakes people a little bit so that we don’t just embed dedicated typefaces in Reading Systems and call the job done. Hopefully, it will also offer a sensible starting point for people to whom it might be useful.

You are warmly invited to give feedback.

## eBookDys.js

Since adding/removing classes manually might be a chore in some cases, a script adding a menu in the book (before the first heading) is currently being developed. 

This menu is made of settings which are automatically applied and stored for later retrieving.

### Settings to be implemented

Implementation is not guaranteed since we must deal with quite a lot of complex issues.

- background color
- reading rule
- letter/word spacing
- show/hide images

Besides, we might provide a function to append the stylesheet automatically so that you don’t need to do it by hand.

## Licence

All files available in this repo—excepted the EPUB sample—are licensed under [Creative Commons Zero](https://creativecommons.org/publicdomain/zero/1.0/deed.en), which means you can copy, modify, distribute and use them for free, including commercial purposes, without asking permission or providing attribution.

## How to

You can either add the stylesheet or both the stylesheet and the script. Please note support for JavaScript is optional and the script will consequently not work in some Reading Systems (e.g. Kindle, RMSDK < 11, etc.)

### Stylesheet

Just add this stylesheet in your eBook. It was designed to override the stylesheets that are already present in the file. However, given the state of eBook Production, it is quite impossible to override anything in the best conditions (e.g. unsemantic markup).

In the manifest (`.opf`), add 

```
<item id="css-dys" href="path/to/eBookDys.css" media-type="text/css"/>
```

Then, in each XHTML file, add

```
<link rel="stylesheet" href="path/to/eBookDys.css" type="text/css"/>
```

in `<head>`.

### JavaScript

In the manifest (`.opf`), add 

```
<item id="js-dys" href="path/to/eBookDys.js" media-type="text/javascript"/>
```

Then, for each XHTML file, add

```
properties="scripted"
```

For instance

```
<item id="c01" href="chapter_001.xhtml" media-type="application/xhtml+xml" properties="scripted"/>
```

Finally, in each XHTML file, add

```
<script type="text/javascript" src="path/to/eBookDys.js"></script>
```

in `<head>`.

### Note

In practice, eBookDys.css and eBookDys.js will work even if you don’t reference them in the manifest (`.opf`). But your eBook won’t be valid if you don’t so some utilities might not package it.

Anyone willing to build a script/an app to automate the whole process (adding files in `<head>` then modifying the manifest) is warmly welcome. Indeed, from experience, the “manifest part” of this process can be a barrier to entry for a lot of users.

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
- eBookDys.js
- ~~lake placid blue and pink backgrounds~~
- ~~a horizontal line to show text’s baseline may help some~~

## Useful resources 

### Typefaces (fonts)
- [Microsoft Fluent Calibri and Sitka typefaces](https://www.microsoft.com/en-us/download/details.aspx?id=50721)
- [Open Dyslexic typeface](http://opendyslexic.org)

### Official Resources

- [Microsoft Accessibility Blog](https://blogs.msdn.microsoft.com/accessibility/)
- [Apple’s Accessibility Resources](http://www.apple.com/accessibility/resources/)
- [The A11y Project — Resources](http://a11yproject.com/resources.html)
- [Android Developers Accessibility](http://developer.android.com/design/patterns/accessibility.html)

### EPUB

- [EPUB 3 Accessibility Guidelines](http://www.idpf.org/accessibility/guidelines/)
- [Gist — Complete list of EPUB 3 a11y metadata (opf)](https://gist.github.com/JayPanoz/19d105d90cc62d09ae8b)
