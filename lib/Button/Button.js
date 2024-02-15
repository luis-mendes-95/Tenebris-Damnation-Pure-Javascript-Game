import { CheckMouseCollision } from "../Dynamics/Dynamics.js";

export class Button {
    /**
     * The Button class starts with an instance of the game, and receives also width, height, x position, y position, speed and an image source to render it
     * inside a the game canvas. 
     * The Button class has some methods that deals with animating itself and also giving click functions as it is needed to be called after instanciating a new
     * class.
     */
    constructor(game, width, height, x, y, speed, image){
        this.game = game;
        this.width = width;
        this.initialWidth = width;
        this.height = height;
        this.initialHeight = height;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.image = image;
        this.isMouseColliding = false;
    }

    /**
     * This method needs to be called to start this element into canvas, the rest is not so necessary, but this one is mandatory.
     */
    BeginPlay(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    HoverTransformScale(){
        
        let bIsMouseColliding = CheckMouseCollision(this);
        if(bIsMouseColliding){ this.isMouseColliding = true; }
    }

    GoToLink(Link){
        location.href = Link;
    }

}