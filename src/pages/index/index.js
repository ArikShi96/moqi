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
        "https://seafile.moqi.com.cn/seafhttp/files/7d482ecf-dcde-4fc8-8b72-8989219000db/%E6%B1%A4%E6%9E%97%E9%B9%8F%EF%BC%9A%E7%8E%B0%E5%AE%9E%E5%9B%BE%E5%83%8F%E6%90%9C%E7%B4%A2%E9%9A%BE%E9%A2%98%E5%AF%B9%20AI%20%E7%9A%84%E6%9E%81%E9%99%90%E6%8C%91%E6%88%98.mp4",
        "https://seafile.moqi.com.cn/seafhttp/files/70d86a1e-7146-49b4-85ae-529e4f5a914b/%E5%BC%A0%E9%9D%92%E7%AC%9B%EF%BC%9A%E5%BC%82%E6%9E%84%E5%B9%B6%E8%A1%8C%E8%AE%A1%E7%AE%97%E5%92%8C%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96.mp4",
        "https://seafile.moqi.com.cn/seafhttp/files/e64f3806-1745-49f4-8199-fab1ce37cd31/%E5%88%98%E5%8B%A4%EF%BC%9A%E6%8C%81%E4%B9%85%E5%86%85%E5%AD%98%E5%9C%A8%E5%9B%BE%E5%83%8F%E6%90%9C%E7%B4%A2%E7%B3%BB%E7%BB%9F%E4%B8%AD%E7%9A%84%E5%BA%94%E7%94%A8.mp4",
        "./file/3D-AI.mp4",
      ][$(event.target).index()]
    );
  });
});
