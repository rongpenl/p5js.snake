var scl = 50;
var cols, rows;
var snake;
var food;

function setup() {
  createCanvas(600, 600);
  cols = floor(width / scl);
  rows = floor(height / scl);

  // Initialize the snake
  snake = new Snake();

  // Initialize food location
  pickLocation();

  frameRate(10); // Control the speed of the game
}

function draw() {
  background(51);
  drawGrid();
  if (snake.eat(food)) {
    pickLocation();
  }
  snake.death();
  snake.update();
  snake.show();
  
  // Drawing snake food
  fill(255, 0, 100);
  rect(food.x, food.y, scl, scl);
}

function drawGrid() {
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(12);

  // Loop through the grid array to draw each cell
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * scl;
      let y = j * scl;
      stroke(255);
      noFill();
      rect(x, y, scl, scl);
      fill(255);
      noStroke();
      text(`(${i}, ${j})`, x + scl / 2, y + scl / 2);
    }
  }
}

// Function to pick a new food location
function pickLocation() {
  var cols = floor(width / scl);
  var rows = floor(height / scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl); // Expand it back out to grid scale
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    snake.dir(0, -1); // Move up
  } else if (keyCode === DOWN_ARROW) {
    snake.dir(0, 1); // Move down
  } else if (keyCode === RIGHT_ARROW) {
    snake.dir(1, 0); // Move right
  } else if (keyCode === LEFT_ARROW) {
    snake.dir(-1, 0); // Move left
  }
}

// Snake class to handle movement, eating, and death
class Snake {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.xspeed = 1;
    this.yspeed = 0;
    this.total = 0; // Track the length of the snake
    this.tail = []; // Array to store the tail
  }

  // Function to set direction
  dir(x, y) {
    this.xspeed = x;
    this.yspeed = y;
  }

  // Function to check if the snake eats the food
  eat(pos) {
    var d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1) {
      this.total++;
      return true;
    } else {
      return false;
    }
  }

  // Function to update snake's position
  update() {
    if (this.total === this.tail.length) {
      for (var i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i + 1];
      }
    }
    this.tail[this.total - 1] = createVector(this.x, this.y);

    this.x = this.x + this.xspeed * scl;
    this.y = this.y + this.yspeed * scl;

    // Constrain snake to stay within the grid
    this.x = constrain(this.x, 0, width - scl);
    this.y = constrain(this.y, 0, height - scl);
  }

  // Function to check if the snake hits itself
  death() {
    for (var i = 0; i < this.tail.length; i++) {
      var pos = this.tail[i];
      var d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
        this.total = 0;
        this.tail = [];
      }
    }
  }

  // Function to show the snake
  show() {
    fill(255);
    for (var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
    rect(this.x, this.y, scl, scl);
  }
}
