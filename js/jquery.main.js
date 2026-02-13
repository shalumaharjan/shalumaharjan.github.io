jQuery(function () {
  //   initMenuOpener();
  initSmoothScroll();
  initPreventEmptyAnchor();
});

function initPreventEmptyAnchor() {
  jQuery('a[href="#"]').click(function (e) {
    e.preventDefault();
  });
}

function initMenuOpener() {
  jQuery(".jsxNavTgr").click(function () {
    jQuery("body").toggleClass("navActive");
  });
}

function initSmoothScroll() {
  $('a[href*="#pgroll"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function (event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length
          ? target
          : $("[name=" + this.hash.slice(1) + "]");
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $(this)
            .parent("li")
            .not(jQuery(this).parent())
            .each(function () {
              $(this).removeClass("active");
            });
          $(this).parent("li").addClass("active");
          $("html, body").animate(
            {
              scrollTop: target.offset().top - 100,
            },
            1000,
            function () {
              // Callback after animation
              // Must change focus!
              var $target = $(target);
              $target.focus();
              if ($target.is(":focus")) {
                // Checking if the target was focused
                return false;
              } else {
                // $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                $target.focus(); // Set focus again
              }
              // $(document).on("scroll", onScroll);
            },
          );
        }
      }
    });
}

// function initSmoothScroll() {
//   // Cache selectors
//   var lastId,
//     topMenu = jQuery(".site-nav"),
//     topMenuHeight = -6,
//     // All list items
//     menuItems = topMenu.find("a"),
//     // Anchors corresponding to menu items
//     scrollItems = menuItems.map(function () {
//       var item = $($(this).attr("href"));
//       if (item.length) {
//         return item;
//       }
//     });

//   // Bind click handler to menu items
//   // so we can get a fancy scroll animation
//   menuItems.click(function (e) {
//     var href = $(this).attr("href"),
//       offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
//     $("html, body").stop().animate(
//       {
//         scrollTop: offsetTop,
//       },
//       800,
//     );
//     e.preventDefault();
//   });

//   // Bind to scroll
//   $(window).scroll(function () {
//     // Get container scroll position
//     var fromTop = $(this).scrollTop() + topMenuHeight;

//     // Get id of current scroll item
//     var cur = scrollItems.map(function () {
//       if ($(this).offset().top < fromTop) return this;
//     });
//     // Get the id of the current element
//     cur = cur[cur.length - 1];
//     var id = cur && cur.length ? cur[0].id : "";

//     if (lastId !== id) {
//       lastId = id;
//       // Set/remove active class
//       menuItems
//         .parent()
//         .removeClass("scractive")
//         .end()
//         .filter("[href='#" + id + "']")
//         .parent()
//         .addClass("scractive");
//       var sclbl = menuItems.filter("[href='#" + id + "']").html();
//       jQuery(".jsxScroller").html(sclbl);
//     }
//   });
// }
