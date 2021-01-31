
//global variables
let slider = document.getElementById("myRange");
let currentGridSize = 0;
let output,oldV;
let clickFlag = false;
let randomColorFlag = false;
let colorUsed = "";
let functionOfColorChoice;
let drawingOrNotText = document.getElementById("drawingText");
let usedColoringMethod ="nothing";

//TODO add a way to show the user that he is drawing right now or not


initButtons();
startSketch();

//start defualt values for slider and sketch box
function startSketch(){
    slider.value = 2;
    createBoxes(2); 
    
    output = document.getElementById("demo");
    output.textContent = `2X2 Or 4 squares,`;
    usedColoringMethod = document.getElementById("usedColoring");
    usedColoringMethod.textContent = "not using a color method";

    
    currentGridSize = document.getElementById("cssGrid").childElementCount;
     oldV = 2;

}



//check if you need to draw or not
document.addEventListener(`click`,function(e){
    if(e.target.classList.contains("box")){


        clickFlag = !clickFlag;
    
        if(clickFlag){
            drawingOrNotText.textContent = "Coloring";
            drawingOrNotText.style = "color:green;"

            if(randomColorFlag){
                e.target.style.background=`${generateRndColor()}`;
                
            }else{
                e.target.style.background=`${colorUsed}`;
            }

        }else{
            drawingOrNotText.textContent = "Not coloring";
            drawingOrNotText.style = "color:red;"
        }


    }
    ;
});


functionOfColorChoice;





 // slider , using old slider variable to know if he moved right or left
slider.oninput = function() {
    
    if(Number(oldV) < Number(this.value)){
        createBoxes(this.value);
        oldV = this.value; 
    }else if (Number(oldV) > Number(this.value)){
        removeBoxes(this.value);
        oldV = this.value; 
    }
    
    //FIGURE OUT WHY IT CHANGES 10X10 AND 9X9 AFTER YOU GO THRGHO THEM = javascript took oldV as and this.value string 
    output.textContent = `${this.value}X${this.value} Or ${this.value * this.value} squares`;
}

//creates new divs of type box 
function createBoxes(squareGrid){

    restartBoxesAfterChange();

    //get connection to the node sketchbox
    let sketchBox =  document.querySelector(".sketch-box");
    

    //create a new div and give it the class box
    let box = document.createElement('div');
    box.nodeName = "box";
    box.classList.add("box");
    

    //change the amount of columns in the grid
    document.getElementById("cssGrid").style.gridTemplateColumns = `repeat(${squareGrid}, 1fr)`;


    //clone the child box into sktechbox node
    let gridSize = squareGrid * squareGrid;

        for(let i = 0 ; i < gridSize - currentGridSize;i++){
            
            sketchBox.appendChild(box.cloneNode(true));
        }
        
    //update the gridsize after changes
    currentGridSize = document.getElementById("cssGrid").childElementCount;

}
//remove box divs from cssGrid 
function removeBoxes(squareGrid){
    
    let myCssGrid = Array.from(document.getElementById("cssGrid").children);
    let lastBox = myCssGrid.length-1;
    document.getElementById("cssGrid").style.gridTemplateColumns = `repeat(${squareGrid}, 1fr)`;
    let gridSize = squareGrid * squareGrid;
    
    for(let i = 0 ; i < currentGridSize - gridSize; i++ ){
        myCssGrid[lastBox--].remove();
    }
    
    restartBoxesAfterChange();

    currentGridSize = document.getElementById("cssGrid").childElementCount;


}
//restart grid box colors
function restartBoxesAfterChange(){

    let boxes = document.getElementsByClassName("box");
    let length = boxes.length;

  for (let i=0; i < length; i++) {
    boxes[i].style.background = "white";
    
  }

    
}


//randomize the color choosen
function rndColorBox(){
    
    let color;
    let randomColor = Math.floor(Math.random()*16777215).toString(16);
    color = `#${randomColor}`;
    usedColoringMethod.textContent = "Using random color";
    
    
    document.addEventListener('mouseover', function (e) {
    if (e.target.classList.contains("box") && clickFlag) {
        e.target.style.background=`${color}`;

        randomColor = Math.floor(Math.random()*16777215).toString(16);
        color = `#${randomColor}`;
        usedColoringMethod.style = `color:${color};`;
        
        } 
    });

    randomColorFlag = true;
    functionOfColorChoice = rndColorBox;
    

}


//color picker
function singleColor(){
usedColoringMethod.textContent = "Using single color";

//changes the box color 
document.addEventListener('mouseover', function (e) {
    let color = document.getElementById("colorpicker").value; 
    usedColoringMethod.style = `color:${color};`;
    colorUsed = color;
    if (e.target.classList.contains("box") && clickFlag) {
        e.target.style.background=`${color}`;
        
    } 
});

randomColorFlag = false;
functionOfColorChoice = singleColor;
}

function eraseBox(){

    //changes the box color 
    usedColoringMethod.textContent = "Using Eraser!!";
    usedColoringMethod.style = "color:#000000";
    document.addEventListener('mouseover', function (e) {
    colorUsed = "#ffffff";
    if (e.target.classList.contains("box") && clickFlag) {
        e.target.style.background='#ffffff';
        
    } 
});

randomColorFlag = false;
functionOfColorChoice = eraseBox;
}

//initialize buttons
function initButtons(){

    const resetBtn = document.querySelector('#resetBtn');
    resetBtn.addEventListener('click', restartBoxesAfterChange);

    const rndColorBtn = document.querySelector('#rndColorBtn');
    rndColorBtn.addEventListener('click', rndColorBox);

    const colorpicker = document.querySelector("#colorpicker");
    colorpicker.addEventListener('click' , singleColor);

    const eraser = document.querySelector("#eraserBtn");
    eraser.addEventListener('click' , eraseBox);

    

}







function generateRndColor(){
    let randomColor = Math.floor(Math.random()*16777215).toString(16);
    let color = `#${randomColor}`;
    return color;
}




