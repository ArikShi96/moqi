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

// 绑定全局事件
$(document).ready(() => {
  $(".tip-wrap .tip-finger").click(() => {
    $(".tip-wrap .tip-nav").slideToggle();
  });
});
