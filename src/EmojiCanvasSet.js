class EmojiCanvasSet {

  constructor(emojis = []) {
    this.hidden = this.constructor.makeHidden();
    this.canvases = this.constructor.makeCanvases(emojis);

    Object.values(this.canvases).map(this.appendCanvasToHidden)

  }

  appendCanvasToHidden(canvas) {
    this.hidden.appendChild(canvas);
  }

  getOrMake(emoji) {
    let canvas = this.canvases[emoji]
    if (!canvas) {
      canvas = this.constructor.makeEmojiCanvas(emoji);
      this.appendCanvasToHidden(canvas);
      this.canvases[emoji] = canvas;
    }
    return canvas;
  }

  static makeCanvases(emojis){
    return emojis.reduce((accumulator, moje) => {
      const canvas = this.constructor.makeEmojiCanvas(moje);
      accumulator[moje] = canvas;
      
      return accumulator;
    }, {});
  }

  static makeHidden(){
    const element = document.createElement("div");
    element.className = "hide";
    document.body.appendChild(element);
    return element;
  }

  static makeEmojiCanvas(emoji, radius = 256) {
    var canvas = document.createElement("canvas");
    canvas.height = radius;
    canvas.width = radius;

    var context = canvas.getContext("2d")
    context.translate(canvas.width / 2,canvas.height / 2);

    context.font=`${ radius }px Georgia`;
    context.fillStyle = "#ffffff"
    var width = context.measureText(emoji).width;
    context.fillText(emoji, 0 - (width / 2), 0 + (radius / 2.35));
    return canvas;
  }

}

export default EmojiCanvasSet;
