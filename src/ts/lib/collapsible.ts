type CollapsibleConstructor = {
  clickable: HTMLElement;
  content: HTMLElement;
  cb?: (status: boolean) => void;
  closeHeight?: number;
};

class Collapsible {
  private clickable: CollapsibleConstructor["clickable"];
  private content: CollapsibleConstructor["content"];
  private cb: CollapsibleConstructor["cb"];
  private timeoutNumber: number | undefined;
  private status: boolean = false;

  public closeHeight: CollapsibleConstructor["closeHeight"] = 0;
  public duration: number = 300;

  constructor({
    clickable,
    content,
    cb,
    closeHeight = 0,
  }: CollapsibleConstructor) {
    this.clickable = clickable;
    this.content = content;
    this.cb = cb;
    this.closeHeight = closeHeight;
    this.init();
  }
  private callback() {
    this.cb && this.cb(this.status);
  }
  getStatus() {
    return this.status;
  }
  private init() {
    const { transitionDuration } = getComputedStyle(this.content);
    this.duration = parseFloat(transitionDuration) * 1000;
    if (this.duration < 100) {
      this.content.style.transition = "all ease-in-out 0.1s";
      this.duration = 100;
    }
    this.clickable.addEventListener("click", () => this.toggle());
  }

  private toggle() {
    if (this.timeoutNumber) clearTimeout(this.timeoutNumber);
    const clickableTag = this.clickable;
    clickableTag.classList.toggle("showContent");
    if (clickableTag.classList.contains("showContent")) {
      this.show();
    } else {
      this.hide();
    }
    this.callback();
  }
  private hide() {
    this.status = false;
    this.content.style.height = this.content.scrollHeight + "px";
    setTimeout(() => {
      this.content.style.height = `${this.closeHeight}px`;
    }, 10);
  }
  private show() {
    this.status = true;
    this.content.style.height = this.content.scrollHeight + "px";
    this.timeoutNumber = setTimeout(() => {
      this.content.style.height = "auto";
    }, this.duration);
  }

  handleHide() {
    this.clickable.classList.remove("showContent");
    this.hide();
  }
}

export default Collapsible;
