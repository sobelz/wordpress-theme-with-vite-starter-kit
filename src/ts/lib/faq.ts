import Collapsible from "./collapsible";

const faqItems = document.querySelectorAll<HTMLDivElement>(".faq-item");
let activeItemIndex: number = -1;
const allCollapsible: Collapsible[] = [];
faqItems.forEach((faqItem, i) => {
  const title = faqItem.querySelector<HTMLHeadingElement>(".title");
  const content = faqItem.querySelector<HTMLDivElement>(".content");
  if (title && content) {
    allCollapsible[i] = new Collapsible({
      clickable: title,
      content,
      cb: function (status: boolean) {
        if (allCollapsible[activeItemIndex]) {
          handleHidePreviousItem(activeItemIndex);
        }
        if (status) {
          handleShowItem(i);
        }
      },
    });
  }
});
const handleShowItem = (index: number) => {
  activeItemIndex = index;
  setActiveClass(index);
};
const handleHidePreviousItem = (index: number) => {
  allCollapsible[index].handleHide();
  unsetActiveClass(index);
  activeItemIndex = -1;
};
const setActiveClass = (index: number) => {
  faqItems[index]?.classList.add("active");
};
const unsetActiveClass = (index: number) => {
  faqItems[index]?.classList.remove("active");
};
