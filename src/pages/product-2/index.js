import "../../assets/Common";
import "./index.scss";
import "./index.html";

// 绑定事件
$(document).ready(() => {
  // 导航条选中
  $(".navbar-wrap li a").eq(2).addClass("active");
  // 动态计算图片高度
  $(window).resize(() => {
    setTextHeight();
  });
  function setTextHeight() {
    let height = 0;
    Array.from($(".article-wrap p")).forEach((el) => {
      height = Math.max(height, el.clientHeight);
    });
    Array.from($(".article-wrap p")).forEach((el) => {
      $(el).css("height", `${height}px`);
    });
  }
  setTextHeight();
});
