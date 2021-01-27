import "jquery";
import "bootstrap";
import "bootstrap/scss/bootstrap.scss";
import "font-awesome/scss/font-awesome.scss";

import "./css/app.scss";
import "./css/bootstrap-msg.css";
import "./css/video-js.min.css";
import "./js/Constants";
import "./js/Utils";
import "./js/Helper";
import "./js/Http";
import "./js/libs/Scroll";
import "./js/libs/Polyfill";
require("./js/libs/animatescroll.min");
import Msg from "./js/libs/bootstrap-msg";
// import VideoJs from "./js/libs/video.min";

// window.VideoJs = VideoJs;

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
  // product 导航
  $("header.header .toggle-product").hover(() => {
    if ($("header.header .product-nav-header").is(":visible")) {
      return;
    }
    $("header.header .product-nav-header").slideDown();
    const breakSection = $("section[data-break='black']");
    let color = "white";
    if (
      breakSection &&
      breakSection.length &&
      breakSection[0].getBoundingClientRect().top < 188
    ) {
      color = "black";
    }
    if (breakSection && !breakSection.length) {
      color = "black";
    }
    const initClassName = $("header.header").attr("class");
    $("header.header")
      .removeClass("white")
      .removeClass("black")
      .addClass(color);
    $("header.header").mouseleave(() => {
      if (!$("header.header .product-nav-header").is(":visible")) {
        return;
      }
      $("header.header .product-nav-header").slideUp();
      $("header.header").attr("class", initClassName);
    });
  });
  // 弹出框
  $(".tip-nav .trigger-popover").hover((event) => {
    event.stopPropagation();
    $(".popover-wrap").fadeIn();
  });
  $(document).on("click", ":not(.popover-wrap)", () => {
    $(".popover-wrap").fadeOut();
    return;
  });
  $(".popover-wrap").click((event) => {
    event.stopPropagation();
  });
  $(".popover-wrap .btn-primary").click((event) => {
    const data = $(".popover-wrap form")
      .serializeArray()
      .reduce((prev, current) => {
        prev[current.name] = current.value;
        return prev;
      }, {});
    if (!data.fullName) {
      Msg.error("请输入您的姓名", 1000);
      return;
    }
    if (!data.email) {
      Msg.error("请输入您的邮箱", 1000);
      return;
    }
    const emailReg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!emailReg.text(data.email)) {
      Msg.error("邮箱输入有误", 1000);
      return;
    }
    if (!data.phone) {
      Msg.error("请输入您的电话", 1000);
      return;
    }
    if (!/^1[3456789]d{9}$/.test(data.phone)) {
      Msg.error("手机号输入有误", 1000);
      return;
    }
    if (!data.content) {
      Msg.error("请输入您的需求", 1000);
      return;
    }
    window
      .Http({
        url: `${
          window.isDev ? "" : "https://moqi.com.cn"
        }/api/send_business_email/`,
        type: "POST",
        data,
        isDefaultApiRequest: false,
        success: (data) => {
          Msg.success("提交成功", 1000);
          $(".popover-wrap").fadeOut();
        },
        error: () => {
          Msg.error("提交失败", 1000);
        },
      })
      .post();
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
              padding: window.innerWidth < 500 ? 65 : 60,
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
      }, 20)
    );
  }
});
