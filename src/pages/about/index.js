/* eslint-disable indent */
import "../../assets/Common";
import "./index.scss";
import "./index.html";
import "jscroll"; // jquery.jscroll.js

// 绑定事件
$(document).ready(() => {
  // $("header.header").addClass("black").addClass("transparent");
  $("header.header").addClass("black").addClass("white");
  $(".scroll-nav-wrap").addClass("white");
  // 导航条选中
  $(".navbar-wrap li a").eq(3).addClass("active");
  // 播放视频
  window.openVideo({
    url: "./file/墨奇&绿城.mp4",
    hideControl: true,
    poster: "./image/home/poster.png",
  });
  // 创始人左右滚动
  function calculateScrollBar(position) {
    $(".team-section .scroll-wrap .scroll-bar.full")
      .width((1 / 6) * 100)
      .css("left", `${(position / 6) * 100}px`);
  }
  // 创业团队向左点击
  let teamPosition = 0;
  calculateScrollBar(0);
  function handleLeftClick() {
    let targetPosition = (teamPosition - 1) % 6;
    while (targetPosition < 0) {
      targetPosition += 6;
    }
    teamPosition = targetPosition - 1;
    Array.from($(".team-section .row .col-12")).forEach((el, i) => {
      let lastLeft = (i - teamPosition) * 25; // 0
      let targetLeft = (i - targetPosition) * 25; // 1

      if (lastLeft === -25 || lastLeft === 125) {
        el.style.transition = "500ms";
        el.style.left = "100%";
      } else if (lastLeft === 0) {
        el.style.transition = "0ms";
        el.style.left = "-25%";
      } else if (targetLeft === 125) {
        el.style.transition = "0ms";
        el.style.left = "-25%";
      } else if (targetLeft >= -25) {
        el.style.transition = "500ms";
        el.style.left = `${targetLeft}%`;
      } else {
        el.style.transition = "500ms";
        el.style.left = `${lastLeft + 125}%`;
      }
    });
    teamPosition = targetPosition;
    calculateScrollBar(teamPosition);
  }
  function handleRightClick() {
    const targetPosition = (teamPosition + 1) % 6;
    Array.from($(".team-section .row .col-12")).forEach((el, i) => {
      let lastLeft = (i - teamPosition) * 25;
      let targetLeft = (i - targetPosition) * 25;

      if (lastLeft === -25 || lastLeft === 125) {
        el.style.transition = "0ms";
        el.style.left = "100%";
      } else if (lastLeft === 0) {
        el.style.transition = "500ms";
        el.style.left = "-25%";
      } else if (targetLeft >= -25) {
        el.style.transition = "500ms";
        el.style.left = `${targetLeft}%`;
      } else {
        el.style.transition = "500ms";
        el.style.left = `${lastLeft + 125}%`;
      }
    });
    teamPosition = targetPosition;
    calculateScrollBar(teamPosition);
  }
  $(".team-section .left-icon").click(() => {
    handleLeftClick();
  });
  // 创业团队向右点击
  $(".team-section .right-icon").click(() => {
    handleRightClick();
  });
  window.setInterval(() => {
    handleRightClick();
  }, 4000);
  // 滚动事件
  $(window).scroll(() => {
    // header 是否透明
    // if (
    //   !$(".navbar-wrap-mobile").is(":visible") &&
    //   !$("header.header .toggle-nav-header").is(":visible")
    // ) {
    //   if ($(".bg-section")[0].getBoundingClientRect().top === 0) {
    //     $("header.header").addClass("transparent").removeClass("white");
    //   } else {
    //     $("header.header").removeClass("transparent").addClass("white");
    //   }
    // }

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
      url: `${window.apiHost}/api/news/actived/?limit=5&offset=0`,
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
              <div class="time-tag">${new Date(
                item.publish_time * 1000
              ).toLocaleDateString()}</div>
              <h2 class="title">
                ${item.title}
              </h2>
              <p class="content">
                ${item.abstract}
              </p>
            </div>
          `;
          $(".news-section .col-12 .enter-wrap")
            .eq(index)
            .fadeIn()
            .before(html);
          if (item.id) {
            $(".news-section .col-12 .enter-wrap")
              .eq(index)
              .css("pointer-events", "auto")
              .attr("href", `../news.html?id=${item.id}`);
          }
        });
        const hash = window.location.hash.split("#")[1];
        if (hash === "5") {
          window.setTimeout(() => {
            $("section.section")
              .eq(parseInt(hash, 10) || 0)
              .animatescroll({
                padding: window.innerWidth <= 500 ? 65 : 60,
              });
          }, 0);
        }
        $("article.news").click((event) => {
          let $el = $(event.target);
          if (!$el.hasClass("news")) {
            $el = $el.parent(".news");
          }
          const href = $el.find(".enter-wrap").attr("href");
          if (href && href !== "#") {
            window.location = href;
          }
        });
      },
      error: function () {
        $(".news-section .row").empty();
        $(".news-section").append(
          "<h3 class='title empty-message'>暂无数据</h3>"
        );
      },
    })
    .get();
  // 发展历程滚动
  const textMaps = {
    2015: {
      text: ["", "2015", "2017", "2018"],
      desc: "<li>研发下一代无标注机器学习技术，突破深度学习框架</li>",
      translateX: 0,
    },
    2017: {
      text: ["2015", "2017", "2018", "2019"],
      desc:
        "<li>将无监督机器学习技术应用于生物特征识别领域，推出全球领先的海量高速高精度指纹比对系统</li><li>完成 A 轮融资</li>",
      translateX: -4,
    },
    2018: {
      text: ["2017", "2018", "2019", "2020"],
      desc:
        "<li>AI 指纹系统成功获得全国大范围应用</li><li>指纹中心已累计 20 亿枚指纹</li>",
      translateX: -8,
    },
    2019: {
      text: ["2018", "2019", "2020", "今天"],
      desc:
        "<li>正式发布新一代“指纹 - 身份识别” AI 系统，在业内引起巨大反响</li><li>入选部委“双十计划”重点推广项目</li><li>研发出颠覆性的非接触 3D 指纹采集仪</li>",
      translateX: -12,
    },
    2020: {
      text: ["2019", "2020", "今天", "..."],
      desc:
        "<li>推出掌纹、足迹智能比对系统</li><li>入选黑马中国“新基建产业独角兽 100 强”</li><li>荣获全国政法“ 2020 智慧警务十大解决方案”</li><li>入选“ 2020 中国潜在独角兽企业榜单”</li><li>推出身份认证平台</li>",
      translateX: -16,
    },
    今天: {
      text: ["2020", "今天", "...", ""],
      desc: "<li>加速更多行业落地，创造生物特征识别的未来!</li>",
      translateX: -20,
    },
  };
  $(".development-section .pc-view .text-wrap-item").click((event) => {
    const currentYear = $(event.target).children("h2.title").text();
    const textMap = textMaps[currentYear];
    if (!textMap) {
      return;
    }
    textMap.text.forEach((text, index) => {
      $(".development-section h2").eq(index).text(text);
    });
    $(".development-section .col-4 .color-text").text(currentYear);
    $(".development-section .col-4 p").html(textMap.desc);
    $(".development-section img").css(
      "transform",
      `translateX(${textMap.translateX}vw)`
    );
    if (String(currentYear) === "2019") {
      $(".text-wrap-item.col-4.active").addClass("pv-10");
    } else {
      $(".text-wrap-item.col-4.active").removeClass("pv-10");
    }
  });
  $(".development-section .pc-view .text-wrap-item").eq(1).click();
  // 根据hash值滚动到某个section
  const hash = window.location.hash.split("#")[1];
  if (hash) {
    window.setTimeout(() => {
      $("section.section")
        .eq(parseInt(hash, 10) || 0)
        .animatescroll({
          padding: window.innerWidth <= 500 ? 65 : 60,
        });
    }, 0);
  }
});
