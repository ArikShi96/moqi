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

// 绑定全局事件
$(document).ready(() => {
  $(".tip-nav-wrap .tip-finger").click(() => {
    $(".tip-nav-wrap .tip-nav").slideToggle();
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
    $(".scroll-nav-wrap").append(html);
    Array.from($(".scroll-nav-wrap li")).forEach((li, index) => {
      $(li).click(() => {
        if (!$(li).hasClass("active")) {
          $(".scroll-nav-wrap li").removeClass("active");
          $("section.section").eq(index).animatescroll();
          $(li).addClass("active");
        }
      });
    });
    $(window).scroll(() => {
      // if ($(window).scrollTop() >= 200) {
      // }
    });
  }
});
