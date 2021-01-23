import "../../assets/Common";
import "./index.scss";
import "./index.html";

// 绑定事件
$(document).ready(() => {
  $("header.header").addClass("brown").addClass("transparent");
  $(".scroll-nav-wrap").addClass("white");
  // 滚动事件
  $(window).scroll(() => {
    // header 是否透明
    if ($(".bg-section h1.title")[0].getBoundingClientRect().top > 68) {
      $("header.header").addClass("transparent");
    } else {
      $("header.header").removeClass("transparent");
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
    window.openVideo("./file/video.mp4");
  });
  $(".class-section .class-wrap").click((event) => {
    window.openVideo(
      [
        "./file/现实图像搜索难题对AI的极限挑战.mp4",
        "./file/异构并行计算和性能优化.mp4",
        "./file/持久内存在图像搜索系统中的应用.mp4",
        "./file/3D-AI.mp4",
      ][$(event.target).index()]
    );
  });
});
