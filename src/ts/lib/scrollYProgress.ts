import isInViewport from "./isInViewport";

const scrollYProgress = (
  cb: (p: number) => void,
  {
    wrapper,
    once = false,
  }: {
    wrapper: HTMLElement;
    once?: boolean;
  }
) => {
  const addParallaxToElement = () => {
    const { top, bottom, height } = wrapper.getBoundingClientRect();

    const topElementToBottomWindow = window.innerHeight - top;
    const bottomElementToTopWindow = bottom;
    if (topElementToBottomWindow > 0 && bottomElementToTopWindow > 0) {
      const progressY =
        ((window.innerHeight - top) * 100) / (window.innerHeight + height);
      cb(progressY);
    }
  };

  isInViewport(
    (isIntersecting) => {
      const listenerController = new AbortController();
      if (isIntersecting) {
        window.addEventListener("scroll", addParallaxToElement, {
          signal: listenerController.signal,
        });
      } else {
        listenerController.abort();
      }
    },
    {
      el: wrapper,
      once,
    }
  );
};

export default scrollYProgress;
