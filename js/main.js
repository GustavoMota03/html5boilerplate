$(function () {
  let svg =
    '<svg width="51" height="50" viewBox="0 0 51 50" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.53125 25C1.53125 11.6211 12.3711 0.78125 25.75 0.78125C39.1289 0.78125 49.9688 11.6211 49.9688 25C49.9688 38.3789 39.1289 49.2188 25.75 49.2188C12.3711 49.2188 1.53125 38.3789 1.53125 25ZM30.0469 36.3281V25H36.9707C38.0156 25 38.543 23.7305 37.8008 22.998L26.5801 11.8359C26.1211 11.377 25.3887 11.377 24.9297 11.8359L13.6992 22.998C12.957 23.7402 13.4844 25 14.5293 25H21.4531V36.3281C21.4531 36.9727 21.9805 37.5 22.625 37.5H28.875C29.5195 37.5 30.0469 36.9727 30.0469 36.3281Z" fill="#00fff2"></path></svg>';
  //document
  //console.log(window.location.href);
  //window.location.href = "https://google.com";

  let btn = $(".scrollToTopBtn");
  let cvBtn = $(".cvBtn");
  let contactoBtn = $(".contactoBtn");
  let artBtn = $(".artBtn");
  let bgBtn = $(".bgBtn");
  let mbBtn = $(".mobile");
  let inv = $(".invisible");
  btn.append(svg);

  var scrollToTopBtn = btn[0];
  var rootElement = document.documentElement;

  function handleScroll() {
    // Do something on scroll
    var scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
    if (rootElement.scrollTop / scrollTotal > 0.05) {
      // Show button
      scrollToTopBtn.classList.add("showBtn");
    } else {
      // Hide button
      scrollToTopBtn.classList.remove("showBtn");
    }
  }

  function Mobile() {
    if (mbBtn.hasClass("showMobile")) {
      mbBtn.removeClass("showMobile");
      $(inv).addClass("none");
    } else {
      mbBtn.addClass("showMobile");
      $(inv).removeClass("none");
    }
  }
  function scrollToTop() {
    // Scroll to top logic
    rootElement.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function scrollToCV() {
    $("html, body").animate(
      {
        scrollTop: $("#cv_cont").offset().top,
      },
      500
    );
    mbBtn.removeClass("showMobile");
    $(inv).addClass("none");
  }

  function scrollToArt() {
    $("html, body").animate(
      {
        scrollTop: $("#art").offset().top,
      },
      500
    );
    mbBtn.removeClass("showMobile");
    $(inv).addClass("none");
  }

  $(".invisible").on("click", function (e) {
    if (mbBtn.hasClass("showMobile")) {
      mbBtn.removeClass("showMobile");
      $(inv).addClass("none");
    }
  });

  //scrollToTopBtn.addEventListener("click", scrollToTop);

  btn.click(scrollToTop);
  cvBtn.click(scrollToCV);
  artBtn.click(scrollToArt);
  bgBtn.click(Mobile);
  document.addEventListener("scroll", handleScroll);

  function detectSections(e) {
    var sections = $(".sections.animatable:not(.active)");
    for (var i = 0; i < sections.length; i++) {
      var obj = sections[i];
      if (obj == null) continue;
      if (inWindow(obj)) {
        lazyLoad($(sections[i]).find(".lazy"),imageCallback);
        lazyLoad($(sections[i]).find(".lazy2"), bgCallback);
        $(sections[i]).addClass("active");
      }
    }
  }

  $(window).on("scroll", detectSections).trigger("scroll");

  function inWindow(obj) {
    return obj.getBoundingClientRect().top < $(window).height();
  }
});
var bgCallback = function (image, jsImage) {
  $(image).css({
    "background-image": "url(" + jsImage.src + ")",
  });
};

var imageCallback = function (image, jsImage) {
  $(image).attr("src", jsImage.src);
};
function lazyLoad(elements, cbk) {
  elements.each((idx, image) => {
    var jsImage = new Image();

    jsImage.onload = function () {
      cbk(image, jsImage);
    };

    jsImage.src = image.dataset.src;
  });
}



// document.addEventListener("DOMContentLoaded", function () {
//   var lazyloadImages;

//   if ("IntersectionObserver" in window) {
//     lazyloadImages = document.querySelectorAll(".lazy");
//     var imageObserver = new IntersectionObserver(function (entries, observer) {
//       entries.forEach(function (entry) {
//         if (entry.isIntersecting) {
//           var image = entry.target;
//           image.src = image.dataset.src;
//           image.classList.remove("lazy");
//           imageObserver.unobserve(image);
//         }
//       });
//     });

//     lazyloadImages.forEach(function (image) {
//       imageObserver.observe(image);
//     });
//   } else {
//     var lazyloadThrottleTimeout;
//     lazyloadImages = document.querySelectorAll(".lazy");

//     function lazyload() {
//       if (lazyloadThrottleTimeout) {
//         clearTimeout(lazyloadThrottleTimeout);
//       }

//       lazyloadThrottleTimeout = setTimeout(function () {
//         var scrollTop = window.pageYOffset;
//         lazyloadImages.forEach(function (img) {
//           if (img.offsetTop < window.innerHeight + scrollTop) {
//             img.src = img.dataset.src;
//             img.classList.remove("lazy");
//           }
//         });
//         if (lazyloadImages.length == 0) {
//           document.removeEventListener("scroll", lazyload);
//           window.removeEventListener("resize", lazyload);
//           window.removeEventListener("orientationChange", lazyload);
//         }
//       }, 20);
//     }

//     document.addEventListener("scroll", lazyload);
//     window.addEventListener("resize", lazyload);
//     window.addEventListener("orientationChange", lazyload);
//   }
// });