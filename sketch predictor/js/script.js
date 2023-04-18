class Sketchpad {
  constructor(container, size = 400) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = size;
    this.canvas.height = size;
    this.canvas.style = `
    background-color:white;
    box-shadow:0px 0px 10px 2px black;
    `;
    container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.path;
    this.isDrawing = false;
    this.#addEventListener();
  }
  #addEventListener() {
    this.canvas.onmousedown = (evt) => {
      const mouse = this.#getMouse(evt);
      // const rect = this.canvas.getBoundingClientRect();
      // const mouse = [
      //   Math.round(evt.clientX - rect.left),
      //   Math.round(evt.clientY - rect.top),
      // ];
      // console.log(mouse)
      this.path = [mouse];
      this.isDrawing = true;
    };
    this.canvas.onmousemove = (evt) => {
      if (this.isDrawing) {
        //   const rect = this.canvas.getBoundingClientRect();
        //   const mouse = [
        //     Math.round(evt.clientX - rect.left),
        //     Math.round(evt.clientY - rect.top),
        //   ];
        // console.log(mouse)
        const mouse = this.#getMouse(evt);
        this.path.push(mouse);
        //   console.log(this.path.length);
        this.#redraw();
      }
    };
    this.canvas.onmouseup = () => {
      this.isDrawing = false;
    };
  }

  //   redraw
  #redraw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    //   drawing the path
    draw.path(this.ctx, this.path);
  }

  //   method to extract mouse location
  #getMouse(evt) {
    const rect = this.canvas.getBoundingClientRect();
    return [
      Math.round(evt.clientX - rect.left),
      Math.round(evt.clientY - rect.top),
    ];
  }
}
