import "../../assets/Common";
import "./index.scss";
import "./index.html";

$(document).ready(() => {
  Array.from($(".service-section .service-nav li")).forEach((li, index) => {
    $(li).click(() => {
      $(".service-section .row")
        .eq(index % 3)
        .animatescroll({ padding: 20 });
    });
  });
});
