type svgTag = 'svg' | 'circle';
type svgAttr = {
  [key: string]: string;
};

const win = window;
const doc = win.document;

class CreateSVG {
  private rootElm: SVGElement;

  private attr: svgAttr;

  constructor(tag: svgTag, attr: svgAttr) {
    this.rootElm = doc.createElementNS('http://www.w3.org/2000/svg', tag);
    this.attr = attr;

    this.init();
  }

  public init(): SVGElement {
    const {rootElm, attr} = this;

    for (const key in attr) {
      if (Object.hasOwnProperty.call(attr, key)) {
        rootElm.setAttributeNS(null, key, attr[key]);
      }
    }

    return rootElm;
  }
}

export default CreateSVG;
