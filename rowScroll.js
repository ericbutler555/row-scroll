/* RowScroll 1.0 copyright 2015 Eric Butler, licensed under GNU GPLv2, free for personal and commercial use */
$(window).on('load', function(){
  
  var scrollTargets = $('.scroll-target'),
      scrollTops = [],
      wiggleRoom = 10, // amount of px to add to/subtract from scroll tops when evaluating where to scroll to
      scrollSpeed = 400; // amount of milliseconds to take to get to the next/previous scroll target
  
  // on page load, get a list of all divs with a "scroll-target" class, and their scroll-to locations
  $('.scroll-target').each(function(){
    scrollTops.push( Math.ceil( $(this).offset().top ) );
  }); // end each
  
  // re-get the list if the window size changes
  $(window).on('resize', function(){
    // delete the existing scroll-to locations
    scrollTops.length = 0;
    // get a fresh list of all the scroll-to locations
    $('.scroll-target').each(function(){
      scrollTops.push( Math.ceil( $(this).offset().top ) );
    }); // end each
  });
  
  // when a mouse scroll is detected,
  $(window).on('mousewheel', function(e){
    
    // detect the current scroll top amount
    var scrollPosition = $(window).scrollTop();
    
    // determine the scroll direction
    if ( e.deltaY > 0 ) { var scrollDirection = 'up'; }
    else if ( e.deltaY <= 0 ) { var scrollDirection = 'down'; }
    
    // if the scroll is downward,
    if (scrollDirection == 'down') {
      
      // go to the scroll top of the next div (how does it know what the next div is?)
      for ( var i = 0; i < scrollTargets.length; i++ ) {
        
        // if the current scroll position is between the top offsets of this and the next div
        if ( scrollPosition >= (scrollTops[i] - wiggleRoom) && scrollPosition < (scrollTops[i+1] - wiggleRoom) ) {
          
          // prevent the mousewheel from scrolling the page down
          e.preventDefault();
          
          // animate the window's scrollTop to the i+1 div's offset top
          $('html, body').stop().animate(
            { scrollTop: $(scrollTargets[i+1]).offset().top }, // move window so target element is at top of window
            scrollSpeed, // speed in milliseconds
            'swing' // easing
          ); // end animate
          
          break; // stop looping
          
        } // end if
        
      } // end for
      
    } // end if scrollDirection is down
    
    // else if the scroll is upward,
    else if (scrollDirection == 'up') {
      
      for ( var i = 0; i < scrollTargets.length; i++ ) {
        
        // if the current scroll position is less than or equal to the next div's top offset AND greater than the current div's top offset
        if ( scrollPosition <= (scrollTops[i+1] + wiggleRoom) && scrollPosition > (scrollTops[i] + wiggleRoom) ) {
          
          e.preventDefault();
          
          $('html, body').stop().animate(
            { scrollTop: $(scrollTargets[i]).offset().top },
            scrollSpeed,
            'swing'
          ); // end animate
          
          break; // stop looping
          
        } // end if
        
      } // end for
      
    } // end else if scrollDirection is up
    
  }); // end on mousewheel event
  
}); // end window on load
