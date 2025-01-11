function setupIcon(iconf, el) {
  const icon = document.createElement("img");
  icon.src = "./gallery/icons/" + iconf.toLowerCase() + ".png";
  // icon.width = "20px"
  // icon.height = "20px"
  // icon.style.width = "40px";
  icon.style.height = "40px";
  return el ? el.appendChild(icon) : icon;
}
