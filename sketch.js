//function that makes a 2D array
function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for(let i = 0; i < arr.length; i++){
    arr[i] = new Array(rows);
  }
  return arr;
}

//global variables
let grid;
let cols;
let rows;

//size of each square in grid
let resolution = 20;

//this function runs at start
function setup() {
  
  //creates empty canvas
  createCanvas(600,400);
  
  //no. of squares depends on size of squares and size of screen
  cols = width/resolution;
  rows = height/resolution;
  
  //make the 2D array that'll hold the cells
  grid = make2DArray(cols,rows);
  
  //populate the 2D array with 0s and 1s randomly
  for(let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
      grid[i][j] = floor(random(2));
    }
  }
  
}

//the draw function is called over and over again
function draw() {
  background(0);
  
  //draw the squares using the 2D array
  for(let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
      let x = i * resolution;
      let y = j * resolution;
      if(grid[i][j] == 1){
        fill(255);
        rect(x,y,resolution,resolution);
      }
    }
  }
  
  //make an array that'll hold the next generation of cells
  let next = make2DArray(cols, rows);
  
  //make an array that holds info about the no. of cells 
  //each cell is surrounded by.
  let countArray = createCountMap(grid, cols, rows);
  
  //transform the old cell grid into the new cell grid i.e.
  //one generation to the next generation
  next = applyRules(grid, countArray, next);
  
  //store the new cell generation as grid, so we can do it all over again!
  grid = next;
  
}

//Function that makes an array that holds info about the no. of cells 
//each cell is surrounded by.
function createCountMap(arr, cols, rows){
  
  let countArray = make2DArray(cols, rows);
  
  for(let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
      
      let sum = 0;
      
      for(let k = -1; k < 2; k++){
        for(let l = -1; l < 2; l++){
          
            if(!(((i+k) < 0) || ((i+k) > cols-1) || ((j+l) < 0) || ((j+l) > rows-1))){
              sum += arr[i+k][j+l];
            }

        }
      }
      
      sum -= arr[i][j];
      
      countArray[i][j] = sum;
    }
  }

  return countArray;
}

//Function that transforms the old cell grid into the new cell grid i.e.
//one generation to the next generation
function applyRules(arr, countArray, arr2){
  
  for(let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
      
      if(arr[i][j] == 0){
        if(countArray[i][j] == 3){
          arr2[i][j] = 1;
        }
        else{
          arr2[i][j] = 0;
        }
      }
      else if(arr[i][j] == 1){
        if((countArray[i][j] < 2) || (countArray[i][j] > 3)){
          arr2[i][j] = 0;
        }
        else{
          arr2[i][j] = 1;
        }
      }
      
    }
  }
  
  return arr2;
}