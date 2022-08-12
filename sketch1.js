function setup(){
    createCanvas(400,400);

    box = new Box(200,100,40,40)
    box2 = new Box(100,200,30,30)

}

function draw(){
    background(0);

    box.show()
    box.set_speed(3)
    box2.show()
    box2.set_speed(6)
}
