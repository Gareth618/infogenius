function getCookie(cookie) {
  const beg = "^(?:.*;)?\\s*";
  const end = "\\s*=\\s*([^;]+)(?:.*)?$";
  const reg = new RegExp(beg + cookie + end);
  const ans = (document.cookie.match(reg) || [, null])[1];
  return (ans === null ? null : parseInt(ans));
}

function setCookie(cookie, value, expiration) {
  document.cookie = cookie + "=" + value + "; expires=" + expiration.toUTCString();
}

if (getCookie("cookie-notice") !== null)
  document.getElementById("cookie-notice").style.display = "none";

function acceptCookies() {
  let date = new Date();
  date.setDate(date.getDate() + 120);
  setCookie("cookie-notice", 1, date);
  document.getElementById("cookie-notice").style.display = "none";
}

window.onscroll = () => {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    document.getElementById("navbar").style.height = "60px";
    document.getElementById("navbar").style.padding = "15px 5%";
    document.getElementById("back-to-top").style.right = "0";
    topPX = 60;
  }
  else {
    document.getElementById("navbar").style.height = "80px";
    document.getElementById("navbar").style.padding = "20px 5%";
    document.getElementById("back-to-top").style.right = "-3.5%";
    topPX = 80;
  }
  updateDropdownMenu();
};

function backToTop() {
  document.documentElement.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function changeThemeBy(theme) {
  document.getElementById("theme").innerText = ["☀️", "🌙"][theme];
  document.getElementById("theme-top").innerText = ["☀️", "🌙"][theme];
  document.documentElement.style.setProperty("--bg-color", ["white", "#383838"][theme]);
  document.documentElement.style.setProperty("--sidebar-color", ["bisque", "#555"][theme]);
  document.documentElement.style.setProperty("--title-color", ["#333", "white"][theme]);
  document.documentElement.style.setProperty("--excerpt-color", ["#444", "white"][theme]);
  document.documentElement.style.setProperty("--hover-color", ["dodgerblue", "#7db0ff"][theme]);
}

if (getCookie("theme") === null)
  setCookie("theme", 0, new Date(9999, 0, 1));
changeThemeBy(getCookie("theme"));

function changeTheme() {
  setCookie("theme", getCookie("theme") ^ 1, new Date(9999, 0, 1));
  changeThemeBy(getCookie("theme"));
}

let droppedDown = 0;
function dropdown() {
  droppedDown ^= 1;
  document.getElementById("dropdown").classList.toggle("change");
  topREM = [15, 0][droppedDown];
  updateDropdownMenu();
}

let topPX = 80;
let topREM = 15;
function updateDropdownMenu() {
  document.getElementById("dropdown-menu").style.top = "calc(" + topPX + "px - " + topREM + "rem)";
  document.getElementById("dropdown-menu").style.boxShadow = ["none", "0 0 10px 0 rgba(0, 0, 0, .3)"][droppedDown];
}
