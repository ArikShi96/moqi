import "../../assets/Common";
import "./index.scss";
import "./index.html";

// 绑定事件
$(document).ready(() => {
  $("header.header").addClass("black").addClass("transparent");
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
      $("section.info-section")[0].getBoundingClientRect().top <
      $(".scroll-nav-wrap")[0].offsetTop + $(".scroll-nav-wrap ul")[0].offsetTop
    ) {
      $(".scroll-nav-wrap").removeClass("white");
    } else {
      $(".scroll-nav-wrap").addClass("white");
    }
  });
  // 获取news
  window
    .Http({
      url: `/api/news/actived/?limit=5&offset=0`,
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
    })
    .get();
});
