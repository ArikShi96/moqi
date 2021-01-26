import "../../assets/Common";
import "./index.scss";
import "./index.html";

// 绑定事件
$(document).ready(() => {
  // 导航条选中
  $(".navbar-wrap li a").eq(2).addClass("active");
});
