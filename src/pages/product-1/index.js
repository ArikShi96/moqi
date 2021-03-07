import "../../assets/Common";
import "./index.scss";
import "./index.html";

// 绑定事件
$(document).ready(() => {
  $(".header").addClass("black");
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
  // 导航条选中
  $(".navbar-wrap li a").eq(2).addClass("active");
  // 视频
  // h5下自动播放不可用
  const videoIntervalEvent = window.setInterval(() => {
    if ($(".video-section video:visible")[0].currentTime > 3.5) {
      $(".video-section video:visible")[0].pause();
      window.clearInterval(videoIntervalEvent);
    }
  }, 100);
  $(".advantage-section .view-video").click(() => {
    window.openVideo({
      url: "./file/video.mp4",
      muted: true,
      isFullScreen: window.innerWidth <= 500,
    });
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
  // mobile 多重防护，增强您的体验分页
  (() => {
    let currentPage = 0;
    $(".protect-section .pagination-wrap img").on("click", (event) => {
      const $el = $(event.target);
      // 右滚动
      if ($el.index() === 1) {
        if (currentPage === 2) {
          return;
        }
        currentPage += 1;
      }
      // 左滚动
      if ($el.index() === 0) {
        if (currentPage === 0) {
          return;
        }
        currentPage -= 1;
      }
      $(".protect-section .mobile-view .row").animate(
        {
          scrollLeft:
            currentPage *
            $(".protect-section .mobile-view .row .col-11")[0].offsetWidth,
        },
        500
      );
      // 设置滚动条
      $(".protect-section .pagination-wrap .scroll-bar.full").css(
        "left",
        `${33.33 * currentPage}%`
      );
      // 设置图片
      $(".protect-section .pagination-wrap img")
        .eq(0)
        .attr(
          "src",
          `./bg-img/img/about/about-arrow-left${
            currentPage === 0 ? "-disabled" : ""
          }.png`
        );
      $(".protect-section .pagination-wrap img")
        .eq(1)
        .attr(
          "src",
          `./bg-img/img/about/about-arrow-right${
            currentPage === 2 ? "-disabled" : ""
          }.png`
        );
    });
    window.setInterval(() => {
      if (currentPage === 2) {
        currentPage = -1;
      }
      $(".protect-section .pagination-wrap img").eq(1).click();
    }, 3000);
  })();
});
