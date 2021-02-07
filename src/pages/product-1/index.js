import "../../assets/Common";
import "./index.scss";
import "./index.html";

// 绑定事件
$(document).ready(() => {
  $(".header").addClass("black");
  // 滚动事件
  $(window).scroll(() => {
    if (
      (window.innerWidth > 768 && $(document).scrollTop() > 68) ||
      (window.innerWidth <= 768 && $(document).scrollTop() > 48)
    ) {
      $(".product-header").css("position", "fixed");
    } else {
      $(".product-header").css("position", "static");
    }
  });
  // 导航条选中
  $(".navbar-wrap li a").eq(2).addClass("active");
  // 视频
  let videoIntervalEvent = window.setInterval(() => {
    if (
      $(".video-section video")[0] &&
      $(".video-section video")[0].readyState === 4
    ) {
      window.clearInterval(videoIntervalEvent);
      $(".video-section video")[0].play();
      videoIntervalEvent = window.setInterval(() => {
        if ($(".video-section video")[0].currentTime > 3.5) {
          $(".video-section video")[0].pause();
          window.clearInterval(videoIntervalEvent);
        }
      }, 100);
    }
  }, 500);
  $(".advantage-section .view-video").click(() => {
    window.openVideo("./file/video.mp4");
  });
  // 轮播图
  Array.from($(".carousel-wrap li")).forEach((li, index) => {
    $(li).click(() => {
      if (!$(li).hasClass("active")) {
        $(".carousel-wrap li").removeClass("active");
        $(li).addClass("active");
        $("#advantage-section-carousel li").eq(index).click();
      }
    });
  });
  $("#advantage-section-carousel").on("slide.bs.carousel", (event) => {
    $(".carousel-wrap li").removeClass("active");
    $(".carousel-wrap li").eq(event.to).addClass("active");
  });
  // 采集面积大
  $("#collect-high-area-carousel").on("slide.bs.carousel", (event) => {
    $(".collect-high-area h3").eq(0).toggle();
    $(".collect-high-area h3").eq(1).toggle();
  });
  // 多重防护，增强您的体验
  $(".protect-section .arrow-wrap .arrow-icon").click((el) => {
    const $el = $(el.target);
    if ($el.hasClass("right")) {
      $(".protect-section .row").animate(
        {
          scrollLeft: $(".protect-section .row")[0].offsetWidth,
        },
        800
      );
      //
      $(".protect-section .arrow-wrap:not(.hidden)").fadeOut(0);
      $(".protect-section .arrow-wrap.hidden").fadeIn(0);
      $(".protect-section .scroll-bar.full").css("left", "33.33%");
    } else {
      $(".protect-section .row").animate(
        {
          scrollLeft: 0,
        },
        800
      );
      $(".protect-section .arrow-wrap:not(.hidden)").fadeIn(0);
      $(".protect-section .arrow-wrap.hidden").fadeOut(0);
      $(".protect-section .scroll-bar.full").css("left", "0");
    }
  });
});
