/* eslint-disable indent */
import "../../assets/Common";
import "./index.scss";
import "./index.html";

// 绑定事件
$(document).ready(() => {
  // 导航条选中
  $(".navbar-wrap li a").eq(4).addClass("active");
  // 搜索内容
  let mode = window.location.search.split("=")[1] || "social";
  let currentPage = 1;
  let totalPage = 1;
  let allOriginalList = [];
  let allList = [];
  let total = 0;
  // 初始化
  fetchAllList();
  $("header.header").addClass("job").addClass("transparent");
  if (mode === "campus") {
    $(".search-form .search-tab").eq(1).addClass("active");
  } else {
    $(".search-form .search-tab").eq(0).addClass("active");
  }
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
  });
  //
  function getProvince(list, i) {
    if (list[i].locations && list[i].locations.length) {
      return list[i].locations[0].province;
    } else {
      return "";
    }
  }
  // 获取列表
  function fetchAllList() {
    currentPage = 1;
    totalPage = 1;
    allOriginalList = [];
    allList = [];
    total = 0;
    window
      .Http({
        url: `${
          window.isDev ? "" : "https://api.mokahr.com"
        }/api-platform/v1/jobs/moqi?mode=${mode}`,
        type: "GET",
        data: {},
        isDefaultApiRequest: false,
        success: function (data) {
          allOriginalList = data.jobs;
          filterList();
          refreshList();
          setPagination();
        },
      })
      .get();
  }
  // 设置分页
  function setPagination() {
    // 清空原有
    $(".table-pagination")
      .children()
      .remove("p")
      .remove(":not(.last-page, .next-page)");
    // 重新生成
    let html = '<div class="active">1</div>';
    for (let i = 1; i < totalPage; i++) {
      html += `<div>${i + 1}</div>`;
    }
    $(".table-pagination .last-page").after(html);
    $(".table-pagination .next-page").after(
      `<p class="total">共${total}条数据</p>`
    );
    $(".table-pagination .last-page").addClass("disabled");
    if (totalPage < 2) {
      $(".table-pagination .next-page").addClass("disabled");
    }
  }
  // 筛选列表
  function filterList() {
    const filterValue = ($(".search-form input").val() || "").toLowerCase();
    if (filterValue) {
      allList = allOriginalList.filter((item, index) => {
        return (
          (item.title || "").toLowerCase().indexOf(filterValue) > -1 ||
          getProvince(allOriginalList, index)
            .toLowerCase()
            .indexOf(filterValue) > -1 ||
          (item.department.name || "").toLowerCase().indexOf(filterValue) > -1
        );
      });
    } else {
      allList = allOriginalList;
    }
    total = allList.length;
    totalPage = Math.ceil(total / 10);
  }
  // 刷新列表
  function refreshList() {
    let html = "";
    for (let i = (currentPage - 1) * 10; i < currentPage * 10; i++) {
      if (allList[i]) {
        html += `
        <div class="col-3"><p>${allList[i].title || ""}</p></div>
        <div class="col-3">
          <p>${getProvince(allList, i)}
          </p>
        </div>
        <div class="col-3"><p>${allList[i].department.name || ""}</p></div>
        <div class="col-3"><a
          href="https://app.mokahr.com/apply/moqi/24494#/job/${
            allList[i].id
          }">查看详情</a>
        </div>
      `;
      }
    }
    $(".table-wrap .table-content").empty().append(html);
  }
  // 切换列表
  $(".search-form .search-tab").click((event) => {
    if (event.target.className.indexOf("active") > -1) {
      return;
    }
    $(".search-form input").val("");
    if (event.target.innerText === "社会招聘") {
      mode = "social";
    } else {
      mode = "campus";
    }
    $(".search-form .search-tab").removeClass("active");
    $(event.target).addClass("active");
    fetchAllList();
  });
  // 分页点击事件
  $(".table-pagination").click((event) => {
    if (event.target.className === "") {
      currentPage = parseInt(event.target.innerText, 10);
    } else if (
      // last page
      (event.target.className.indexOf("last-page") > -1 ||
        $(event.target).parent(".last-page").length > 0) &&
      currentPage > 1
    ) {
      currentPage -= 1;
    } else if (
      // next page
      (event.target.className.indexOf("next-page") > -1 ||
        $(event.target).parent(".next-page").length > 0) &&
      currentPage < totalPage
    ) {
      currentPage += 1;
    } else {
      return;
    }
    refreshList();
    if (currentPage === 1) {
      $(".table-pagination .last-page").addClass("disabled");
    } else {
      $(".table-pagination .last-page").removeClass("disabled");
    }
    if (currentPage < totalPage) {
      $(".table-pagination .next-page").removeClass("disabled");
    } else {
      $(".table-pagination .next-page").addClass("disabled");
    }
    $(".table-pagination")
      .children("div")
      .removeClass("active")
      .eq(currentPage)
      .addClass("active");
  });
  // 搜索change事件
  $(".search-form input").on("input", () => {
    const filterValue = $(".search-form input").val();
    if (filterValue) {
      $(".search-form .search-icon").fadeOut();
    } else {
      $(".search-form .search-icon").fadeIn();
    }
    filterList();
    refreshList();
    setPagination();
  });
});
