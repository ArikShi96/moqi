import "../../assets/Common";
import "./index.scss";
import "./index.html";

$(document).ready(() => {
  Array.from($(".service-section .service-nav li")).forEach((li, index) => {
    $(li).click(() => {
      $(".service-section .row")
        .eq(index % 3)
        .animatescroll({ padding: 20 });
    });
  });
  // 导航条选中
  $(".navbar-wrap li a").eq(2).addClass("active");
  // mobile 下应用场景分页
  let currentPage = 0;
  $(".application-section .pagination-wrap img").on("click", (event) => {
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
    $(".application-section .mobile-view .row").animate(
      {
        scrollLeft:
          currentPage *
          $(".application-section .mobile-view .row .col-11")[0].offsetWidth,
      },
      500
    );
    // 设置滚动条
    $(".application-section .pagination-wrap .scroll-bar.full").css(
      "left",
      `${33.33 * currentPage}%`
    );
    // 设置图片
    $(".application-section .pagination-wrap img")
      .eq(0)
      .attr(
        "src",
        `./bg-img/img/about/about-arrow-left${
          currentPage === 0 ? "-disabled" : ""
        }.png`
      );
    $(".application-section .pagination-wrap img")
      .eq(1)
      .attr(
        "src",
        `./bg-img/img/about/about-arrow-right${
          currentPage === 2 ? "-disabled" : ""
        }.png`
      );
  });
});
