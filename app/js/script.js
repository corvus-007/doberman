document.addEventListener('DOMContentLoaded', function() {

  /*====================================
  =            Index slider            =
  ====================================*/
  
  var indexSlider = document.querySelector('.index-slider');

  if (indexSlider) {
    $(indexSlider).slick({
      accessibility: false,
      dots: true,
      arrows: false
    });
  }
  
  /*=====  End of Index slider  ======*/



/*=====================================
=            Images slider            =
=====================================*/

var $sliderImages = $('.js-slider-images');

if ($sliderImages.length) {
  $sliderImages.slick({
    accessibility: false,
    dots: true,
    centerMode: true,
    variableWidth: true,
    appendArrows: '.slider-images__arrows-holder',
    prevArrow: '<button type="button" class="slick-prev">\
      <svg class="slider-images__arrow-icon svg-icon">\
        <use xlink:href="images/symbols.svg#arrow-prev"></use>\
      </svg>\
    </button>',
    nextArrow: '<button type="button" class="slick-next">\
      <svg class="slider-images__arrow-icon svg-icon">\
        <use xlink:href="images/symbols.svg#arrow-next"></use>\
      </svg>\
    </button>',
  });
}

/*=====  End of Images slider  ======*/




  /*====================================
  =            Inline popup            =
  ====================================*/
  
  $('.js-trigger-inline-popup').magnificPopup({
    mainClass: 'popup-fade',
    removalDelay: 300
  });
  
  /*=====  End of Inline popup  ======*/
  

});
