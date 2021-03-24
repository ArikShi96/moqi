import "../../assets/Common";
import "./index.scss";
import "./index.html";

// 绑定事件
$(document).ready(() => {
  // IE 解决高度塌陷
  let initIeHeight = $(".advantage-wrap")[0].clientHeight;
  function resetAdvantageWrapHeight() {
    let ieImgHeight = 0;
    Array.from($(".advantage-wrap .img-wrap")).forEach((el) => {
      if (el.clientHeight === 0) {
        ieImgHeight =
          ieImgHeight > $(el).find(".hidden-img")[0].clientHeight
            ? ieImgHeight
            : $(el).find(".hidden-img")[0].clientHeight;
      }
    });
    if (ieImgHeight > 0) {
      $(".advantage-wrap").css("height", `${ieImgHeight + initIeHeight}px`);
    }
  }
  if ($(".advantage-wrap .img-wrap").css("height") === "0px") {
    resetAdvantageWrapHeight();
    $(window).resize(() => {
      resetAdvantageWrapHeight();
    });
  }
  $("header.header").addClass("black").addClass("transparent");
  $(".scroll-nav-wrap").addClass("white");
  // 导航条选中
  $(".navbar-wrap li a").eq(0).addClass("active");
  // 滚动事件
  $(window).scroll(() => {
    // header 是否透明
    if (
      !$(".navbar-wrap-mobile").is(":visible") &&
      !$("header.header .toggle-nav-header").is(":visible")
    ) {
      if ($(".bg-section")[0].getBoundingClientRect().top === 0) {
        $("header.header").addClass("transparent").removeClass("white");
      } else {
        $("header.header").removeClass("transparent").addClass("white");
      }
    }
    // 侧边滚动条颜色
    if (
      $("section.creativity-section")[0].getBoundingClientRect().top <
      $(".scroll-nav-wrap")[0].offsetTop + $(".scroll-nav-wrap ul")[0].offsetTop
    ) {
      $(".scroll-nav-wrap").removeClass("white");
    } else {
      $(".scroll-nav-wrap").addClass("white");
    }
  });
  // 轮播图
  Array.from($(".carousel-wrap li")).forEach((li, index) => {
    $(li).click(() => {
      if (!$(li).hasClass("active")) {
        $(".carousel-wrap li").removeClass("active");
        $(li).addClass("active");
        $("#home-page-carousel li").eq(index).click();
      }
    });
  });
  $("#home-page-carousel").on("slide.bs.carousel", (event) => {
    $(".carousel-wrap li").removeClass("active");
    $(".carousel-wrap li").eq(event.to).addClass("active");
  });
  // 播放视频
  $(".bg-section .video-wrap").click(() => {
    window.openVideo({
      url: "./file/video.mp4",
      muted: true,
      isFullScreen: window.innerWidth <= 500,
    });
  });
  $(".class-section .class-wrap").click((event) => {
    let $el = $(event.target);
    if (!$el.hasClass("class-wrap")) {
      $el = $el.parent(".class-wrap");
    }
    if (!$el.data("index") && $el.data("index") !== 0) {
      return;
    }
    // 打开视频
    window.openVideo({
      url: [
        "http://moqi.ysdftech.com/file/现实图像搜索难题对AI的极限挑战.mp4",
        "http://moqi.ysdftech.com/file/异构并行计算和性能优化.mp4",
        "http://moqi.ysdftech.com/file/持久内存在图像搜索系统中的应用.mp4",
        "http://moqi.ysdftech.com/file/3D-AI.mp4",
      ][$el.data("index")],
      isFullScreen: window.innerWidth <= 500,
    });
  });
  // 课堂文案切换
  const descriptionMap = [
    {
      title: "汤林鹏：秒级 20 亿，海量高速高精度海量图像比对",
      desc:
        "利用多尺度的图像表示、高速异构的比对框架和分布式的并行处理，实现了 20 亿指纹秒级精准搜索的需求",
    },
    {
      title: "张青笛：异构并行计算和性能优化",
      desc:
        "基于 CUDA 编程框架的并行计算算法，通过对内存访问、局部存储、代码分支、指令优化、数据传输等一系列的优化，实现了比对性能质的飞跃",
    },
    {
      title: "刘勤：持久内存在图像搜索系统中的应用",
      desc:
        " 通过最新的非易失性内存（NVDIMM）技术和 Linux 系统中的内存映射技术（mmap）将异构并行计算算法需要的所有图片特征存储在一个分布式的内存数据库内，完成大大降低了海量图像搜索成本，并增强了分布式图像搜索系统的稳定",
    },
    {
      title: "非接触 3D+AI 警用指纹采集仪",
      desc:
        "采集技术和指纹采集仪结合，实现伸手即采。一次伸手，同时完成平面和滚动捺印的采集，避免了传统指纹采集设备在手指按压、滚动中造成的形变和模糊",
    },
  ];
  if (window.innerWidth > 500) {
    $(".class-section .class-wrap").hover((event) => {
      handleHoverEvent(event.target);
    });
    $(".class-section .class-wrap").mouseleave((event) => {
      let $el = $(event.target);
      if (!$el.hasClass("class-wrap")) {
        $el = $el.parent("class-wrap");
      }
      // setTimeout(() => {
      //   $el.css("background-image", "none");
      // }, 500);
      $el.find(".hover-img").removeClass("visible");
    });
  } else {
    $(".class-section .description").text(descriptionMap[0].title);
    $(".class-section .description-tip").text(descriptionMap[0].desc);
    $(".class-section .image-section .col-12").on(
      "scroll",
      debounce(() => {
        $(".class-section .class-wrap").removeClass("mobile-hover");
        $(".class-section .class-wrap .hover-img").removeClass("visible");
        // .css("background-image", "none");
        // 计算滚动距离
        const scrollWidth = $(".class-section .image-section .col-12")[0]
          .scrollWidth;
        const scrollLeft = $(".class-section .image-section .col-12")[0]
          .scrollLeft;
        handleHoverEvent(
          $(".class-section .class-wrap")[
            Math.round((scrollLeft * 4) / scrollWidth)
          ],
          true
        );
      }, 40)
    );
  }
  function handleHoverEvent(el, isMobile) {
    let $el = $(el);
    if (!$el.hasClass("class-wrap")) {
      $el = $el.parent(".class-wrap");
    }
    if (!$el.data("index") && $el.data("index") !== 0) {
      return;
    }
    $(".class-section .description").text(
      descriptionMap[$el.data("index")].title
    );
    $(".class-section .description-tip").text(
      descriptionMap[$el.data("index")].desc
    );
    // $el.css(
    //   "background-image",
    //   `url('./image/home/home-class-bg-${$el.data("index") + 1}.png')`
    // );
    $el.find(".hover-img").addClass("visible");
    if (isMobile) {
      $el.addClass("mobile-hover");
    }
  }
  function debounce(func, time) {
    let timer = null;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, arguments);
      }, time);
    };
  }
});
