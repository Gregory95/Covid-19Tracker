var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("mainNav").style.top = "0";
  } else {
    document.getElementById("mainNav").style.top = "-100px";
  }
  prevScrollpos = currentScrollPos;
}