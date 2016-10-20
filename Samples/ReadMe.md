# Moby Dick Sample

Why yet another *Moby Dick* sample? [Blame it on @dauwhe](https://twitter.com/dauwhe/status/717716010325950464).

## Source + Licence

*Moby Dick* base version from [EPUB3 Samples](http://idpf.github.io/epub3-samples/samples.html).

This work is shared with the public using the Attribution-ShareAlike 3.0 Unported (CC BY-SA 3.0) license.

## eBookDys in action

In those two illustrations, left cap is the original CSS, right cap is eBookDys.css overriding it.

Everything isn’t perfect but well, I told you so.

![Chapter 1 with yellow background](https://github.com/JayPanoz/eBookDys/raw/master/Samples/assets/diff1.png)

![Chapter 2 with baseline helper for paragraphs](https://github.com/JayPanoz/eBookDys/raw/master/Samples/assets/diff2.png)

## Notes

- Some specific overrides had to be added in `eBookDys.css` (see comment `/* Specific override for this book */`).
- eBookDys.css is used from “Chapter 1. Loomings.” Table of contents, preface, introduction and epigraph aren’t overriden to show what the original styling looks like.
- eBookDys.js is used in “Chapter 1. Loomings.” It should add a menu with five buttons on load. [Check this demo](https://twitter.com/JiminyPan/status/789195541368320001).
- The iBooks meta `specified-fonts` has been added to the OPF.
- This sample doesn’t provide with all elements eBookDys.css supports (`table`, `blockquote`, `dl`, `hr`, `abbr`, etc.).
- Baseline helper doesn’t make miracles in paginated environments so if you’ve got any solution, pull request and chill.
