export class Image {
    constructor(game, width, height, x, y, speed, image){
        this.game = game;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.image = image;
    }

    BeginPlay(context){

        context.drawImage(this.image, this.x, this.y, this.width, this.height);

    }

}