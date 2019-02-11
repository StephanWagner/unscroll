# unscroll

Make your page unscrollable and adjusts content elements to compensate for the missing scrollbar.

## Install

```npm install unscroll```

## Usage

Simply call ```unscroll()``` to make the page unscrollable. When the browser removes the vertical scrollbar, the ```body``` element will be adjusted with a padding to prevent elements from "jumping" to the right.

```<button onclick="unscroll()">Make page unscrollable</button>```

When you have absolute or fixed positioned elements on your page, you might want to add the adjustment to those elements as well. You can pass those elements selectors into unscroll:

```unscroll('#adjust-me-too')```

```unscroll(['#adjust-me-too', '.and-me'])```

By default, unscroll will add the scrollbar width to the right padding of the element. In some cases you might want to use another CSS attribute, like ```right```. To do that, you can pass the elements selector together with the desired attribute:

```unscroll([['#adjust-right-attribute', 'right'], '#adjust-default'])```

To enable scrolling again, use ```unscroll.reset()```.

```<button onclick="unscroll.reset()">Make page scrollable</button>```