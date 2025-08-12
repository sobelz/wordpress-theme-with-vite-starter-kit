const isInViewport = (
  cb: (isIntersecting: boolean) => void,
  {
    el,
    once,
    options = {},
  }: {
    el: HTMLElement;
    once: boolean;
    options?: IntersectionObserverInit;
  }
) => {
  const observer = new IntersectionObserver(([{ isIntersecting }]) => {
    cb(isIntersecting);
    if (once && isIntersecting) {
      observer.disconnect();
    }
  }, options);

  observer.observe(el);
};

export default isInViewport;
