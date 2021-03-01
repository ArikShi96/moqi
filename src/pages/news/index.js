import "../../assets/Common";
import "./index.scss";
import "./index.html";

$(document).ready(() => {
  // 获取news
  window
    .Http({
      url: `${window.apiHost}/api/news/${
        window.location.search.split("=")[1]
      }/actived/`,
      type: "GET",
      data: {},
      isDefaultApiRequest: false,
      success: function (data) {
        setData(data);
      },
      error: function () {},
    })
    .get();
  function setData(newsData) {
    $("h2.title").text(newsData.title);
    $("p.abstract").text(newsData.abstract);
    // 来源/时间
    $(".info .link").text(newsData.source || "");
    if (newsData.source_link) {
      $(".info .link").attr("href", newsData.source_link);
    } else {
      $(".info .link").css("pointer-events", "none");
    }
    $(".info .date").text(
      `—— ${new Date(newsData.publish_time * 1000).toLocaleDateString()}`
    );
    // 内容
    let html = "";
    newsData.main.forEach((section) => {
      html += "<section>";
      section.content.forEach((node) => {
        html += `<${node.type} class='${node.type === "h3" ? "title" : ""}'>`;
        // eslint-disable-next-line max-nested-callbacks
        node.content.forEach((element) => {
          html += getContent(element);
        });
        html += `</${node.type}>`;
      });
      html += "</section>";
    });
    $("div.divider").after(html);
    // 上/下一条
    if (newsData.prev) {
      $(".actions a")
        .eq(0)
        .removeClass("disabled")
        .attr("href", `../news.html?id=${newsData.prev}`);
    }
    if (newsData.next) {
      $(".actions a")
        .eq(1)
        .removeClass("disabled")
        .attr("href", `../news.html?id=${newsData.next}`);
    }
  }
  function getContent(element) {
    if (typeof element.content === "string") {
      return element.content;
    } else if (element.type === "a") {
      return `<a href=${element.href}>${element.content[0].content}</a>`;
    } else if (element.type === "img") {
      return `<img src=${element.src} />`;
    } else {
      return `<${element.type}>${element.content[0].content}</${element.type}>`;
    }
  }
});
