// Theme toggle: defaults to light, remembers an explicit choice.
(function () {
  var KEY = "theme";
  var root = document.documentElement;

  function apply(theme) {
    root.setAttribute("data-theme", theme);
  }

  apply(localStorage.getItem(KEY) || "light");

  document.querySelectorAll(".theme-toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      localStorage.setItem(KEY, next);
      apply(next);
    });
  });
})();

// Tactile background: the page-wide cross grid lights up in blue around the
// cursor (see body::before in style.css). Tracking runs everywhere, including
// over the hand; .hand::before is an opaque paper backing, masked by the
// drawing, that keeps the crosses from showing through its strokes.
(function () {
  if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  var root = document.documentElement;

  document.addEventListener("mousemove", function (e) {
    // pageX/pageY (document-relative), not clientX/clientY (viewport-relative):
    // body::before is position: absolute and scrolls with the page.
    root.style.setProperty("--mx", e.pageX + "px");
    root.style.setProperty("--my", e.pageY + "px");
  });
})();

// Click ripple: every click drops a growing circle of accent crosses at the
// point, on top of the hover glow, so the whole grid reacts. The circle is a
// fixed-size div centred on the click; the .ripple keyframes grow its clip-path
// and fade it out. Runs on any pointer type; we remove the node when the
// animation ends and skip reduced-motion users.
(function () {
  var RADIUS = 520;     // half the ripple box size, in px (matches .ripple clip-path)

  var reduced = matchMedia("(prefers-reduced-motion: reduce)");

  document.addEventListener("click", function (e) {
    if (reduced.matches) return;

    var ripple = document.createElement("div");
    ripple.className = "ripple";
    var size = RADIUS * 2;
    ripple.style.width = size + "px";
    ripple.style.height = size + "px";
    // pageX/pageY (document-relative): the ripple is position: absolute in body
    // and must scroll with the page, like the hover glow.
    ripple.style.left = e.pageX - RADIUS + "px";
    ripple.style.top = e.pageY - RADIUS + "px";

    ripple.addEventListener("animationend", function () {
      ripple.remove();
    });
    document.body.appendChild(ripple);
  });
})();
