import "../../assets/Common";
import "./index.scss";
import "./index.html";

// 绑定事件
$(document).ready(() => {
  // IE 解决高度塌陷
  let initIeHeight = $(".advantage-wrap")[0].clientHeight;
  function resetAdvantageWrapHeight() {
    let ieImgHeight = 0;
    Array.from($(".advantage-wrap .img-wrap")).forEach((el) => {
      if (el.clientHeight === 0) {
        ieImgHeight =
          ieImgHeight > $(el).find(".hidden-img")[0].clientHeight
            ? ieImgHeight
            : $(el).find(".hidden-img")[0].clientHeight;
      }
    });
    if (ieImgHeight > 0) {
      $(".advantage-wrap").css("height", `${ieImgHeight + initIeHeight}px`);
    }
  }
  if ($(".advantage-wrap .img-wrap").css("height") === "0px") {
    resetAdvantageWrapHeight();
    $(window).resize(() => {
      resetAdvantageWrapHeight();
    });
  }
  $("header.header").addClass("black").addClass("transparent");
  $(".scroll-nav-wrap").addClass("white");
  // 导航条选中
  $(".navbar-wrap li a").eq(0).addClass("active");
  // 滚动事件
  $(window).scroll(() => {
    // header 是否透明
    if (
      !$(".navbar-wrap-mobile").is(":visible") &&
      !$("header.header .product-nav-header").is(":visible")
    ) {
      if ($(".bg-section")[0].getBoundingClientRect().top === 0) {
        $("header.header").addClass("transparent").removeClass("white");
      } else {
        $("header.header").removeClass("transparent").addClass("white");
      }
    }
    // 侧边滚动条颜色
    if (
      $("section.creativity-section")[0].getBoundingClientRect().top <
      $(".scroll-nav-wrap")[0].offsetTop + $(".scroll-nav-wrap ul")[0].offsetTop
    ) {
      $(".scroll-nav-wrap").removeClass("white");
    } else {
      $(".scroll-nav-wrap").addClass("white");
    }
  });
  // 轮播图
  Array.from($(".carousel-wrap li")).forEach((li, index) => {
    $(li).click(() => {
      if (!$(li).hasClass("active")) {
        $(".carousel-wrap li").removeClass("active");
        $(li).addClass("active");
        $("#home-page-carousel li").eq(index).click();
      }
    });
  });
  $("#home-page-carousel").on("slide.bs.carousel", (event) => {
    $(".carousel-wrap li").removeClass("active");
    $(".carousel-wrap li").eq(event.to).addClass("active");
  });
  // 播放视频
  $(".bg-section .video-wrap").click(() => {
    window.openVideo({ url: "./file/video.mp4", muted: true });
  });
  $(".class-section .class-wrap").click((event) => {
    let $el = $(event.target);
    if (!$el.hasClass("class-wrap")) {
      $el = $el.parent(".class-wrap");
    }
    if (!$el.data("index") && $el.data("index") !== 0) {
      return;
    }
    // 清空所有样式
    const closeCallback = () => {
      $(".class-section .class-wrap").removeClass("bg-visible");
    };
    closeCallback();
    $(".class-section .class-wrap")
      .eq($el.data("index"))
      .addClass("bg-visible");
    // 打开视频
    window.openVideo({
      url: [
        "./file/现实图像搜索难题对AI的极限挑战.mp4",
        "./file/异构并行计算和性能优化.mp4",
        "./file/持久内存在图像搜索系统中的应用.mp4",
        "./file/3D-AI.mp4",
      ][$el.data("index")],
      closeCallback,
    });
  });
});
