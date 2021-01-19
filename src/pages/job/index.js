import "../../assets/Common";
import "./index.scss";
import "./index.html";

// 绑定事件
$(document).ready(() => {
  $("header.header").addClass("job").addClass("transparent");
  // 滚动事件
  $(window).scroll(() => {
    if ($(".bg-section h1.title")[0].getBoundingClientRect().top > 68) {
      $("header.header").addClass("transparent");
    } else {
      $("header.header").removeClass("transparent");
    }
  });
});
