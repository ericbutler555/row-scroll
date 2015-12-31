# RowScroll

Super tiny (`<`1kb) jQuery plugin script that automatically scrolls visitors up and down to different vertical sections of your webpage when they use their mouse scroll wheels, track pads, and finger swipes on touch devices.

## License

RowScroll is completely free for personal and commercial end-use, and licensed under the GNU General Public License version 2.

## Dependencies

RowScroll relies on [jQuery](http://code.jquery.com/jquery-1.11.3.min.js) and the [jQuery Mousewheel plugin](http://cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js) to be loaded before it. Both are available via CDN or as downloadable files.

    <script src="http://code.jquery.com/jquery-1.11.3.min.js"></script>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js"></script>
    <script src="your/path/to/rowScroll.min.js"></script>

## Usage

Just add a `scroll-target` class to every row/container element you want to be in the auto-scroll sequence. The containers can be anything: `div`s, `section`s, doesn't matter.

Heights can vary, too. Can be full-window (100vh) or a fixed pixel height, or unspecified. And they don't all have to be the same height, they can be whatever.

## Customize

There are 3 customizable properties:

**Scroll Targets**
Default: `.scroll-target`
This is the jQuery selector ( example: `$('.scroll-target')` ) that will target all of the elements to be in the auto-scroll sequence.

**Scroll Speed**
Default: `400` (milliseconds)
If you want the auto-scrolling to be faster, decrease this number (try `200`). If you want the auto-scrolling to be slower, increase it (try `1000`).

**Wiggle Room**
Default: `10` (pixels)
This is less obvious, but what I noticed about other auto-scroller scripts is that they sometimes didn't work, because different browsers's (mainly Firefox's) calculations of where a container started were a little bit off. If you find that your scrolls stop working after the first (or any) scroll instance, try increasing this value and see if that fixes it.


## Browser Support

Tested on Chrome (Mac and Windows), Firefox (Mac and Windows), IE9/10/11 (Windows), Safari (Mac), and Opera (Windows). Works on all.

Doesn't work on IE8, but doesn't cause problems either. Just doesn't auto-scroll.
