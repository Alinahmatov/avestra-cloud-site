if (location.hostname === "alinahmatov.github.io") {
  const path = location.pathname.replace(/^\/avestra-cloud-site\/?/, "/");
  location.replace("https://avestra.online" + path + location.search + location.hash);
}

const nav = document.querySelector(".nav");
const menu = document.querySelector(".menu");

if (menu && nav) {
  menu.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menu.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll(".links a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menu.setAttribute("aria-expanded", "false");
    });
  });
}
