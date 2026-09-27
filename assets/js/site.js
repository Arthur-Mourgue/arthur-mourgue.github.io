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

// Tactile sensor dots on the hand drawing: each one brightens as the cursor
// approaches, like a touch sensor reacting before contact.
(function () {
  var figure = document.querySelector(".hand-figure");
  if (!figure || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  var sensors = figure.querySelectorAll(".sensor");
  var RADIUS = 170; // px — distance at which a sensor starts reacting

  figure.addEventListener("mousemove", function (e) {
    sensors.forEach(function (dot) {
      var rect = dot.getBoundingClientRect();
      var cx = rect.left + rect.width / 2;
      var cy = rect.top + rect.height / 2;
      var dist = Math.hypot(e.clientX - cx, e.clientY - cy);
      var proximity = Math.max(0, 1 - dist / RADIUS);
      dot.style.setProperty("--proximity", proximity.toFixed(3));
    });
  });

  figure.addEventListener("mouseleave", function () {
    sensors.forEach(function (dot) { dot.style.setProperty("--proximity", 0); });
  });
})();
