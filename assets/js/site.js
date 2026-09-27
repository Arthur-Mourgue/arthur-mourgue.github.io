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

// Tactile highlight on the hand drawing: brightens under the cursor.
(function () {
  var figure = document.querySelector(".hand-figure");
  if (!figure || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  var hand = figure.querySelector(".hand");
  figure.addEventListener("mousemove", function (e) {
    var rect = hand.getBoundingClientRect();
    hand.style.setProperty("--mx", ((e.clientX - rect.left) / rect.width) * 100 + "%");
    hand.style.setProperty("--my", ((e.clientY - rect.top) / rect.height) * 100 + "%");
  });
})();
