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
=            Sticky header            =
=====================================*/


if ('matchMedia' in window) {
  if (matchMedia('(min-width: 1024px)').matches) {
    var $topbar = $('.topbar');
    var $header = $('.site-header');
    var headerPosition = $header.offset();
    var topbarHeight = $topbar.outerHeight();
    var headerHeight = $header.outerHeight();
    var scrollPosition = 0;

    $topbar.css('margin-bottom', headerHeight + 'px');
    $header
      .addClass('site-header--sticky')
      .css('top', topbarHeight + 'px');

    $(window).on('scroll', function() {
      scrollPosition = $(document).scrollTop();
      if (headerPosition.top <= scrollPosition) {
        $header.css('top', 0);
      } else {
        $header.css('top', topbarHeight + 'px');
      }

      console.log(headerPosition);
      console.log(scrollPosition);
    });
  }
}



/*=====  End of Sticky header  ======*/



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
    autoplay: true,
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



/*==================================
=            Input mask            =
==================================*/

// Phone
$('input[type="tel"]').mask("+7 (999) 999 99 99", {});

/*=====  End of Input mask  ======*/



  /*====================================
  =            Inline popup            =
  ====================================*/
  
  $('.js-trigger-inline-popup').magnificPopup({
    mainClass: 'popup-fade',
    removalDelay: 300
  });
  
  /*=====  End of Inline popup  ======*/
  


  /*====================================
  =            Contacts map            =
  ====================================*/

  var contactsMap = document.querySelector('#contacts-map');

  if (contactsMap) {
    initializeMap();
  }

  /*============================
  =            Plan            =
  ============================*/
  
  var $plan = $('.plan');

  if ($plan.length) {
    var $planAreaItems = $('.plan-area');
    var $planLegendItems = $('.plan-legend__item');
    var areaID = null;

    $planAreaItems.add($planLegendItems).hover(function() {
      areaID = this.id || this.dataset.area;
      $('#' + areaID )
        .add('[data-area="'+areaID+'"]')
        .add('#marker-' + areaID)
          .addClass('active-area');
    }, function() {
      $('#' + areaID )
        .add('[data-area="'+areaID+'"]')
        .add('#marker-' + areaID)
          .removeClass('active-area');
    });
  }

  /*=====  End of Plan  ======*/
  

  /*=====  End of Contacts map  ======*/
});


function initializeMap() {
  var mapLocations = [];
  var locationPlaces = document.querySelectorAll('[data-place-location]');
  var ICONPATH = 'images/map-pin.png';
  var locationCenter = null;

  Array.prototype.forEach.call(locationPlaces, function(place, i) {
    var placeItem = {};

    if (i === 0) {
      locationCenter = getLocationCenter(place);
      place.classList.add('contacts-info__trigger--active');
    }

    placeItem.position = getLocationCenter(place);
    placeItem.title = place.dataset['place-caption'];
    mapLocations.push(placeItem);

  });


  var mapProp = createProp(locationCenter);
  var map = new google.maps.Map(document.getElementById("contacts-map"), mapProp);

  mapLocations.forEach(function(mapLocation) {
    addMarker(mapLocation);
  });


  $(locationPlaces).on('click', function(event) {
    event.preventDefault();
    $(locationPlaces).removeClass('contacts-info__trigger--active')
    $(this).addClass('contacts-info__trigger--active')
    map.panTo( getLocationCenter(this) );
  });

  function getLocationCenter(element) {
    return JSON.parse(element.dataset.placeLocation);
  }


  function createProp(defaultLocation) {
    return {
      center: defaultLocation,
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      scrollwheel: false,
      disableDefaultUI: true,
      zoomControl: true,
    };
  }

  function addMarker(markerOption) {
    var svgIcon = {
      url: ICONPATH,
    };

    var marker = new google.maps.Marker({
      position: markerOption.position,
      map: map,
      title: markerOption.title,
      icon: svgIcon
    });
  }
}
