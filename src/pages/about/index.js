/* eslint-disable indent */
import "../../assets/Common";
import "./index.scss";
import "./index.html";
import "jscroll"; // jquery.jscroll.js

// 绑定事件
$(document).ready(() => {
  $("header.header").addClass("black").addClass("transparent");
  $(".scroll-nav-wrap").addClass("white");
  // 导航条选中
  $(".navbar-wrap li a").eq(3).addClass("active");
  // 播放视频
  // let videoIntervalEvent = window.setInterval(() => {
  //   if (
  //     $(".video-section video")[0] &&
  //     $(".video-section video")[0].readyState === 4
  //   ) {
  //     window.clearInterval(videoIntervalEvent);
  //     $(".video-section video")[0].play();
  //     videoIntervalEvent = window.setInterval(() => {
  //       if ($(".video-section video")[0].currentTime > 3.5) {
  //         $(".video-section video")[0].pause();
  //         window.clearInterval(videoIntervalEvent);
  //       }
  //     }, 100);
  //   }
  // }, 500);
  // 创始人左右滚动
  function calculateScrollBar(position) {
    $(".team-section .scroll-wrap .scroll-bar.full")
      .width((1 / 6) * 100)
      .css("left", `${(position / 6) * 100}px`);
  }
  // 创业团队向左点击
  let teamPosition = 0;
  calculateScrollBar(0);
  $(".team-section .left-icon").click(() => {
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
  });
  // 创业团队向右点击
  $(".team-section .right-icon").click(() => {
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
  });
  window.setInterval(() => {
    $(".team-section .right-icon").click();
  }, 4000);
  // 滚动事件
  $(window).scroll(() => {
    // header 是否透明
    if ($(".bg-section")[0].getBoundingClientRect().top === 0) {
      $("header.header").addClass("transparent").removeClass("white");
    } else {
      $("header.header").removeClass("transparent").addClass("white");
    }
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
      url: `https://139.198.15.135:8443/api/news/actived/?limit=5&offset=0`,
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
                item.create_time
              ).toLocaleDateString()}</div>
              <h1 class="title">
                ${item.title}
              </h1>
              <p class="content">
                ${item.abstract}
              </p>
            </div>
          `;
          $(".news-section .col-12 .enter-wrap").eq(index).before(html);
        });
      },
      error: function () {
        $(".news-section .row").empty();
        $(".news-section").append(
          "<h2 class='title empty-message'>暂无数据</h2>"
        );
      },
    })
    .get();
  // 发展历程滚动
  const textMaps = {
    2015: {
      text: ["", "2015", "2017", "2018"],
      desc: "研发下一代无标注机器学习技术，突破深度学习框架。",
      translateX: 0,
    },
    2017: {
      text: ["2015", "2017", "2018", "2019"],
      desc:
        "将无监督机器学习技术应用于生物特征识别领域，推出全球领先的海量高速高精度指纹比对系统<br/>完成A轮融资",
      translateX: -4,
    },
    2018: {
      text: ["2017", "2018", "2019", "2020"],
      desc: "AI指纹系统成功获得全国大范围应用<br/>指纹中心已累计20亿枚指纹",
      translateX: -8,
    },
    2019: {
      text: ["2018", "2019", "2020", "至今"],
      desc:
        "正或发布新一代“指纹-身份识别”AI系统，在业内引起巨大反响<br/>入选部委“双十计划”重点推广项目<br/>研发全球颠覆性的非接触指纹采集仪",
      translateX: -12,
    },
    2020: {
      text: ["2019", "2020", "至今", "..."],
      desc:
        "推出掌纹、足迹智能比对系统<br/>入选黑马中国“新基建产业独角兽100强<br/>入选“2020中国潜在独角兽企业榜单<br/>推出统一身份认证平台 Moqi ID",
      translateX: -16,
    },
    至今: {
      text: ["2020", "至今", "...", ""],
      desc: "加速行业落地，创造生物特征识别的未来!",
      translateX: -20,
    },
  };
  $(".development-section h1.title").click((event) => {
    const currentYear = event.target.innerText;
    const textMap = textMaps[currentYear];
    if (!textMap) {
      return;
    }
    textMap.text.forEach((text, index) => {
      $(".development-section h1").eq(index).text(text);
    });
    $(".development-section .col-4 .color-text").text(currentYear);
    $(".development-section .col-4 p").html(textMap.desc);
    $(".development-section img").css(
      "transform",
      `translateX(${textMap.translateX}vw)`
    );
  });
});
