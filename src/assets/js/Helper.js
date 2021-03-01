/**
 * Helper类存放和业务有关的公共方法；Utils类存放和业务无关的公共方法；
 */
window.Helper = {
  /**
   * 格式“是”or“否”
   */
  formatYesOrNo: function (value) {
    return value === 1 || value === "1"
      ? "是"
      : value === 0 || value === "0"
      ? "否"
      : null;
  },
  /**
   * 打开loading模态窗口
   * */
  showLoading: function () {
    if (window.LoadingIsShow) {
      // loading已经打开
      return;
    }
    let html = [
      '<div class="js-loading" style="position:absolute;left:0;right:0;width:100%;height:100%;z-index:10000;display:flex;justify-content:center;align-items:center;background:rgba(204, 204, 204, 0.2);">',
    ];
    html.push(
      '<i class="fa fa-spinner fa-pulse fa-lg" style=" font-size:28px;color: #1d96e8"></i>'
    );
    html.push("</div>");
    $("body").prepend(html.join(""));
    window.LoadingIsShow = true;
  },
  /**
   * 关闭loading模态窗口
   * */
  hideLoading: function () {
    if (!window.LoadingIsShow) {
      return;
    }
    $(".js-loading").remove();
    window.LoadingIsShow = false;
  },
  /**
   *  消息提示框，自动关闭，一般用于成功操作消息提示
   */
  showToast: function (message, timeout) {
    if (swal) {
      swal({
        position: "bottom-end",
        type: "success",
        title: message || "操作成功",
        showConfirmButton: false,
        backdrop: false,
        width: "420px",
        timer: timeout || 3000,
      });
    } else {
      let html = [
        '<div class="js-message-warp" style="position:absolute;right:0;bottom:0;height:150px;width:300px;overflow:hidden;">',
      ];
      html.push(
        '<div class="js-message" style="position:absolute;right:-100%;bottom:-100%;height:100%;width:100%;border:1px solid #ccc;background:rgb(250, 250, 250);font-size:24px;padding:16px;">'
      );
      html.push(message || "操作成功");
      html.push("</div>");
      html.push("</div>");
      $("body").append(html.join(""));
      let $message = $(".js-message");
      let $warp = $(".js-message-warp");
      $message.animate({ right: 0, bottom: 0 }, 2000, function () {
        setTimeout(() => {
          $message.animate(
            { right: "-100%", bottom: "-100%" },
            1500,
            function () {
              $warp.remove();
            }
          );
        }, timeout || 2000);
      });
    }
  },
  /**
   * easyui datagrid 执行查询过滤公共函数
   * @param $dg
   * @param field
   * @param value
   * @param op
   */
  doFilter: function ($dg, field, value, op) {
    if (!value) {
      $dg.datagrid("removeFilterRule", field);
    } else {
      $dg.datagrid("addFilterRule", {
        field: field,
        op: op || "equal",
        value: value,
      });
    }
    $dg.datagrid("unselectAll").datagrid("doFilter");
  },
  backTop: function backTop(minHeight = 300) {
    let backTopHtml =
      '<button type="button" id="backTopBtn" class="btn btn-outline-danger" style="position:fixed;bottom:100px;right:15px;display: none;"><span class="fa fa-arrow-up"></span></button>';
    $("body").append(backTopHtml);
    $("#backTopBtn")
      .click(function () {
        $("html, body").animate({ scrollTop: 0 }, 700);
      })
      .hover(
        function () {
          $(this).addClass("hover");
        },
        function () {
          $(this).removeClass("hover");
        }
      );
    $(window).scroll(function () {
      let s = $(window).scrollTop();
      if (s > minHeight) {
        $("#backTopBtn").fadeIn(100);
      } else {
        $("#backTopBtn").fadeOut(100);
      }
    });
  },
};

// url, closeCallback, hideControl, poster
window.openVideo = (options) => {
  // try {
  //   if ($(".video-js .vjs-control.vjs-close-button").length) {
  //     $(".video-js .vjs-control.vjs-close-button").click();
  //   }
  // } catch (err) {
  //   //
  // }
  $(document.getElementById("global-video")).fadeIn();
  const player = window.VideoJs(document.getElementById("global-video"), {
    controls: true, // 是否显示控制条
    poster: options.poster || null, // 视频封面图地址
    preload: "auto",
    autoplay: true,
    // fluid: true, // 自适应宽高
    language: "zh-CN", // 设置语言
    muted: options.muted || false, // 是否静音
    // inactivityTimeout: false,
    // controlBar: {
    //   // 设置控制条组件
    //   /* 设置控制条里面组件的相关属性及显示与否
    //     'currentTimeDisplay':true,
    //     'timeDivider':true,
    //     'durationDisplay':true,
    //     'remainingTimeDisplay':false,
    //     volumePanel: {
    //       inline: false,
    //     }
    //     */
    //   /* 使用children的形式可以控制每一个控件的位置，以及显示与否 */
    //   children: [
    //     { name: "playToggle" }, // 播放按钮
    //     { name: "currentTimeDisplay" }, // 当前已播放时间
    //     { name: "progressControl" }, // 播放进度条
    //     { name: "durationDisplay" }, // 总时间
    //     {
    //       // 倍数播放
    //       name: "playbackRateMenuButton",
    //       playbackRates: [0.5, 1, 1.5, 2, 2.5],
    //     },
    //     {
    //       name: "volumePanel", // 音量控制
    //       inline: false, // 不使用水平方式
    //     },
    //     { name: "FullscreenToggle" }, // 全屏
    //   ],
    // },
    sources: [
      // 视频源
      {
        src: options.url,
        type: "video/mp4",
        poster: "",
      },
    ],
  });
  if (!options.hideControl) {
    const CloseButton = window.VideoJs.getComponent("CloseButton");
    CloseButton.prototype.handleClick = () => {
      player.dispose();
      $(document.body).append(`
    <video
      id="global-video"
      class="video-js vjs-big-play-centered"
      style="display: none"
      x5-playsinline=""
      playsinline="true"
      webkit-playsinline="true"
      x-webkit-airplay="true"
      x5-video-player-type="h5"
      x5-video-player-fullscreen=""
      x5-video-orientation="portraint"
    ></video>`);
      options.closeCallback && options.closeCallback();
    };
    const closeButton = new CloseButton(player);
    player.addChild(closeButton);
  }
  // let currentIsFullScreen = false;
  // if (options.isFullScreen && player.requestFullscreen) {
  //   player.requestFullscreen();
  //   player.on("fullscreenchange", (e) => {
  //     if (currentIsFullScreen) {
  //       player.dispose();
  //       $(document.body).append(`
  //   <video
  //     id="global-video"
  //     class="video-js vjs-big-play-centered"
  //     style="display: none"
  //     x5-playsinline=""
  //     playsinline="true"
  //     webkit-playsinline="true"
  //     x-webkit-airplay="true"
  //     x5-video-player-type="h5"
  //     x5-video-player-fullscreen=""
  //     x5-video-orientation="portraint"
  //   ></video>`);
  //       options.closeCallback && options.closeCallback();
  //     } else {
  //       currentIsFullScreen = true;
  //     }
  //   });
  // }
};
