/* eslint-disable indent */
import "../../assets/Common";
import "./index.scss";
import "./index.html";

// 绑定事件
$(document).ready(() => {
  let currentPage = 1;
  $("header.header").addClass("black").addClass("transparent");
  $(".scroll-nav-wrap").addClass("white");
  // 播放视频
  // let videoIntervalEvent = window.setInterval(() => {
  //   if (
  //     $(".video-section video")[0] &&
  //     $(".video-section video")[0].readyState === 4
  //   ) {
  //     window.clearInterval(videoIntervalEvent);
  //     $(".video-section video")[0].play();
  //     videoIntervalEvent = window.setInterval(() => {
  //       if ($(".video-section video")[0].currentTime > 3.5) {
  //         $(".video-section video")[0].pause();
  //         window.clearInterval(videoIntervalEvent);
  //       }
  //     }, 100);
  //   }
  // }, 500);
  // 创始人左右滚动
  (() => {
    let totalWidth = 0;
    Array.from($(".team-section .row .col-12")).forEach((el) => {
      totalWidth += el.offsetWidth;
    });
    const totalPage = Math.ceil(
      totalWidth / $(".team-section .row")[0].offsetWidth
    );
    $(".team-section .scroll-wrap .scroll-bar.full").width(
      (1 / totalPage) * 100
    );
  })();
  $(".team-section .left-icon").click(() => {
    if (currentPage === 1) {
      return;
    }
    currentPage -= 1;
    $(".team-section .row").animate(
      {
        scrollLeft: (currentPage - 1) * $(".team-section .row")[0].offsetWidth,
      },
      500
    );
    if (currentPage === 1) {
      $(".team-section .left-icon").addClass("disabled");
    } else {
      $(".team-section .left-icon").removeClass("disabled");
    }
    $(".team-section .right-icon").removeClass("disabled");
    // 滚动条位置
    let totalWidth = 0;
    Array.from($(".team-section .row .col-12")).forEach((el) => {
      totalWidth += el.offsetWidth;
    });
    const totalPage = Math.ceil(
      totalWidth / $(".team-section .row")[0].offsetWidth
    );
    $(".team-section .scroll-wrap .scroll-bar.full")
      .width((1 / totalPage) * 100)
      .css("left", `${(currentPage - 1) * (1 / totalPage) * 100}px`);
  });
  $(".team-section .right-icon").click(() => {
    let totalWidth = 0;
    Array.from($(".team-section .row .col-12")).forEach((el) => {
      totalWidth += el.offsetWidth;
    });
    const totalPage = Math.ceil(
      totalWidth / $(".team-section .row")[0].offsetWidth
    );
    if (currentPage === totalPage) {
      return;
    }
    currentPage += 1;
    $(".team-section .row").animate(
      {
        scrollLeft:
          currentPage === totalPage && totalPage === 2
            ? ((currentPage - 1) * $(".team-section .row")[0].offsetWidth * 2) /
              3
            : (currentPage - 1) * $(".team-section .row")[0].offsetWidth,
      },
      500
    );
    if (currentPage === totalPage) {
      $(".team-section .right-icon").addClass("disabled");
    } else {
      $(".team-section .right-icon").removeClass("disabled");
    }
    $(".team-section .left-icon").removeClass("disabled");
    // 滚动条位置
    $(".team-section .scroll-wrap .scroll-bar.full")
      .width((1 / totalPage) * 100)
      .css("left", `${(currentPage - 1) * (1 / totalPage) * 100}px`);
  });
  // window.setInterval(() => {
  //   $(".team-section .right-icon").click();
  // }, 3000);
  window.addEventListener(
    "resize",
    () => {
      $(".team-section .row").animate(
        {
          scrollLeft: 0,
        },
        0
      );
      currentPage = 1;
      $(".team-section .left-icon").addClass("disabled");
      $(".team-section .right-icon").removeClass("disabled");
      // 滚动条位置
      let totalWidth = 0;
      Array.from($(".team-section .row .col-12")).forEach((el) => {
        totalWidth += el.offsetWidth;
      });
      const totalPage = Math.ceil(
        totalWidth / $(".team-section .row")[0].offsetWidth
      );
      $(".team-section .scroll-wrap .scroll-bar.full")
        .width((1 / totalPage) * 100)
        .css("left", "0");
    },
    false
  );
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
      $("section.info-section")[0].getBoundingClientRect().top <
      $(".scroll-nav-wrap")[0].offsetTop + $(".scroll-nav-wrap ul")[0].offsetTop
    ) {
      $(".scroll-nav-wrap").removeClass("white");
    } else {
      $(".scroll-nav-wrap").addClass("white");
    }
  });
  // 获取news
  window.isDev = true;
  window
    .Http({
      url: `${
        window.isDev ? "" : "https://moqi.com.cn"
      }/api/news/actived/?limit=5&offset=0`,
      type: "GET",
      data: {},
      isDefaultApiRequest: false,
      success: function (data) {
        data.data.forEach((item, index) => {
          const html = `
            <div
              class="news-img"
              style="background-image: url(${item.cover_image});
              "alt=""
            ></div>
            <div class="news-content">
              <div class="time-tag">${new Date(
                item.create_time
              ).toLocaleDateString()}</div>
              <h1 class="title">
                ${item.title}
              </h1>
              <p class="content">
                ${item.abstract}
              </p>
            </div>
          `;
          $(".news-section .col-12 .enter-wrap").eq(index).before(html);
        });
      },
      error: function () {
        $(".news-section .row").empty();
        $(".news-section").append(
          "<h2 class='title empty-message'>暂无数据</h2>"
        );
      },
    })
    .get();
});
