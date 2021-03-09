window.Helper = {
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
