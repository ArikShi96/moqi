import "jquery";
import "bootstrap";
import "bootstrap/scss/bootstrap.scss";
import "font-awesome/scss/font-awesome.scss";

import "./css/app.scss";
import "./js/Constants";
import "./js/Utils";
import "./js/Helper";
import "./js/Http";
import "./js/libs/Scroll";
import "./js/libs/Polyfill";
require("./js/libs/animatescroll.min");

function debounce(func, time) {
  let timer = null;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, arguments);
    }, time);
  };
}

// 绑定全局事件
$(document).ready(() => {
  $(".tip-nav-wrap .tip-finger").click(() => {
    $(".tip-nav-wrap .tip-nav").slideToggle();
  });
  $(".tip-nav-wrap li.contact").click(() => {
    $(".tip-nav-wrap .tip-nav").slideToggle();
    $("#zc__sdk__sys__btn").click();
  });
  // 弹出框
  $(".tip-nav .trigger-popover").click((event) => {
    event.stopPropagation();
    $(".popover-wrap").fadeToggle();
  });
  $(document).on("click", ":not(.popover-wrap)", () => {
    $(".popover-wrap").fadeOut();
    return;
  });
  $(".popover-wrap").click((event) => {
    event.stopPropagation();
  });
  // 界面滚动初始化
  const sections = $("section.section");
  if (sections.length) {
    let html = "";
    Array.from(sections).forEach((section, index) => {
      html += `<li class="${index === 0 ? "active" : ""}">
      <div class="line"></div>
      <p>${$(section).data("section")}</p>
    </li>`;
    });
    $(".scroll-nav-wrap ul").append(html);
    Array.from($(".scroll-nav-wrap li")).forEach((li, index) => {
      $(li).click(() => {
        if (!$(li).hasClass("active")) {
          $(".scroll-nav-wrap li").removeClass("active");
          $("section.section")
            .eq(index)
            .animatescroll({
              padding: window.innerWidth < 500 ? 60 : 0,
            });
          $(li).addClass("active");
        }
      });
    });
    $(window).scroll(
      debounce(() => {
        let hashIndex = 0;
        let result = 9999;
        Array.from(sections).forEach((section, index) => {
          if (Math.abs(section.getBoundingClientRect().top) < result) {
            hashIndex = index;
            result = Math.abs(section.getBoundingClientRect().top);
          }
        });
        $(".scroll-nav-wrap li").removeClass("active");
        $(".scroll-nav-wrap li").eq(hashIndex).addClass("active");
      }, 50)
    );
  }
});
