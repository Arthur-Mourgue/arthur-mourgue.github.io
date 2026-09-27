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
// over the hand — an opaque backing plate behind the drawing (.hand__backing)
// keeps the crosses from showing through it.
(function () {
  if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  var root = document.documentElement;

  document.addEventListener("mousemove", function (e) {
    root.style.setProperty("--mx", e.clientX + "px");
    root.style.setProperty("--my", e.clientY + "px");
  });
})();
