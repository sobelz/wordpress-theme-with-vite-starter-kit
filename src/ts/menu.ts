import Collapsible from "./lib/collapsible";

const navMenu = document.querySelector<HTMLElement>(".nav-menu");
const mainMenu = document.querySelector<HTMLElement>(".main-menu");
const showMenuButtons = document.querySelectorAll(".show-menu");
const hideMenuButtons = document.querySelectorAll(".hide-menu");

if (mainMenu && navMenu) {
  const showMenuHandler = () => {
    navMenu.classList.add("show");
  };
  const hideMenuHandler = () => {
    navMenu.classList.remove("show");
  };

  showMenuButtons.forEach((showMenuButton) => {
    showMenuButton.addEventListener("click", showMenuHandler);
  });
  hideMenuButtons.forEach((hideMenuButton) => {
    hideMenuButton.addEventListener("click", hideMenuHandler);
  });

  const menuItemsHasSubmenu =
    mainMenu.querySelectorAll<HTMLLIElement>("li:has(ul)");
  menuItemsHasSubmenu.forEach((menuItem) => {
    const submenu = menuItem.querySelector<HTMLUListElement>("ul");
    const itemTitle = menuItem.querySelector<HTMLAnchorElement>("a");
    if (submenu && itemTitle) {
      new Collapsible({ clickable: itemTitle, content: submenu });
    }
  });
}
