window.isDev = window.location.hostname === "localhost";
// window.apiHost = "http://139.198.15.135:2095";
window.apiHost = window.isDev ? "" : "https://moqi.com.cn";
