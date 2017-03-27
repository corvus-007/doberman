$(function() {
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


  /*===================================
  =            Choice city            =
  ===================================*/

  var homepageURL = document.querySelector('.site-header__logo').href;
  var $citiesItemsLink = $('.cities__link');
  var cityLocationText = document.querySelector('.city-location__text');
  var currentCity = '';
  $citiesItemsLink.each(function() {
    if (this.href === homepageURL) {
      this.parentElement.classList.add('cities__item--active');
      currentCity = this.textContent;
    }
  });
  cityLocationText.textContent = currentCity;

  /*=====  End of Choice city  ======*/


  /*=====================================
  =            Sticky header            =
  =====================================*/

  var $header = $('.site-header');
  var $topbar = $('.topbar');

  if ('matchMedia' in window) {
    if (matchMedia('(min-width: 1024px)').matches) {

      $('.logo__image').on('load', function(event) {
        
        var topbarHeight = $topbar[0].offsetHeight;
        $header.css('top', topbarHeight + 'px');
        $header.css({'top': topbarHeight, 'position': 'absolute'})
        var headerHeight = $header[0].offsetHeight;
        var scrollPosition = 0;

        $topbar.css('margin-bottom', headerHeight + 'px');

        $(window).on('scroll', function() {
          scrollPosition = $(document).scrollTop();
          if (topbarHeight <= scrollPosition) {
            $header.css({'top': 0, 'position': 'fixed'})
          } else {
            $header.css({'top': topbarHeight, 'position': 'absolute'})
          }
        });
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
      // autoplay: true,
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
      responsive: [
        {
          breakpoint: 767,
          settings: {
            arrows: false,
            // centerMode: false,
          }
        },
        {
          breakpoint: 500,
          settings: {
            arrows: false,
            centerMode: false,
          }
        }
      ]
    });
  }

  /*=====  End of Images slider  ======*/



  /*====================================
  =            Top services            =
  ====================================*/

  var topServices = document.querySelector('.top-services');

  if (topServices) {
    var topServiceItems = topServices.querySelectorAll('.top-services__item');
    var topServicesHeight = topServices.offsetHeight;
    var adjacentSide = (topServicesHeight / 2);
    var adjacentAngle = Math.abs(getComputedStyle(topServiceItems[0]).transform.split(', ')[2]);
    var oppositeSide = Math.ceil(adjacentSide * adjacentAngle);

    $(topServiceItems).each(function(index, el) {
      var topServiceBg = this.querySelector('.top-service__bg');
      if (index === 0) {
        this.style.cssText = 'margin-left: -' + oppositeSide + 'px; padding-left: ' + oppositeSide + 'px;';
        topServiceBg.style.right = '-' + oppositeSide + 'px';
      } else if (index === (topServiceItems.length - 1)) {
        this.style.cssText = 'margin-right: -' + oppositeSide + 'px; padding-right: ' + oppositeSide + 'px;';
        topServiceBg.style.left = '-' + oppositeSide + 'px';
      } else {
        topServiceBg.style.left = '-' + oppositeSide + 'px';
        topServiceBg.style.right = '-' + oppositeSide + 'px';
      }
    });
  }

  /*=====  End of Top services  ======*/



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
      $('#' + areaID)
        .add('[data-area="' + areaID + '"]')
        .add('#marker-' + areaID)
        .addClass('active-area');
    }, function() {
      $('#' + areaID)
        .add('[data-area="' + areaID + '"]')
        .add('#marker-' + areaID)
        .removeClass('active-area');
    });
  }

  /*=====  End of Plan  ======*/


  /*================================
  =            Schedule            =
  ================================*/

  var $schedule = $('.schedule');
  var $scheduleContent = $('.schedule__content');
  var $scheduleControlsItems = $('.schedule__control');
  var initValue = 0;
  var prevInit = 0;
  var MAX_VALUE = 0;
  var MIN_VALUE = -40;

  $scheduleControlsItems.on('click', function(event) {
    event.preventDefault();
    prevInit = initValue;
    var direction = this.dataset.scheduleControl;
    if (direction === 'prev') {
      initValue += 20;
    } else if (direction === 'next') {
      initValue -= 20;
    }
    if ((initValue >= MIN_VALUE) && (initValue <= MAX_VALUE)) {
      $scheduleContent.css('transform', 'translateX(' + initValue + '%)');
    } else {
      initValue = prevInit;
    }
  });

  /*=====  End of Schedule  ======*/



  /*====================================
  =            Contacts map            =
  ====================================*/

  var contactsMap = document.querySelector('#contacts-map');

  if (contactsMap) {
    initializeMap();
  }

  /*=====  End of Contacts map  ======*/

  clearingSheduleItem();
  easeTime();

});

