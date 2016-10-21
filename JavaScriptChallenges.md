# Javascript issues and challenges

The issues facing eBookDys.js are numerous and multifaceted. It is being developed in a hostile and often dangerous environment since we have to deal with how Reading Systems work (on top of rendering engines).

## Approach

> First build it, then improve it (maybe) then let hardcore Javascripters make it more elegant.

What we’re currently building is a MVP. It should be understandable as non-JavaScripters are likely to use it (teachers, parents, readers, etc.).

Once everything is built and working, then we’ll improve it.

## Pagination 

First and foremost, we must deal with pagination implementations. This is the biggest challenge to tackle.

Settings impacted:

- background color;
- reading rule;
- letter/word spacing;
- show/hide images.

Yep, that’s right, all settings are impacted. 👍 

Sometimes content is loaded in an `iframe`, which means you can’t apply a background-color to parts of the UI. Sometimes pagination is using columns or funny positioning, which means you must normalize some methods, etc.

As for “letter/word spacing” and “show/hide images”, we must find a way to force pagination recalc. For your information, a function like

```
BKDOMCleanup._forceStyleRecalc = function() {
    // force a style recalc
    var styleElement = document.createElement("style");
    styleElement.appendChild(document.createTextNode("*{}"));
    document.body.appendChild(styleElement);
    document.body.removeChild(styleElement);
    
    var waitForLayoutToFinish = document.body.offsetTop;
}
```

doesn’t work.

## Compatibility with Reading Systems

As regards native settings, the challenge only applies to background color as Reading Systems already ship with some. Since we don’t have any API, we obviously can’t load buttons conditionally. And checking for the current background color would have a huge performance impact. Besides, if the user changes background-color, it might disable our additional settings, like in iBooks.

As regards everything else, RS might be using `id`, `class` and custom attributes. While `data-attr` is discouraged for styling, it is the simplest solution to this evolving problem.

## UI/UX

Since we have to add those settings in the DOM, we must find a way to embed it elegantly (pop-up?). Storing settings for later retrieving is also a must since we don’t want the reader to re-apply his settings every chapter.

Also, we must provide users with a reset.

Finally, we must avoid firing the Reading System’s UI, as is sometimes the case when a button is clicked.

## Storage

DOM storage (`localStorage`) is the way to go but some RS doesn’t necessarily enable it. So we need a fallback (cookie).

## Performance

We’ve got a tight performance budget since we’re building our script on top of the RS’. Vanilla JS is a must, we must avoid plugins of all trades and focus on efficiency whenever possible.

## Customizability

Some users might want to change values at some point (colors, rule thickness, spacing, images to show/hide, etc.).  Customization must therefore be easy. 