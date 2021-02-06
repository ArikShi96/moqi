/**
 * 封装jquery Ajax
 * 1.统一异常处理
 * 2.default请求添加默认api，添加权限请求头
 * 3.注意post方法的请求头为application/json，不需要此请求头则调用postFormData()
 * 示例：
 Http({
    url: '',
    data: {},
    success: function (data) {
        console.log(data);
    }
 }).post();
 */
// 如果不new一个新对象，第一次请求未完成紧接着第二次请求的话参数会污染
window.Http = function (opts) {
  return new JqueryAjax(opts);
};

function JqueryAjax(opts) {
  this.url = opts.url;
  this.type = opts.type || "POST";
  this.data = opts.data || {};
  this.dataType = opts.dataType || "json";
  this.headers = opts.headers || {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  };
  this.beforeSend = opts.beforeSend;
  this.success = opts.success;
  this.error = opts.error;
  this.complete = opts.complete;
  this.isShowLoading = !(opts.isShowLoading === false); // 本次请求是否显示loading，默认显示
  this.isDefaultApiRequest = !(opts.isDefaultApiRequest === false); // 是否使用默认api请求，默认请求会添加请求头，会添加默认api
}

JqueryAjax.prototype = {
  request: function () {
    let that = this;
    $.ajax({
      type: this.type,
      url: this.url,
      data: this.data,
      dataType: this.dataType,
      headers: this.headers,
      crossDomain: !document.all,
      beforeSend: function (xhr) {
        that.showLoading();
        that.beforeSend && that.beforeSend(xhr);
      },
      complete: function (xhr, status) {
        that.hideLoading();
        that.complete && that.complete(xhr, status);
      },
      error: function (xhr, status, error) {
        that.error && that.error(xhr, status, error);
      },
      success: function (result, status, xhr) {
        that.success &&
          that.success(
            that.isDefaultApiRequest ? result.data : result,
            status,
            xhr
          );
      },
    });
  },
  defaultApiRequest: function () {
    this.headers = this.headers || {};
    this.headers.Authorization =
      "Bearer " + (window.token || Utils.getSessionStorage("token"));
    this.url = Utils.formatUrl(
      this.url.indexOf("http") !== -1 ? this.url : API + this.url
    );
    this.request();
  },
  post: function () {
    this.headers = { "Content-Type": "application/json; charset=UTF-8" };
    this.data = JSON.stringify(this.data);
    this.isDefaultApiRequest ? this.defaultApiRequest() : this.request();
  },
  postFormData: function () {
    this.isDefaultApiRequest ? this.defaultApiRequest() : this.request();
  },
  get: function () {
    this.type = "GET";
    this.isDefaultApiRequest ? this.defaultApiRequest() : this.request();
  },
  requestCount: 0, //  记录未完成的请求数量,当请求数为0关闭loading,否则显示loading
  // 关于统一显示loading的处理逻辑，请查看/doc/《Http请求统一显示Loading.md》
  showLoading: function () {
    ++this.requestCount;
    this.isShowLoading && Helper.showLoading();
  },
  hideLoading: function () {
    --this.requestCount === 0 && Helper.hideLoading();
  },
};

// 新闻
// https://moqi.com.cn/api/news/actived/?limit=5&offset=0
// https://moqi.com.cn/api/news/:id/actived/

// 商务合作
// https://moqi.com.cn/api/send_business_email/
// { fullName: 姓名 email: 邮箱 phone: 联系电话 content: 内容 }

// 招聘
// https://api.mokahr.com/api-platform/v1/jobs/moqi?mode=social/campus
// https://app.mokahr.com/apply/moqi/24494#/job/a444ef3a-660b-40d6-b0c8-cca7e539657f