function clearingSheduleItem() {
  Array.prototype.forEach.call(document.querySelectorAll('.event_header'), function(item) {
    if (item.textContent.trim() === '') {
      item.remove();
    }
  });
}

function easeTime() {
  Array.prototype.forEach.call(document.querySelectorAll('.tt_items_list .value'), function(item) {
    item.textContent = item.textContent.trim().split(' - ')[0];
  });
}


function initializeMap() {
  var mapLocations = [];
  var markers = [];
  var locationPlaces = document.querySelectorAll('[data-place-location]');
  var ICONPATH = 'images/map-pin.svg';
  var ICONPATH = 'http://ideatech.ru/wp-content/themes/doberman/images/map-pin.svg';
  var locationCenter = null;

  Array.prototype.forEach.call(locationPlaces, function(place, i) {
    var placeItem = {};

    if ($('.js-show-map').length) {
      if (i === 0) {
        locationCenter = getLocationCenter(place);
      }
    } else {
      if (i === 0) {
        place.classList.add('contacts-info__trigger--active');
        locationCenter = getLocationCenter(place);
      }
    }
    placeItem.position = getLocationCenter(place);
    placeItem.title = place.dataset.placeCaption;

    mapLocations.push(placeItem);
  });


  var mapProp = createProp(locationCenter);
  var map = new google.maps.Map(document.getElementById("contacts-map"), mapProp);

  mapLocations.forEach(function(mapLocation) {
    addMarker(mapLocation);
  });

  if ($('.js-show-map').length) {
    clearMarkers();
  }


  $(locationPlaces).on('click', function(event) {
    event.preventDefault();
    if (!$('.js-show-map').length) {
      $(locationPlaces).removeClass('contacts-info__trigger--active')
      $(this).addClass('contacts-info__trigger--active')
    }
    map.panTo(getLocationCenter(this));
  });

  $('.js-show-map').on('click', function(event) {
    event.preventDefault();
    $('.contacts__places-holder').addClass('contacts__places-holder--closed');
    $('.contacts__toggle').removeClass('contacts__toggle--hidden');
    showMarkers();
  });

  $('.js-hide-map').on('click', function(event) {
    event.preventDefault();
    $('.contacts__places-holder').removeClass('contacts__places-holder--closed');
    $('.contacts__toggle').addClass('contacts__toggle--hidden');
    clearMarkers();
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
      styles: [{
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#1c2128"
        }]
      }, {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [{
          "color": "#c3cfe0"
        }]
      }, {
        "featureType": "poi",
        "elementType": "labels.text.stroke",
        "stylers": [{
          "color": "#000"
        }]
      }, {
        "featureType": "road",
        "stylers": [{
          "color": "#464f5c"
        }]
      }, {
        "featureType": "road",
        "elementType": "labels.text",
        "stylers": [{
          "color": "#d5e1f3"
        }]
      }, {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [{
          "color": "#fff"
        }]
      }]
    };
  }

  // Adds a marker to the map and push to the array.
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
    markers.push(marker);
  }

  // Sets the map on all markers in the array.
  function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

  // Removes the markers from the map, but keeps them in the array.
  function clearMarkers() {
    setMapOnAll(null);
  }

  // Shows any markers currently in the array.
  function showMarkers() {
    setMapOnAll(map);
  }
}
