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
// cursor (see body::before in style.css). Suppressed over the hand drawing,
// which has its own effect (the auto-sweep) and sits in front of the grid.
(function () {
  if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  var root = document.documentElement;
  var handFigure = document.querySelector(".hand-figure");

  document.addEventListener("mousemove", function (e) {
    if (handFigure && handFigure.contains(e.target)) {
      root.style.setProperty("--mx", "-9999px");
      root.style.setProperty("--my", "-9999px");
      return;
    }
    root.style.setProperty("--mx", e.clientX + "px");
    root.style.setProperty("--my", e.clientY + "px");
  });
})();
