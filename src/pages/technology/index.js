import "../../assets/Common";
import "./index.scss";
import "./index.html";

// 绑定事件
$(document).ready(() => {
  $("header.header").addClass("black").addClass("transparent");
  $(".scroll-nav-wrap").addClass("white");
  // 导航条选中
  $(".navbar-wrap li a").eq(1).addClass("active");
  // 滚动事件
  $(window).scroll(() => {
    // header 是否透明
    if ($(".bg-section")[0].getBoundingClientRect().top === 0) {
      $("header.header").addClass("transparent").removeClass("white");
    } else {
      $("header.header").removeClass("transparent").addClass("white");
    }
    // 侧边滚动条颜色
    if (
      $("section.search-section")[0].getBoundingClientRect().top <
      $(".scroll-nav-wrap")[0].offsetTop + $(".scroll-nav-wrap ul")[0].offsetTop
    ) {
      $(".scroll-nav-wrap").removeClass("white");
    } else {
      $(".scroll-nav-wrap").addClass("white");
    }
  });
  // 根据hash值滚动到某个section
  const hash = window.location.hash.split("#")[1];
  if (hash) {
    window.setTimeout(() => {
      $("section.section")
        .eq(parseInt(hash, 10) || 0)
        .animatescroll({
          padding: window.innerWidth < 500 ? 65 : 60,
        });
    }, 0);
  }
});
