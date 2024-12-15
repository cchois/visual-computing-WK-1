class Asteroid {
  constructor(pos, r) {
    if (pos) {
      this.pos = pos.copy();
    } else {
      this.pos = createVector(random(width), random(height));
    }
    this.v = p5.Vector.random2D();
    this.r = r || random(30, 50);
    this.totalVertices = floor(random(5, 15));
    this.offset = [];
    for (let i = 0; i < this.totalVertices; i++) {
      this.offset[i] = random(-this.r * 0.5, this.r * 0.5);
    }
  }

  update() {
    this.pos.add(this.v);
  }

  show() {
    push();
    stroke(255);
    noFill();
    translate(this.pos.x, this.pos.y);
    beginShape();
    for (let i = 0; i < this.totalVertices; i++) {
      let ang = map(i, 0, this.totalVertices, 0, TWO_PI);
      let rvar = this.r + this.offset[i];
      let x = rvar * cos(ang);
      let y = rvar * sin(ang);
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }

  edges() {
    if (this.pos.x > width + this.r) this.pos.x = -this.r;
    else if (this.pos.x < -this.r) this.pos.x = width + this.r;

    if (this.pos.y > height + this.r) this.pos.y = -this.r;
    else if (this.pos.y < -this.r) this.pos.y = height + this.r;
  }

  breakup() {
    let newAsteroids = [];
    newAsteroids[0] = new Asteroid(this.pos, this.r / 2);
    newAsteroids[1] = new Asteroid(this.pos, this.r / 2);
    return newAsteroids;
  }
}
