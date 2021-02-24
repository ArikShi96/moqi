import "../../assets/Common";
import "./index.scss";
import "./index.html";
$(document).ready(() => {
  // 滚动事件
  $(window).scroll(() => {
    if (
      (window.innerWidth > 767 && $(document).scrollTop() > 68) ||
      (window.innerWidth <= 767 && $(document).scrollTop() > 48)
    ) {
      $(".product-header").css("position", "fixed");
    } else {
      $(".product-header").css("position", "static");
    }
  });
});
