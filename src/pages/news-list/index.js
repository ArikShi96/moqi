/* eslint-disable indent */
import "../../assets/Common";
import "./index.scss";
import "./index.html";

$(document).ready(() => {
  let currentPage = 1;
  let totalPage = 0;
  fetchNews();
  $(window).resize(() => {
    setImageHeight();
  });
  // 动态计算图片高度
  function setImageHeight() {
    Array.from($("main .container .col-md-3")).forEach((el) => {
      $(el).css("height", `${0.56 * $(el).width()}px`);
    });
  }
  // 获取news `
  function fetchNews() {
    let html = "";
    window
      .Http({
        url: `${window.apiHost}/api/news/actived/?limit=5&offset=${
          5 * (currentPage - 1)
        }`,
        type: "GET",
        data: {},
        isDefaultApiRequest: false,
        success: function (data) {
          data.data.forEach((item, index) => {
            html += `
            <a class='row' href="../news.html?id=${item.id}">
           <div class="col-12 col-md-3" style="background-image: url(${
             item.cover_image
           }")></div>
            <div class="col-12 col-md-9">
              <article>
                <h3 class="title">
                  ${item.title}
                </h3>
                <p>
                  ${item.abstract}
                </p>
                <p class="time">${new Date(
                  item.publish_time * 1000
                ).toLocaleDateString()}</p>
              </article>
            </div></a>`;
          });
          $("main .container").empty().append(html);
          totalPage = Math.ceil((data.count || 0) / 5);
          setImageHeight();
          setPagination();
        },
        error: function () {},
      })
      .get();
  }
  // 设置分页
  function setPagination() {
    // 清空原有
    $(".list-pagination")
      .children()
      .remove("p")
      .remove(":not(.first-page, .final-page, .last-page, .next-page)");
    // 重新生成
    let html = "<div>1</div>";
    for (let i = 1; i < totalPage; i++) {
      html += `<div>${i + 1}</div>`;
    }
    $(".list-pagination .last-page").after(html);
    $(".list-pagination").children("div").removeClass("active");
    $(".list-pagination")
      .children("div")
      .eq(currentPage + 1)
      .addClass("active");
    // $(".list-pagination .next-page").after(
    //   `<p class="total">共${total}条数据</p>`
    // );
    // $(".list-pagination .last-page").addClass("disabled");
    // if (totalPage < 2) {
    //   $(".list-pagination .next-page").addClass("disabled");
    // }
  }
  // 分页点击事件
  $(".list-pagination").click((event) => {
    if (event.target.className === "") {
      currentPage = parseInt(event.target.innerText, 10);
    } else if (
      // last page
      event.target.className === "last-page" &&
      currentPage > 1
    ) {
      currentPage -= 1;
    } else if (
      event.target.className === "next-page" &&
      currentPage < totalPage
    ) {
      currentPage += 1;
    } else if (
      event.target.className === "final-page" &&
      currentPage < totalPage
    ) {
      //
      currentPage = totalPage;
    } else if (event.target.className === "first-page" && currentPage > 1) {
      currentPage = 1;
    } else {
      return;
    }
    fetchNews();
    if (currentPage === 1) {
      $(".list-pagination .last-page").addClass("disabled");
      $(".list-pagination .first-page").addClass("disabled");
    } else {
      $(".list-pagination .last-page").removeClass("disabled");
      $(".list-pagination .first-page").removeClass("disabled");
    }
    if (currentPage < totalPage) {
      $(".list-pagination .next-page").removeClass("disabled");
      $(".list-pagination .final-page").removeClass("disabled");
    } else {
      $(".list-pagination .next-page").addClass("disabled");
      $(".list-pagination .final-page").addClass("disabled");
    }
  });
});
