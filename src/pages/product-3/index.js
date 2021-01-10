import "../../assets/Common";
import "./index.scss";
import "./index.html";

$(document).ready(() => {
  Array.from($(".service-section .service-nav li")).forEach((li, index) => {
    $(li).click(() => {
      if (!$(li).hasClass("active")) {
        $(".service-section .service-nav li").removeClass("active");
        $(li).addClass("active");
        const scrollLeft = index * $(".service-section .row").width();
        $(".service-section .row").animate(
          {
            scrollLeft: Math.abs(scrollLeft),
          },
          1000
        );

        $(".service-nav").css("left", `${15 + scrollLeft}px`);
        currentIndex = index;
      }
    });
  });
});
