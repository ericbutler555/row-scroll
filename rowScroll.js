/* RowScroll 1.1 copyright 2015 Eric Butler, licensed under GNU GPLv2, free for personal and commercial use */


// add easing function:
$.extend($.easing,{easey:function(n,e,i,u,s){return-u*(e/=s)*(e-2)+i}});


$(window).on('load', function(){

  var scrollTargets = $('.scroll-target'), // selectors to include in the auto-scroll sequence
      scrollTops = [],
      wiggleRoom = 10, // amount of px to add to/subtract from scroll tops when evaluating where to scroll to
      scrollSpeed = 400, // amount of milliseconds to take to get to the next/previous scroll target
      totalScrollTargets = scrollTargets.length, // get total count of how many scroll targets there are
      lasttm; // used in touchmove event handler


  // on page load, get a list of all divs with a "scroll-target" class, and their scroll-to locations
  function getScrollTops () {
    scrollTargets.each(function(){
      scrollTops.push( Math.ceil( $(this).offset().top ) );
    }); // end each
  } // end getScrollTops function definition


  function autoScrollTo (targetEl) {
    // animate the window's scrollTop to the top of the target element
    $('html, body')
      .stop(true, false)
      .animate(
        { scrollTop: $(targetEl).offset().top }, // move window so target element is at top of window
        scrollSpeed, // speed in milliseconds
        'easey' // easing
      ); // end animate
  } // end autoScrollTo function definition


  function processScroll (e) {

    // detect the current scroll top amount
    var scrollPosition = $(window).scrollTop();

    // determine the scroll direction
    if ( e.deltaY > 0 ) { var scrollDirection = 'up'; }
    else if ( e.deltaY <= 0 ) { var scrollDirection = 'down'; }

    // if the scroll is downward,
    if (scrollDirection == 'down') {

      // compare all the scroll targets's scrollTops to the current scroll position
      for ( var i = 0; i < totalScrollTargets; i++ ) {

        // if the current scroll position is between the top offsets of this and the next div
        if ( scrollPosition >= (scrollTops[i] - wiggleRoom) && scrollPosition < (scrollTops[i+1] - wiggleRoom) ) {

          // auto-scroll to the i+1 (the next) div's offset top
          autoScrollTo(scrollTargets[i+1]);

          break; // stop looping

        } // end if

      } // end for

    } // end if scrollDirection is down


    // else if the scroll is upward,
    else if (scrollDirection == 'up') {

      for ( var i = 0; i < totalScrollTargets; i++ ) {

        // if the current scroll position is less than or equal to the next div's top offset AND greater than the current div's top offset
        if ( scrollPosition <= (scrollTops[i+1] + wiggleRoom) && scrollPosition > (scrollTops[i] + wiggleRoom) ) {

          autoScrollTo(scrollTargets[i]);

          break;

        } // end if

      } // end for

    } // end else if scrollDirection is up

    return false;

  } // end processScroll function definition


  // only proceed if there are some scroll targets on the page
  if ( totalScrollTargets > 0 ) {

    getScrollTops();


    // re-get the list if the window size changes
    $(window).on('resize', function(){
      // delete the existing scroll-to locations
      scrollTops.length = 0;
      // get a fresh list of all the scroll-to locations
      getScrollTops();
    });


    // handle a mousewheel or trackpad scroll
    $(window).on('mousewheel', function (e) {
      e.preventDefault();
      processScroll(e);
    }); // end mousewheel


    // detect the touchstart x- and y-value
    $(window).on('touchstart', function (e) {
      ts = e.originalEvent.touches[0].clientY;
      tsX = e.originalEvent.touches[0].clientX;
    }); // end on touchstart


    // detect the touchmove y-values and maybe hijack vertical scrolling
    $(window).on('touchmove', function (e) {
      tm = e.originalEvent.changedTouches[0].clientY;
      // if this is the first touchmove event, or
      // if there's been over 5px of vertical movement since the last event,
      // prevent page scroll
      // (the 5px ensures that users can still scroll horizontally)
      if ( typeof lasttm === 'undefined' || Math.abs(lasttm - tm) > 5 ) {
        e.preventDefault(); // prevent page scroll
      } // end if
      lasttm = tm; // remember what this touchmove's y-value is, for next time
    }); // end on touchmove


    // detect the touchend x- and y-value and handle a mobile swipe
    // (the 50px ensures that horizontal scrolls don't accidentally trigger the processScroll function)
    $(window).on('touchend', function (e) {
      te = e.originalEvent.changedTouches[0].clientY;
      teX = e.originalEvent.changedTouches[0].clientX;
      if ( Math.abs(tsX - teX) > 50 ) {
        return true;
      } else if (ts > te + 5) {
        e.deltaY = -1; // is moving down
      } else if (ts < te - 5) {
        e.deltaY = 1; // is moving up
      } else {
        return true;
      } // end if ts/te comparison
      e.preventDefault();
      processScroll(e);
    }); // end touchmove


  } // end if totalScrollTargets > 0

}); // end window on load
