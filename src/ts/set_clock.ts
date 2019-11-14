class SetClock {
  private ui: {
    root: HTMLElement;
  };

  constructor(elm: HTMLElement) {
    this.ui = {
      root: elm
    };

    if (!this.ui.root) return;

    this.init();
  }

  private init(): void {
    const {root} = this.ui;

    // JS Enable
    root.dataset.scriptEnable = 'true';
  }
}

export default SetClock;
