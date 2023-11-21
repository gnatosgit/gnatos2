"use strict";

/* Mute the page header background video */

/* YouTube */

var player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player("ytplayer", {
    events: {
      onReady: function () {
        player.mute();
      },
    },
  });
}

jQuery(function ($) {
  $.fn.shuffle = function () {
    var allElems = this.get(),
      getRandom = function (max) {
        return Math.floor(Math.random() * max);
      },
      shuffled = $.map(allElems, function () {
        var random = getRandom(allElems.length),
          randEl = $(allElems[random]).clone(true)[0];
        allElems.splice(random, 1);
        return randEl;
      });

    this.each(function (i) {
      $(this).replaceWith($(shuffled[i]));
    });

    return $(shuffled);
  };

  /* Vimeo */

  var iframe = $("#vimeoplayer");
  if (iframe.length) {
    var player = $f(iframe[0]);

    player.addEvent("ready", function () {
      player.api("setVolume", 0);
    });
  }

  var isMobile = false;
  $.support.placeholder = "placeholder" in document.createElement("input");

  /* Screen size (grid) */
  var screenLarge = 1200,
    screenMedium = 992,
    screenSmall = 768;

  /* Check if on mobile */
  if (/Mobi/.test(navigator.userAgent)) {
    isMobile = true;
  }

  if (isMobile) {
    $("body").addClass("anps-mobile");
  }

  /*-----------------------------------------------------------------------------------*/
  /*	WordPress
    /*-----------------------------------------------------------------------------------*/

  $(".tnp-email").each(function () {
    $(this).attr(
      "placeholder",
      $(this).parents(".tnp-field").find("label").text()
    );
  });
  $(".tnp-field-button").on("click", function (e) {
    if (e.target.nodeName == "DIV") {
      $(this).find(".tnp-button").click();
    }
  });

  $(".newsletter-email").attr(
    "placeholder",
    $('[for="newsletter-email"]').text()
  );
  $(".newsletter-field-button").on("click", function (e) {
    if (e.target.nodeName == "DIV") {
      $(this).find(".newsletter-button").click();
    }
  });

  $('[data-toggle="collapse"]').on("click", function () {
    $(this).blur();
  });

  $("#reset").show().appendTo("#commentform .form-submit");

  /* Search pointer events (IE, Opera mini) fix */
  $(".searchform").on("click", function (e) {
    if ($(e.target).is("div")) {
      $(this).find("#searchsubmit").click();
    }
  });

  /* Search form placeholder */
  $('.searchform input[type="text"]').attr(
    "placeholder",
    anps.search_placeholder
  );

  /* VC grid changes */
  $(window).on("grid:items:added", function () {
    $(".vc_btn3-left")
      .find("a")
      .attr("class", "btn btn-md btn-gradient btn-shadow");
  });

  if ($(".megamenu-wrapper").length) {
    $(".megamenu-wrapper").each(function () {
      var megaMenu = $(this);

      megaMenu
        .children("ul")
        .wrap('<div class="megamenu" />')
        .children()
        .unwrap();
      var cols = megaMenu.find(".megamenu").children().length;
      megaMenu
        .find(".megamenu")
        .children()
        .each(function () {
          var title = $(this).children("a:first-of-type");
          $(this)
            .find("ul")
            .removeClass("sub-menu")
            .prepend(
              '<li><span class="megamenu-title">' +
              title.text() +
              "</span></li>"
            );
          title.remove();
          $(this).find("li").attr("style", "");
          $(this).replaceWith(
            '<div class="col-lg-' + 12 / cols + '">' + $(this).html() + "</div>"
          );
        });
    });

    $(".megamenu").css({
      left:
        -$(".megamenu-wrapper").offset().left +
        ($("body").width() - $(".container").width()) / 2,
      width: $(".container").width(),
    });
  }

  /*-----------------------------------------------------------------------------------*/
  /*	OWL general
    /*-----------------------------------------------------------------------------------*/

  if ($(".owl-carousel.general").length) {
    $(".owl-carousel.general").each(function () {
      var owl = $(this);
      var number_items = $(this).attr("data-col");
      owl.owlCarousel({
        loop: false,
        margin: 30,
        responsiveClass: true,
        responsive: {
          0: {
            items: 1,
            nav: false,
            slideBy: 1,
          },
          600: {
            items: 2,
            nav: false,
            slideBy: 1,
          },
          992: {
            items: number_items,
            nav: false,
            slideBy: 1,
          },
        },
      });

      owl
        .siblings()
        .find(".owlnext")
        .on("click", function () {
          owl.trigger("next.owl.carousel");
        });

      owl
        .siblings()
        .find(".owlprev")
        .on("click", function () {
          owl.trigger("prev.owl.carousel");
        });
    });
  }
  /*-----------------------------------------------------------------------------------*/
  /*	Recent News
  /*-----------------------------------------------------------------------------------*/

  $(".anps-recent-news").each(function () {
    var el = $(this);
    var owl = $(".owl-carousel", this);
    if (owl.length) {
      var owlcolumns = el.data("columns");
      var owlSettings = {
        loop: el.find(".post").length <= owlcolumns ? false : true,
        margin: 30,
        dots: false,
        responsiveClass: true,
        rtl: $('html[dir="rtl"]').length > 0,
        stagePadding: 2,
        nav: el.data("nav") === true,
        responsive: {
          0: {
            items: 1,
            slideBy: 1,
          },
          600: {
            items: 2,
            slideBy: el.find(".post").length % 2 === 0 ? 2 : 1,
          },
          992: {
            items: owlcolumns,
            slideBy:
              el.find(".post").length % owlcolumns === 0 ? owlcolumns : 1,
          },
        },
      };
      owl.owlCarousel(owlSettings);
    }
  });

  /*-----------------------------------------------------------------------------------*/
  /*	Top bar
    /*-----------------------------------------------------------------------------------*/

  if ($(".top-bar--menu").length) {
    $(".top-bar")
      .clone()
      .attr("class", "top-bar-menu")
      .prependTo(".anps-mobile-menu");
  }

  if ($(".top-bar--toggle").length) {
    $(".top-bar").append(
      '<button class="top-bar__toggle"><i class="fa fa-angle-down" aria-hidden="true"></i></button>'
    );

    $(".top-bar__toggle").on("click", function () {
      $(".top-bar").toggleClass("top-bar--active");
      $(".top-bar .container").slideToggle();
    });
  }

  /*-----------------------------------------------------------------------------------*/
  /*	Team
  /*-----------------------------------------------------------------------------------*/

  $(".anps-team .owl-carousel").each(function () {
    var $el = $(this);
    var owlcolumns = $el.data("col");
    var enoughItems = $el.find(".anps-member").length > owlcolumns;
    var owlSettings = {
      loop: enoughItems,
      mouseDrag: enoughItems,
      touchDrag: enoughItems,
      pullDrag: enoughItems,
      margin: 40,
      dots: true,
      responsiveClass: true,
      rtl: $('html[dir="rtl"]').length > 0,
      stagePadding: 2,
      responsive: {
        0: {
          items: 1,
          slideBy: 1,
        },
        450: {
          items: 2,
          slideBy: $el.find(".anps-member").length % 2 === 0 ? 2 : 1,
        },
        992: {
          items: owlcolumns,
          slideBy:
            $el.find(".anps-member").length % owlcolumns === 0
              ? owlcolumns
              : 1,
        },
      },
    };
    $el.owlCarousel(owlSettings);
  });

  /*-----------------------------------------------------------------------------------*/
  /*	Testimonials
    /*-----------------------------------------------------------------------------------*/

  $(".testimonials-style-3 li").on("mouseover", function () {
    $(this)
      .find(".content")
      .css(
        "transform",
        "translateY(-" + $(this).find(".content p").height() + "px)"
      );
  });

  $(".testimonials-style-3 li").on("mouseleave", function () {
    $(this).find(".content").css("transform", "translateY(0)");
  });

  $(".testimonials .owl-carousel, .anps-twitter .owl-carousel").each(
    function () {
      var el = $(this);
      var owlSettings = {
        loop: false,
        margin: 0,
        dots: false,
        responsiveClass: true,
        mouseDrag: false,
        touchDrag: false,
        autoplay: $(this).data("autoplay") !== undefined,
        autoplayTimeout: $(this).data("autoplay"),
        rtl: $('html[dir="rtl"]').length > 0,
        responsive: {
          0: {
            items: 1,
            nav: false,
            slideBy: 1,
          },
          1170: {
            items: 2,
            nav: false,
            slideBy: 1,
          },
        },
      };

      if (el.children("li").length > 1) {
        owlSettings.loop = true;
        owlSettings.navigation = true;
        owlSettings.mouseDrag = true;
        owlSettings.touchDrag = true;
      }

      if ($(this).data("random") !== undefined) {
        $(this).children().shuffle();
      }

      el.owlCarousel(owlSettings);

      // Custom Navigation Events
      el.parents(".testimonials, .anps-twitter")
        .find(".owlnext")
        .on("click", function () {
          el.trigger("next.owl.carousel");
        });

      el.parents(".testimonials, .anps-twitter")
        .find(".owlprev")
        .on("click", function () {
          el.trigger("prev.owl.carousel");
        });
    }
  );

  /*-----------------------------------------------------------------------------------*/
  /*	Projects
    /*-----------------------------------------------------------------------------------*/

  /* Mobile */

  $(".project-hover .btn").on("click", function (e) {
    if ($(this).parent().css("opacity") !== "1") {
      e.preventDefault();
      return false;
    }
  });

  /* Reset Pagination */

  function resetPagination(items, itemClass, perPage) {
    var pageTemp = 0;

    items.find(itemClass).each(function (item) {
      var tempClass = $(this).attr("class");

      $(this).attr("class", tempClass.replace(/(page-[1-9][0-9]*)/g, ""));
    });

    items.find(itemClass).each(function (index) {
      if (index % perPage === 0) {
        pageTemp += 1;
      }

      items
        .find(itemClass)
        .eq(index)
        .addClass("page-" + pageTemp);
    });
  }

  /* Main logic */

  function filterSize() {
    $(".filter").each(function () {
      var maxHeight = -1;
      $(this).find("li").height("auto");
      $(this)
        .find("li")
        .each(function () {
          if ($(this).height() > maxHeight) {
            maxHeight = $(this).innerHeight();
          }
        });
      $(this).find("li").height(maxHeight);
    });
  }

  $(window).on("resize", filterSize);
  filterSize();

  window.onload = function () {
    $(".ico_listing").each(function () {
      var items = $(this).find(".ico_upcoming, .ico_active, .ico_ended");
      var itemClass = ".ico-item";
      var filter = $(this).find(".filter");
      var initialFilter = "";
      var hash = window.location.hash.replace("#", "");

      if (hash && filter.find('[data-filter="' + hash + '"]').length) {
        initialFilter = "." + hash;
        filter.find(".selected").removeClass("selected");
        filter.find('[data-filter="' + hash + '"]').addClass("selected");
      }

      /* Layout */
      items.isotope({
        itemSelector: itemClass,
        layoutMode: "fitRows",
        filter: initialFilter,
      });

      /* Filtering */
      filter.find("button").on("click", function (e) {
        var value = $(this).attr("data-filter");
        value = value != "*" ? "." + value : value;

        items.isotope({
          filter: value,
        });

        /* Change select class */
        filter.find(".selected").removeClass("selected");
        $(this).addClass("selected");
      });
    });
    $(".projects").each(function () {
      var items = $(this).find(".projects-content");
      var itemClass = ".projects-item";
      var filter = $(this).find(".filter");
      var initialFilter = "";
      var hash = window.location.hash.replace("#", "");

      if (hash && filter.find('[data-filter="' + hash + '"]').length) {
        initialFilter = "." + hash;
        filter.find(".selected").removeClass("selected");
        filter.find('[data-filter="' + hash + '"]').addClass("selected");
      }

      if ($(this).find(".projects-pagination").length) {
        var pageNum = 1;
        var perPage = 3;

        if (window.innerWidth < screenSmall) {
          perPage = 2;
        } else if (window.innerWidth < screenMedium) {
          perPage = 4;
        } else if (items.find(itemClass).hasClass("col-md-3")) {
          perPage = 4;
        }

        var numPages = Math.ceil(items.find(itemClass).length / perPage);

        if (numPages < 2) {
          $(".projects-pagination").css("visibility", "hidden");
        } else {
          $(".projects-pagination").css("visibility", "visible");
        }

        $(window).on("resize", function () {
          if (window.innerWidth < screenSmall) {
            perPage = 2;
          } else if (window.innerWidth < screenMedium) {
            perPage = 4;
          } else if (items.find(itemClass).hasClass("col-md-3")) {
            perPage = 4;
          } else {
            perPage = 3;
          }

          filter.find(".selected").click();
        });

        resetPagination(items, itemClass, perPage);

        /* Layout */
        items.isotope({
          itemSelector: itemClass,
          layoutMode: "fitRows",
          filter: ".page-" + pageNum + initialFilter,
          transitionDuration: ".3s",
          hiddenStyle: {
            opacity: 0,
          },
          visibleStyle: {
            opacity: 1,
          },
        });

        /* Remove empty filter category buttons */
        filter.find("li").each(function () {
          var className = $(this).children("button").attr("data-filter");

          if (className === "*") {
            return true;
          }

          if (!items.find("." + className).length) {
            $(this).remove();
          }
        });

        /* Filtering */
        filter.find("button").on("click", function (e) {
          var value = $(this).attr("data-filter");
          value = value != "*" ? "." + value : value;
          pageNum = 1;

          numPages = Math.ceil(items.find(itemClass + value).length / perPage);

          if (numPages < 2) {
            $(".projects-pagination").css("visibility", "hidden");
          } else {
            $(".projects-pagination").css("visibility", "visible");
          }

          resetPagination(items, itemClass + value, perPage);
          items.isotope({
            filter: value + ".page-1",
          });

          /* Change select class */
          filter.find(".selected").removeClass("selected");
          $(this).addClass("selected");
        });

        $(".projects-pagination button").on("click", function () {
          var value = $(".filter .selected").attr("data-filter");
          value = value != "*" ? "." + value : value;

          if ($(this).hasClass("prev")) {
            if (pageNum - 1 == 0) {
              pageNum = numPages;
            } else {
              pageNum -= 1;
            }
          } else {
            if (pageNum + 1 > numPages) {
              pageNum = 1;
            } else {
              pageNum += 1;
            }
          }

          items.isotope({
            filter: value + ".page-" + pageNum,
          });
        });
      } else {
        /* Layout */
        items.isotope({
          itemSelector: itemClass,
          layoutMode: "fitRows",
          filter: initialFilter,
        });

        /* Filtering */
        filter.find("button").on("click", function (e) {
          var value = $(this).attr("data-filter");
          value = value != "*" ? "." + value : value;

          items.isotope({
            filter: value,
          });

          /* Change select class */
          filter.find(".selected").removeClass("selected");
          $(this).addClass("selected");
        });
      }

      /* Add background to parent row */
      if ($(".projects-recent[data-bg]").length) {
        $(".projects-recent")
          .parents(".vc_row")
          .css("background-color", $(".projects-recent").data("bg"));
      } else {
        $(".projects-recent").parents(".vc_row").addClass("bg-dark");
      }
    });
  };

  /*-----------------------------------------------------------------------------------*/
  /*	Push submenu to the left if no space on the right
    /*-----------------------------------------------------------------------------------*/

  var submenuWidth = $(".sub-menu > .menu-item").width();
  var menusWithChildren = $(".main-menu > .menu-item-has-children");

  $(".anps-mobile-menu .menu-item-has-children").append(
    '<button class="sub-menu-toggle"><i class="fa fa-angle-down"></i></button>'
  );

  $(".sub-menu-toggle").on("click", function () {
    $(this).parent().toggleClass("sub-menu-active");
  });

  /* Set an attribute for all top level menus with children */
  function setDepth() {
    $(this).each(function () {
      var depth = 0;

      $(this)
        .find(".sub-menu > .menu-item:last-child")
        .each(function () {
          depth = Math.max(depth, $(this).parents(".sub-menu").length);
        });

      $(this).attr("data-depth", depth);
    });
  }

  /* Check if menu should change */
  function isSubmenuOnScreen() {
    var width = submenuWidth * $(this).attr("data-depth");

    if (window.innerWidth - $(this).offset().left < width) {
      $(this).addClass("children-right");
    } else {
      $(this).removeClass("children-right");
    }
  }

  setDepth.call(menusWithChildren);
  menusWithChildren.on("mouseenter", isSubmenuOnScreen);

  /* One page support */

  var onePageLinks = $(
    '.anps-smothscroll, .main-menu a[href*="#"]:not([href="#"]):not([href*="="]), .anps-main-nav a[href*="#"]:not([href="#"]):not([href*="="])'
  );

  if (!$(".home").length) {
    onePageLinks.each(function () {
      var href = $(this).attr("href");
      if (href !== undefined && href.indexOf("#") === 0) {
        $(this).attr("href", anps.home_url + href);
      }
    });
  }

  onePageLinks.on("click", function (e) {
    var href = $(this).attr("href");

    if (!$(".home").length || href.indexOf("#") !== 0) {
      window.location = href;
      e.preventDefault();
      return false;
    } else {
      var target = $($(this).attr("href"));
      var offset = 0; /* Desired spacing */

      if (window.innerWidth > 600) {
        if ($("#wpadminbar").length) {
          offset += $("#wpadminbar").height();
        }
      }

      if (
        (window.innerWidth > 768 &&
          $(".anps-header--top-fullwidth-menu").length === 0) ||
        ($(".anps-header--top-fullwidth-menu").length &&
          window.innerWidth > 1200)
      ) {
        if (
          $(".anps-header__bar").length &&
          $(".anps-header__bar").attr("data-height-scroll")
        ) {
          offset += parseInt(
            $(".anps-header__bar").attr("data-height-scroll").slice(0, -2)
          );
        }
      }

      if (target.length) {
        var targetoffset = target.offset().top - offset;

        $("html,body").animate(
          {
            scrollTop: targetoffset,
          },
          1000,
          function () {
            history.pushState(null, null, href);
          }
        );

        return false;
      }
    }
  });

  /* Add Support for touch devices for desktop menu */
  $(".site-header #main-menu").doubleTapToGo();

  function mobileMenuClose() {
    $(".anps-menu-toggle i").removeClass("fa-close").addClass("fa-bars");

    setTimeout(function () {
      if (typeof window.vc_fullWidthRow === "function") {
        window.vc_fullWidthRow();
      }
      $(window).trigger("resize");
    }, 400);
  }

  $(".anps-menu-toggle").on("click", function () {
    $("body").toggleClass("anps-show-mobile-menu");
    $(window).trigger("resize");

    if (!$("body").hasClass("anps-show-mobile-menu")) {
      mobileMenuClose();
    } else {
      $(".anps-menu-toggle i").removeClass("fa-bars").addClass("fa-close");
    }
  });

  $(window).on("resize", function () {
    if (window.innerWidth >= 1200) {
      $("body").removeClass("anps-show-mobile-menu");
      mobileMenuClose();
    }
  });

  $('.menu-item a[href*="#"]:not([href="#"])').on("click", function () {
    if ($("body").hasClass("anps-show-mobile-menu")) {
      mobileMenuClose();
      $("body").removeClass("anps-show-mobile-menu");
    }
  });

  $(".anps-mobile-menu").detach().insertAfter(".site");

  /*-----------------------------------------------------------------------------------*/
  /*	Gallery Thumbnails
    /*-----------------------------------------------------------------------------------*/

  var openGallery = false;

  function changeThumb(el) {
    var $gallery = el.parents(".gallery-fs");

    if (!el.hasClass("selected")) {
      var caption = el.attr("title");

      if (el.data("caption")) {
        caption = el.data("caption");
      }

      $gallery.find("> figure > img").attr("src", el.attr("href"));
      $gallery.find("> figure > figcaption").html(caption);
      $gallery.find(".gallery-fs-thumbnails .selected").removeClass("selected");
      el.addClass("selected");
    }
  }

  var thumbCol = 6;
  var galleryParent = $(".gallery-fs").parents('[class*="col-"]');
  var galleryParentSize = Math.floor(
    (galleryParent.outerWidth() / galleryParent.parent().outerWidth()) * 100
  );

  if (galleryParentSize < 60) {
    thumbCol = 5;
  }
  if (galleryParentSize == 100) {
    thumbCol = 9;
  }

  var navText = [
    '<i class="fa fa-angle-left"></i>',
    '<i class="fa fa-angle-right"></i>',
  ];

  if ($('html[dir="rtl"]').length) {
    navText.reverse();
  }

  function setOwlNav(e) {
    if (e.page.size >= e.item.count) {
      if ($('html[dir="rtl"]').length) {
        $(e.target)
          .siblings(".gallery-fs-nav")
          .children("a, button")
          .css("transform", "translateX(-83px)");
      } else {
        $(e.target)
          .siblings(".gallery-fs-nav")
          .children("a, button")
          .css("transform", "translateX(83px)");
      }
    } else {
      $(e.target)
        .siblings(".gallery-fs-nav")
        .children("a, button")
        .css("transform", "translateX(0)");
    }
  }
  $(".gallery-fs-thumbnails").owlCarousel({
    onInitialized: setOwlNav,
    onResized: setOwlNav,
    loop: false,
    margin: 17,
    nav: true,
    navText: navText,
    rtl: $('html[dir="rtl"]').length > 0,
    responsive: {
      0: { items: 2 },
      600: { items: 4 },
      1000: { items: thumbCol },
    },
  });

  $(".gallery-fs-thumbnails a").swipebox({
    hideBarsDelay: -1,
    afterOpen: function () {
      if (!openGallery) {
        $.swipebox.close();
      }
      openGallery = false;
    },
    nextSlide: function () {
      var index = $(".gallery-fs-thumbnails .owl-item a.selected")
        .parent()
        .index();

      if (index < $(".gallery-fs-thumbnails .owl-item").length - 1) {
        changeThumb(
          $(".gallery-fs-thumbnails .owl-item")
            .eq(index + 1)
            .children("a")
        );
      }
    },
    prevSlide: function () {
      var index = $(".gallery-fs-thumbnails .owl-item a.selected")
        .parent()
        .index();

      if (index > 0) {
        changeThumb(
          $(".gallery-fs-thumbnails .owl-item")
            .eq(index - 1)
            .children("a")
        );
      }
    },
  });

  $(".gallery-fs-thumbnails .owl-item a").on("click", function () {
    changeThumb($(this));
  });

  $(".gallery-fs-fullscreen").on("click", function (e) {
    e.preventDefault();
    openGallery = true;

    var $gallery = $(this).parents(".gallery-fs");

    if ($gallery.find(".gallery-fs-thumbnails").length) {
      $gallery
        .find(".gallery-fs-thumbnails .owl-item a.selected")
        .eq(0)
        .click();
    }
  });

  /* Only one thumbnail */

  if (!$(".gallery-fs-thumbnails").length) {
    $(".gallery-fs-fullscreen").css({
      right: "21px",
    });
    $(".gallery-fs-fullscreen").swipebox({
      hideBarsDelay: 1,
    });
  }

  /* Gallery */

  $(".gallery a").swipebox({
    hideBarsDelay: -1,
  });

  /*-----------------------------------------------------------------------------------*/
  /*	Fixed Footer
    /*-----------------------------------------------------------------------------------*/
  $(window).on("load", function () {
    if ($(".fixed-footer").length) {
      fixedFooter();

      $(window).on("resize", function () {
        fixedFooter();
      });
    }
  });

  function fixedFooter() {
    $(".site-main").css("margin-bottom", $(".site-footer").innerHeight());
  }

  /*-----------------------------------------------------------------------------------*/
  /*	Quantity field
    /*-----------------------------------------------------------------------------------*/

  function addQuantityButtons() {
    $("form .quantity").append('<button class="plus">+</button>');
    $("form .quantity").append('<button class="minus">-</button>');
  }
  addQuantityButtons();

  $(document).on("updated_cart_totals", addQuantityButtons);

  $("body").on("click", ".quantity button", function (e) {
    e.preventDefault();

    var field = $(this).parent().find(".qty"),
      val = parseInt(field.val(), 10),
      step = parseInt(field.attr("step"), 10) || 0,
      min = parseInt(field.attr("min"), 10) || 1,
      max = parseInt(field.attr("max"), 10) || 0;

    if ($(this).html() === "+" && (val < max || !max)) {
      /* Plus */
      field.val(val + step);
    } else if ($(this).html() === "-" && val > min) {
      /* Minus */
      field.val(val - step);
    }

    field.trigger("change");
  });

  /*-----------------------------------------------------------------------------------*/
  /*	Featured Element (lightbox)
    /*-----------------------------------------------------------------------------------*/

  $(".featured-lightbox-link").swipebox({
    hideBarsDelay: 1,
  });

  /*-----------------------------------------------------------------------------------*/
  /*	Gallery (lightbox)
    /*-----------------------------------------------------------------------------------*/

  $(".gallery-simple__link").swipebox({
    hideBarsDelay: -1,
  });

  /*-----------------------------------------------------------------------------------*/
  /*	IE9 Placeholders
    /*-----------------------------------------------------------------------------------*/

  if (!$.support.placeholder) {
    $("[placeholder]")
      .on("focus", function () {
        if ($(this).val() == $(this).attr("placeholder")) {
          $(this).val("");
        }
      })
      .on("blur", function () {
        if ($(this).val() == "") {
          $(this).val($(this).attr("placeholder"));
        }
      })
      .blur();

    $("[placeholder]")
      .parents("form")
      .on("submit", function () {
        if ($("[placeholder]").parents("form").find(".alert")) {
          return false;
        }

        $(this)
          .find("[placeholder]:not(.alert)")
          .each(function () {
            if ($(this).val() == $(this).attr("placeholder")) {
              $(this).val("");
            }
          });
      });
  }
  /*-----------------------------------------------------------------------------------*/
  /*	Is on screen?
    /*-----------------------------------------------------------------------------------*/

  jQuery.fn.isOnScreen = function () {
    var win = jQuery(window);

    var viewport = {
      top: win.scrollTop(),
      left: win.scrollLeft(),
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();

    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();

    return !(
      viewport.right < bounds.left ||
      viewport.left > bounds.right ||
      viewport.bottom < bounds.top ||
      viewport.top > bounds.bottom
    );
  };

  /*-----------------------------------------------------------------------------------*/
  /*	Counter
    /*-----------------------------------------------------------------------------------*/

  function checkForOnScreen() {
    $(".anps-counter").each(function (index) {
      if (
        !$(this).hasClass("animated") &&
        $(".anps-counter").eq(index).isOnScreen()
      ) {
        var counter = new CountUp(
          $(this).attr("id"),
          $(this).data("from"),
          $(this).data("to"),
          0,
          $(this).data("duration"),
          {
            useEasing: $(this).data("use-easing"),
            useGrouping: $(this).data("use-grouping"),
            separator: $(this).data("separator"),
            decimal: $(this).data("decimal"),
          }
        );
        if (!counter.error) {
          counter.start();
        } else {
          console.error(counter.error);
        }
        $(".anps-counter").eq(index).addClass("animated");
      }
    });
  }

  checkForOnScreen();

  $(window).scroll(function () {
    checkForOnScreen();
  });

  /*-----------------------------------------------------------------------------------*/
  /*	Page Header
    /*-----------------------------------------------------------------------------------*/

  function pageHeaderVideoSize() {
    $(".page-header iframe").height($(window).width() / 1.77777777778);
  }

  if ($(".page-header").length) {
    pageHeaderVideoSize();
    $(window).on("resize", pageHeaderVideoSize);

    if (isMobile) {
      $(".page-header").find(".page-header-video").remove();
    }

    if ($("#ytplayer")) {
      $("body").append('<script src="https://www.youtube.com/player_api">');
    }
  }

  /*-----------------------------------------------------------------------------------*/
  /*	Google Maps
    /*-----------------------------------------------------------------------------------*/

  /* Helper function to check if a number is a float */
  function isFloat(n) {
    return parseFloat(n.match(/^-?\d*(\.\d+)?$/)) > 0;
  }

  /* Check if a string is a coordinate */
  function checkCoordinates(str) {
    if (!str) {
      return false;
    }

    str = str.split(",");
    var isCoordinate = true;

    if (
      str.length !== 2 ||
      !isFloat(str[0].trim()) ||
      !isFloat(str[1].trim())
    ) {
      isCoordinate = false;
    }

    return isCoordinate;
  }

  $(".map").each(function () {
    /* Options */
    var gmap = {
      zoom: $(this).attr("data-zoom")
        ? parseInt($(this).attr("data-zoom"))
        : 15,
      address: $(this).attr("data-address"),
      markers: $(this).attr("data-markers"),
      icon: $(this).attr("data-icon"),
      typeID: $(this).attr("data-type"),
      ID: $(this).attr("id"),
      styles: $(this).attr("data-styles")
        ? JSON.parse($(this).attr("data-styles"))
        : "",
    };

    var gmapScroll = $(this).attr("data-scroll")
      ? $(this).attr("data-scroll")
      : "false";
    var markersArray = [];
    var bound = new google.maps.LatLngBounds();

    if (gmapScroll == "false") {
      gmap.draggable = false;
      gmap.scrollwheel = false;
    }

    if (gmap.markers) {
      gmap.markers = gmap.markers.split("|");

      /* Get markers and their options */
      gmap.markers.forEach(function (marker) {
        if (marker) {
          marker = $.parseJSON(marker);

          if (checkCoordinates(marker.address)) {
            marker.position = marker.address.split(",");
            delete marker.address;
          }

          markersArray.push(marker);
        }
      });

      /* Initialize map */
      $("#" + gmap.ID)
        .gmap3({
          zoom: gmap.zoom,
          draggable: gmap.draggable,
          scrollwheel: gmap.scrollwheel,
          mapTypeId: google.maps.MapTypeId[gmap.typeID],
          styles: gmap.styles,
        })
        .on({
          tilesloaded: function () {
            if (typeof window.anpsMapsLoaded !== "undefined") {
              window.anpsMapsLoaded();
            }
          },
        })
        .marker(markersArray)
        .then(function (results) {
          var center = null;

          if (
            typeof results[0].position.lat !== "function" ||
            typeof results[0].position.lng !== "function"
          ) {
            return false;
          }

          results.forEach(function (m, i) {
            if (markersArray[i].center) {
              center = new google.maps.LatLng(
                m.position.lat(),
                m.position.lng()
              );
            } else {
              bound.extend(
                new google.maps.LatLng(m.position.lat(), m.position.lng())
              );
            }
          });

          window.anpsMarkers = results;

          if (!center) {
            center = bound.getCenter();
          }

          this.get(0).setCenter(center);
        })
        .infowindow({
          content: "",
        })
        .then(function (infowindow) {
          var map = this.get(0);
          this.get(1).forEach(function (marker) {
            if (marker.data !== "") {
              marker.addListener("click", function () {
                infowindow.setContent(decodeURIComponent(marker.data));
                infowindow.open(map, marker);
              });
            }
          });
        });
    } else {
      console.error(
        "No markers found. Add markers to the Google maps item using Visual Composer."
      );
    }
  }); /* Each Map element */

  /*-----------------------------------------------------------------------------------*/
  /*	Widgets
    /*-----------------------------------------------------------------------------------*/

  /* Calendar */

  var $calendars = $(".calendar_wrap table");

  function calendarSize() {
    $calendars.each(function () {
      var $calendarTD = $(this).find("td");
      var $calendarTH = $(this).find("th");

      $calendarTD.css("line-height", $calendarTH.width() + "px");
    });
  }

  calendarSize();

  $(window).on("resize", calendarSize);

  /*-----------------------------------------------------------------------------------*/
  /*	Accordions & tabs # URL open
  /*-----------------------------------------------------------------------------------*/

  if (window.location.hash && $(".tabs, .panel")) {
    var el = $('[href="' + window.location.hash + '"]');

    if (el.length) {
      el.click();
    }
  }

  /*-----------------------------------------------------------------------------------*/
  /*	Popup Buy Tokens
    /*-----------------------------------------------------------------------------------*/
  $("[data-anps-popup-open]").on("click", function (e) {
    e.preventDefault();
    console.log($(this).data("anps-popup-open"));
    $($(this).data("anps-popup-open")).addClass("anps-popup--active");
    return false;
  });

  $("[data-anps-popup-close]").on("click", function () {
    $(this).parents(".anps-popup").removeClass("anps-popup--active");
  });


  /*-----------------------------------------------------------------------------------*/
  /*	Post Carousel
    /*-----------------------------------------------------------------------------------*/

  $(".post-carousel").owlCarousel({
    loop: true,
    margin: 0,
    nav: true,
    navText: [
      '<i class="fa fa-chevron-left"></i>',
      '<i class="fa fa-chevron-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
    },
  });

  /*-----------------------------------------------------------------------------------*/
  /*	WooCommerce
    /*-----------------------------------------------------------------------------------*/

  /* Add button class to WooCommerce AJAX button */

  $(document).on("added_to_cart", function (e) {
    $(".added_to_cart").addClass("button");
  });

  /* Ordering submit (needed due to select-wrapper) */

  $(".ordering select").on("change", function () {
    $(this).parents(".ordering").submit();
  });

  /* Demo Notice */

  function demoNotice() {
    $(".site-header, .woocommerce-demo-store .top-bar").css(
      "margin-top",
      $(".demo_store_wrapper").innerHeight()
    );
  }

  if ($(".demo_store_wrapper").length) {
    $(window).on("resize", demoNotice);
    demoNotice();
  }

  /* Wrap select for styling purpuses */

  $(
    "select.dropdown_product_cat, select.dropdown_layered_nav_color, .widget_archive select, .widget_categories select, .anps-subscribe select"
  ).wrap('<div class="select-wrapper"></div>');

  /* Review Form Reset */

  $("#review_form").on("reset", function () {
    $(this).find(".stars").removeClass("selected");
    $(this).find(".stars .active").removeClass("active");
  });

  /** On remove from cart,stay open */
  $(document).ajaxComplete(function (event, xhr, settings) {
    if (settings.url.includes('wc-ajax=remove_from_cart')) {
      $('.mini-cart-content').css('display', 'block')
    }
  })

  /** When leave mini cart,close */
  $('body').on('mouseleave', '.mini-cart, .mini-cart-cantent', function () {
    $('.mini-cart-content').css('display', '')
  })


  /*-----------------------------------------------------------------------------------*/
  /*  Scroll to top button
    /*-----------------------------------------------------------------------------------*/

  /* Hide button */
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 100) {
      $(".scroll-top").removeClass("scroll-top-hide");
    } else {
      $(".scroll-top").addClass("scroll-top-hide");
    }
  });

  /* Go to top */
  $(".scroll-top").on("click", function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      800
    );

    $(this).blur();
  });

  /*-----------------------------------------------------------------------------------*/
  /*	Overwriting Visual Composer Sizing Function
    /*-----------------------------------------------------------------------------------*/

  window.vc_rowBehaviour = function () {
    function fullWidthRow() {
      var $elements = $('[data-vc-full-width="true"]');
      $.each($elements, function (key, item) {
        /* Anpthemes */
        var verticalOffset = 0;
        if ($(".anps-header--vertical").length && window.innerWidth > 1200) {
          verticalOffset = $(
            ".anps-header--vertical .anps-header__bar"
          ).innerWidth();
        }

        var boxedOffset = 0;
        if ($("body.boxed").length && window.innerWidth > 1200) {
          boxedOffset =
            ($("body").innerWidth() - $(".site-main").innerWidth()) / 2;
        }

        var $el = $(this);
        $el.addClass("vc_hidden");
        var $el_full = $el.next(".vc_row-full-width");
        $el_full.length || ($el_full = $el.parent().next(".vc_row-full-width"));
        var el_margin_left = parseInt($el.css("margin-left"), 10),
          el_margin_right = parseInt($el.css("margin-right"), 10),
          offset = 0 - $el_full.offset().left - el_margin_left,
          width = $(window).width() - verticalOffset - boxedOffset * 2,
          positionProperty = $('html[dir="rtl"]').length ? "right" : "left";

        if (positionProperty === "right") {
          verticalOffset = 0;
        }

        var options = {
          position: "relative",
          "box-sizing": "border-box",
          width: width,
        };
        options[positionProperty] = offset + verticalOffset + boxedOffset;

        $el.css(options);

        if (!$el.data("vcStretchContent")) {
          var padding = -1 * offset - verticalOffset - boxedOffset;
          0 > padding && (padding = 0);
          var paddingRight =
            width -
            padding -
            $el_full.width() +
            el_margin_left +
            el_margin_right;
          0 > paddingRight && (paddingRight = 0),
            $el.css({
              "padding-left": padding + "px",
              "padding-right": paddingRight + "px",
            });
        }
        $el.attr("data-vc-full-width-init", "true"),
          $el.removeClass("vc_hidden");
      }),
        $(document).trigger("vc-full-width-row", $elements);
    }
    window.vc_fullWidthRow = fullWidthRow;

    function parallaxRow() {
      var vcSkrollrOptions,
        callSkrollInit = !1;
      return (
        window.vcParallaxSkroll && window.vcParallaxSkroll.destroy(),
        $(".vc_parallax-inner").remove(),
        $("[data-5p-top-bottom]").removeAttr(
          "data-5p-top-bottom data-30p-top-bottom"
        ),
        $("[data-vc-parallax]").each(function () {
          var skrollrSpeed,
            skrollrSize,
            skrollrStart,
            skrollrEnd,
            $parallaxElement,
            parallaxImage,
            youtubeId;
          (callSkrollInit = !0),
            "on" === $(this).data("vcParallaxOFade") &&
            $(this)
              .children()
              .attr("data-5p-top-bottom", "opacity:0;")
              .attr("data-30p-top-bottom", "opacity:1;"),
            (skrollrSize = 100 * $(this).data("vcParallax")),
            ($parallaxElement = $("<div />")
              .addClass("vc_parallax-inner")
              .appendTo($(this))),
            $parallaxElement.height(skrollrSize + "%"),
            (parallaxImage = $(this).data("vcParallaxImage")),
            (youtubeId = vcExtractYoutubeId(parallaxImage)),
            youtubeId
              ? insertYoutubeVideoAsBackground($parallaxElement, youtubeId)
              : "undefined" != typeof parallaxImage &&
              $parallaxElement.css(
                "background-image",
                "url(" + parallaxImage + ")"
              ),
            (skrollrSpeed = skrollrSize - 100),
            (skrollrStart = -skrollrSpeed),
            (skrollrEnd = 0),
            $parallaxElement
              .attr("data-bottom-top", "top: " + skrollrStart + "%;")
              .attr("data-top-bottom", "top: " + skrollrEnd + "%;");
        }),
        callSkrollInit && window.skrollr
          ? ((vcSkrollrOptions = {
            forceHeight: !1,
            smoothScrolling: !1,
            mobileCheck: function () {
              return !1;
            },
          }),
            (window.vcParallaxSkroll = skrollr.init(vcSkrollrOptions)),
            window.vcParallaxSkroll)
          : !1
      );
    }

    function fullHeightRow() {
      var $element = $(".vc_row-o-full-height:first");
      if ($element.length) {
        var $window, windowHeight, offsetTop, fullHeight;
        ($window = $(window)),
          (windowHeight = $window.height()),
          (offsetTop = $element.offset().top),
          windowHeight > offsetTop &&
          ((fullHeight = 100 - offsetTop / (windowHeight / 100)),
            $element.css("min-height", fullHeight + "vh"));
      }
      $(document).trigger("vc-full-height-row", $element);
    }

    function fixIeFlexbox() {
      var ua = window.navigator.userAgent,
        msie = ua.indexOf("MSIE ");
      (msie > 0 || navigator.userAgent.match(/Trident.*rv\:11\./)) &&
        $(".vc_row-o-full-height").each(function () {
          "flex" === $(this).css("display") &&
            $(this).wrap('<div class="vc_ie-flexbox-fixer"></div>');
        });
    }
    var $ = window.jQuery;
    $(window)
      .off("resize.vcRowBehaviour")
      .on("resize.vcRowBehaviour", fullWidthRow)
      .on("resize.vcRowBehaviour", fullHeightRow),
      fullWidthRow(),
      fullHeightRow(),
      fixIeFlexbox(),
      vc_initVideoBackgrounds(),
      parallaxRow();
  };

  /* Date Picker (pikaday) */

  window.pikaSize = function () {
    $(".pika-single").width($("input:focus").innerWidth());

    if (
      $("input:focus").length &&
      $("input:focus").offset().top > $(".pika-single").offset().top
    ) {
      $(".pika-single").addClass("pika-above");
    } else {
      $(".pika-single").removeClass("pika-above");
    }
  };

  if (!isMobile) {
    $(".wpcf7-form .wpcf7-date").attr("type", "text");
    var picker = new Pikaday({
      field: $(".wpcf7-form .wpcf7-date")[0],
      format: "YYYY-MM-DD",
    });
  } else {
    $(".wpcf7-form .wpcf7-date").val(moment().format("YYYY-MM-DD"));
  }

  //Contact form input checkbox
  $('.wpcf7-list-item').on('click', '.wpcf7-list-item-label', function () {
    var checkbox = $(this).parent().find('input[type="checkbox"]')
    if (!checkbox.length) return
    checkbox[0].checked = !checkbox[0].checked
  })

  /* Custom Revolution Slider navigation */

  if (typeof revapi1 !== "undefined") {
    revapi1.bind("revolution.slide.onloaded", function (e) {
      function revCustomArrows() {
        if (window.innerWidth > 1199) {
          var margin = ($(window).width() - 1140) / 2;

          if ($(".boxed").length) {
            margin = 30;
          }

          leftArrow.css({
            "margin-left": margin,
            "margin-right": 0,
          });
          rightArrow.css({
            "margin-left": margin + leftArrow.innerWidth() + spacing,
          });
        } else if (window.innerWidth > 1000) {
          leftArrow.css({
            "margin-left": 0,
            "margin-right": rightArrow.innerWidth() + spacing,
          });
          rightArrow.css({
            "margin-left": 0,
          });
        } else {
          leftArrow.css({
            "margin-left": -leftArrow.innerWidth() - spacing / 2,
            "margin-right": 0,
          });
          rightArrow.css({
            "margin-left": spacing / 2,
          });
        }
      }

      if ($(".tparrows.custom").length) {
        var leftArrow = $(".tp-leftarrow.custom"),
          rightArrow = $(".tp-rightarrow.custom"),
          spacing = 12;

        $(window).on("resize", revCustomArrows);
        revCustomArrows();
      }
    });
  }

  if (isMobile) {
    $(".projects").addClass("projects-mobile");
  }

  if (typeof flexibility === "function") {
    flexibility(document.querySelector("body"));
  }

  if (typeof $.fn.zoom === "function") {
    $(document).ready(function () {
      $(".zoom").zoom();
    });
  }

  function responsiveOptions() {
    $("[data-rstyle]").each(function () {
      var rstyles = $(this).data("rstyle").split(";");
      var $el = $(this);

      rstyles.forEach(function (rstyle) {
        if (rstyle !== "") {
          rstyle = rstyle.split(":");
          var name = rstyle[0];
          var values = rstyle[1].split("|");

          var nextValue = values[3];

          if (window.innerWidth < screenSmall && values[0] !== "") {
            nextValue = values[0];
          } else if (window.innerWidth < screenMedium && values[1] !== "") {
            nextValue = values[1];
          } else if (window.innerWidth < screenLarge && values[2] !== "") {
            nextValue = values[2];
          }

          var multipleValues = nextValue.split(" ");

          if (multipleValues.length > 1) {
            nextValue = "";

            multipleValues.forEach(function (val) {
              nextValue += nextValue !== "" ? " " : "";
              nextValue += val;
              nextValue += parseInt(val) == val && val !== "" ? "px" : "";
            });
          } else {
            nextValue += parseInt(nextValue) == nextValue ? "px" : "";
          }

          $el.css(name, nextValue);
        }
      });
    });
  }

  $(window).on("resize", responsiveOptions);
  responsiveOptions();

  $.fn.hoverStyles = function () {
    $(this).on("mouseenter", function () {
      $(this)
        .find("[data-hstyle]")
        .each(function () {
          var hStyle = $(this).data("hstyle");
          if (hStyle !== "") {
            $(this).attr("data-bstyle", $(this).attr("style"));
            $(this).css(hStyle);
          }
        });
    });

    $(this).on("mouseleave", function () {
      $(this)
        .find("[data-hstyle]")
        .each(function () {
          $(this).attr("style", $(this).data("bstyle"));
        });
    });
  };

  $(".anps-link").hoverStyles();

  function sideContainer() {
    $(".anps-side-container").each(function () {
      if (window.innerWidth > 991) {
        var spaceWidth = ($("body").width() - $(".container").width()) / 2;
        var columnWidth = $(this).parents(".wpb_wrapper").width();

        var style = {
          width: spaceWidth + columnWidth + "px",
        };

        if ($(".vc_editor").length) {
          if ($(this).parents(".vc_vc_column").index() === 0) {
            style["left"] = -spaceWidth + "px";
          }
        } else {
          if ($(this).parents(".wpb_column").index() === 0) {
            style["left"] = -spaceWidth + "px";
          }
        }

        $(this).css(style);
      } else {
        $(this).css({
          right: "auto",
          width: "auto",
        });
      }
    });
  }

  $(window).on("resize", sideContainer);
  sideContainer();

  /*-----------------------------------------------------------------------------------*/
  /*	Logos
    /*-----------------------------------------------------------------------------------*/

  $(".anps-logos .owl-carousel").each(function () {
    var $el = $(this);
    var owlcolumns = $el.data("col");
    var enoughItems = $el.find(".anps-logos__item").length > owlcolumns;
    var speed = $el.data("speed");
    var owlSettings = {
      loop: enoughItems,
      mouseDrag: enoughItems,
      touchDrag: enoughItems,
      pullDrag: enoughItems,
      margin: 40,
      dots: false,
      responsiveClass: true,
      rtl: $('html[dir="rtl"]').length > 0,
      stagePadding: 2,
      autoplay: speed !== "" && speed !== undefined,
      autoplayTimeout: speed,
      autoplayHoverPause: true,
      responsive: {
        0: {
          items: 1,
          slideBy: 1,
        },
        450: {
          items: 2,
          slideBy: 1,
        },
        992: {
          items: owlcolumns,
          slideBy: 1,
        },
      },
    };
    $el.owlCarousel(owlSettings);
  });

  /* Full width autoplay */

  var logosInitial = true;

  function logosAutoplay() {
    $(".anps-logos__outer-wrap").each(function () {
      if ($(this).parents(".anps-logos--fullwidth").length) {
        if (logosInitial) {
          $(this).html($(this).html() + $(this).html());
        }
        var width = 0;
        $(this)
          .children()
          .each(function () {
            width += $(this).innerWidth();
          });
        $(this).width(width);
      }
    });

    logosInitial = false;
  }

  $(window).on("load", logosAutoplay);
  $(window).on("resize", logosAutoplay);

  /* Frame */

  function anpsFrame() {
    $(".anps-frame--spacing").each(function () {
      $(this).css("padding-bottom", $(".anps-frame__img").height());
    });
  }

  $(window).on("load", anpsFrame);
  $(window).on("resize", anpsFrame);

  function stickyInit() {
    var $window = $(window);
    var $adminBar = $("#wpadminbar");
    var $content = $(".anps-header__content");
    var $bar = $(".anps-header__bar");

    $window.on("scroll resize", sticky);
    sticky();

    function sticky() {
      if (!$(".anps-header__sticky-wrap").length) {
        $bar.wrap('<div class="anps-header__sticky-wrap"></div>');
      }
      var stickyClass = "anps-header--sticky";
      var $wrap = $(".anps-header__sticky-wrap");

      if (!$wrap.length) return;

      var distance = $wrap.offset().top;
      var offset = 0;

      if ($adminBar.length && window.innerWidth > 601) {
        offset += $adminBar.height();
      }

      var height =
        window.innerWidth > 991 ? $bar.data("height") : $bar.data("m-height");
      $(".anps-header__sticky-wrap").height(height);

      if ($window.scrollTop() > distance - offset) {
        if (!$(".anps-header").hasClass(stickyClass)) {
          $(".anps-header").addClass(stickyClass);
        }
        $bar.css({
          top: offset,
        });
      } else {
        $bar.removeAttr("style");
        $(".anps-header").removeClass(stickyClass);
      }
    }
  }

  if ($(".stickyheader").length) {
    stickyInit();
  }

  function timelineLayout() {
    $(
      ".anps-timeline--style-2 .anps-timeline__item + .anps-timeline__item"
    ).each(function () {
      if (window.innerWidth > screenMedium) {
        var margin = $(this).prev().innerHeight();
        if (margin > 100) {
          margin -= margin / 3;
        }

        $(this).css({
          marginTop: margin,
        });
      } else {
        $(this).css({
          marginTop: 40,
        });
      }
    });
  }

  timelineLayout();
  $(window).on("resize", timelineLayout);

  function testCSSVariables() {
    var color = "rgb(255, 198, 0)";
    var el = document.createElement("span");

    el.style.setProperty("--color", color);
    el.style.setProperty("background", "var(--color)");
    document.body.appendChild(el);

    var styles = getComputedStyle(el);
    var doesSupport = styles.backgroundColor === color;
    document.body.removeChild(el);
    return doesSupport;
  }

  if (!testCSSVariables()) {
    /* Variable in style */
    $(".anps-recent-news[data-link-color]").each(function () {
      var color = $(this).data("link-color");

      $(this).find(".post-meta a").css({
        color: color,
      });
    });

    /* Load static styles */
    $.post(
      anps.ajaxurl,
      {
        action: "anps_style_fallback",
      },
      function (response) {
        $("head").append("<style>" + response + "</style>");
      }
    );
  }

  function searchToggle() {
    $(".site-search").toggleClass("site-search--active");

    var height = 0;

    if ($(".site-search--active").length) {
      height = $(".site-search__form").innerHeight();
      $(".menu-search-toggle i").removeClass("fa-search").addClass("fa-close");
    } else {
      $(".menu-search-toggle i").removeClass("fa-close").addClass("fa-search");
    }

    $(".site-search").height(height);
  }

  $(".menu-search-toggle").on("click", function () {
    if ($("html").scrollTop() === 0) {
      searchToggle();
    } else {
      $("html").animate(
        {
          scrollTop: 0,
        },
        400,
        searchToggle
      );
    }
  });

  function headerBottom() {
    if (window.innerWidth > 991) {
      $(".anps-header--bottom .anps-header__wrap").css({
        top:
          window.innerHeight -
          $("#wpadminbar").height() -
          $(".anps-header__bar").innerHeight(),
      });
    } else {
      $(".anps-header--bottom .anps-header__wrap").css({
        top: "auto",
      });
    }
  }
  headerBottom();
  $(window).on("resize", headerBottom);

  /* Newsletter */

  $(".anps-subscribe").each(function () {
    if (
      $(this).find(".tnp-field:not(.tnp-field-privacy):not(.tnp-field-button)")
        .length > 1
    ) {
      $(this).addClass("anps-subscribe--multiple");
      $(this)
        .find(".tnp-submit")
        .addClass("anps-btn anps-btn--md anps-btn--style-0");
    } else {
      $(this).addClass("anps-subscribe--single");
    }
  });

  $(".tnp-field-privacy").each(function () {
    $(this).find("input").attr("id", "tnp-privacy").prependTo($(this));
    $(this).find("label").attr("for", "tnp-privacy");
  });

  $(".tnp-widget").each(function () {
    if (
      $(this).find(".tnp-field:not(.tnp-field-privacy):not(.tnp-field-button)")
        .length > 1
    ) {
      $(this).addClass("tnp-widget--multiple");
      $(this)
        .find(".tnp-submit")
        .addClass("anps-btn anps-btn--md anps-btn--style-0");
    } else {
      $(this).addClass("tnp-widget--single");
    }
  });
});

function anpsSlider(options) {
  var $ = jQuery;

  options.color = typeof options.color !== "undefined" ? options.color : "#000";

  options.api.bind("revolution.slide.layeraction", function (e, data) {
    if (!$(this).find(".anps-slider-progress div").length) {
      $(this)
        .find(".anps-slider-progress")
        .append(
          '<div style="background-color: ' +
          options.color +
          "; width: " +
          (options.current / options.max) * 100 +
          '%"></div>'
        );
    }
  });
}

jQuery(".wpcf7-list-item-label", ".wpcf7-list-item-label").on(
  "click",
  function () {
    var corrChkbx = jQuery(this).prev('input[type="checkbox"]'),
      checkedVal = corrChkbx.prop("checked");

    corrChkbx.prop("checked", !checkedVal);
  }
);
