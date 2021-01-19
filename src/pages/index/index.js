import "../../assets/Common";
import "./index.scss";
import "./index.html";

// 绑定事件
$(document).ready(() => {
  $("header.header").addClass("brown").addClass("transparent");
  // 滚动事件
  $(window).scroll(() => {
    if ($(".bg-section h1.title")[0].getBoundingClientRect().top > 68) {
      $("header.header").addClass("transparent");
    } else {
      $("header.header").removeClass("transparent");
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
    window.open(
      "./file/video.mp4",
      "Video",
      `width=${window.innerWidth / 2},height=${
        (window.innerWidth / 2) * 0.56
      },top=200,left=${
        window.innerWidth / 4
      },menubar=no,toolbar=no, status=no,scrollbars=yes`
    );
  });
});
