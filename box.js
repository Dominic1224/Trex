class Box{
    //constructor 
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    //function
    show(){
        rect(this.x,this.y,this.w,this.h)
    }
    set_speed(v){
        this.x += v
    }
}

