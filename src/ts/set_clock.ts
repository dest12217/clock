import CreateSVG from './create_svg';


type clockHands = 'seconds' | 'minutes' | 'hours';
type statusSvgCircle = {
  [key: string]: string;
  cx: string;
  cy: string;
  r: string;
}

class SetClock {
  private ui: {
    root: HTMLElement;
    elmSvg: {
      [key in clockHands]?: SVGElement;
    };
    dateNow: {
      [key in clockHands]: number;
    };
    dateStart: Date;
    loopBuff: number;
    selectorSvgWrap: string;
    selectorPghWrap: string;
    statusSvgCircle: statusSvgCircle;
  };

  constructor(elm: HTMLElement) {
    this.ui = {
      root: elm,
      elmSvg: {},
      dateNow: {
        seconds: 0,
        minutes: 0,
        hours: 0
      },
      dateStart: new Date(),
      loopBuff: 100,
      selectorPghWrap: '.clock_pgh',
      selectorSvgWrap: '.clock_circle',
      statusSvgCircle: {
        class: '__type_01',
        cx: '120',
        cy: '120',
        r: '100'
      }
    };

    if (!this.ui.root) return;

    this.init();
  }

  private init(): void {
    const {root, loopBuff} = this.ui;

    // JS Enable
    root.dataset.scriptEnable = 'true';

    // 初期値を作る
    this.createClockHands('hours');
    this.createClockHands('minutes');
    this.createClockHands('seconds');

    setInterval(() => {
      this.getdateNow();
      this.drawClockHands('hours');
      this.drawClockHands('minutes');
      this.drawClockHands('seconds');
    }, loopBuff);
  }

  private getdateNow(): void {
    const {dateNow} = this.ui;
    const date = new Date();

    dateNow.seconds = date.getSeconds();
    dateNow.minutes = date.getMinutes();
    dateNow.hours = date.getHours();
  }

  private createClockHands(type: clockHands): void {
    const {root, elmSvg, selectorSvgWrap, statusSvgCircle} = this.ui;
    const elm = new CreateSVG('circle', statusSvgCircle).init();
    const wrapElm = root.querySelector(`${selectorSvgWrap}.__type_${type}`);

    if (
      !(wrapElm instanceof SVGElement) ||
      !(elm instanceof SVGElement)
    ) return;

    wrapElm.appendChild(elm);
    elmSvg[type] = elm;
  }

  private drawClockHands(type: clockHands): void {
    const {root, elmSvg, dateNow, selectorPghWrap, statusSvgCircle} = this.ui;
    const circumference = Number(statusSvgCircle.r) * 2 * Math.PI;
    const elm = elmSvg[type];
    const elmPghItem = root.querySelector(`${selectorPghWrap} .__type_${type}`);
    const ratio = dateNow[type] / ((type === 'hours') ? 12 : 60);

    if (!elm) return;

    if (elmPghItem) elmPghItem.textContent = String(dateNow[type]);

    elm.style.strokeDasharray = `${circumference * ratio} ${circumference}`;
  }
}

export default SetClock;
