# RowScroll

Super tiny (&lt;1kb) jQuery plugin script that automatically scrolls visitors up and down your page when they use their mouse scroll wheels, laptop track pads, and finger swipes on touch devices.

## Dependencies

RowScroll relies on <a href="//code.jquery.com/jquery-1.11.3.min.js" target="_blank">jQuery</a> and the <a href="//cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js" target="_blank">jQuery Mousewheel plugin</a> to be loaded before it. Both are available via CDN or as downloadable files.

    <script src="http://code.jquery.com/jquery-1.11.3.min.js"></script>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js"></script>
    <script src="your/path/to/rowScroll.min.js"></script>

## Usage

Add a `scroll-target` class to every row container you want to be auto-scrolled to. The row containers can be anything: `div`s, `section`s, doesn't matter.

Heights can vary, too. Can be full-window (100vh) or fixed pixel heights, or unspecified. And they don't all have to be the same, they can be whatever.

## Browser Support

Tested on Chrome (Mac and Windows), Firefox (Mac and Windows), IE9/10/11 (Windows), and Safari (Mac). Works on all.

Doesn't work on IE8, but doesn't cause problems either. Just doesn't auto-scroll.

