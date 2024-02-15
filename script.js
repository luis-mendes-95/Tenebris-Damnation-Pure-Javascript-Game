import { Image } from "./lib/Image/Image.js";

let start_button_hover = {x: 0, y: 0, width: 0, height: 0}

/**width, height, x and y values and functions for all screen elements*/
//dev logo
let dev_logo_width = window.innerWidth * 0.15
let dev_logo_height = dev_logo_width * 0.25
let dev_logo_x = window.innerWidth / 100;
let dev_logo_y = window.innerHeight;
let dev_logo_speed = 0.5;
let dev_logo_image = document.getElementById("dev_logo")

//game title
let game_title_width = window.innerWidth * 0.5
let game_title_height = game_title_width * 0.50
let game_title_x =  (window.innerWidth * 0.20)
let game_title_y = (window.innerHeight * -0.7)
let game_title_speed = 1.5;
let game_title_image = document.getElementById("image_cartola")


class DevLogo extends Image {
    constructor(game, width, height, x, y, speed, image) {

        super(game, width, height, x, y, speed, image);

    }

    Tick(){

        const animation_from_bottom = () => {
            if(this.y >= (window.innerHeight - (this.height * 1.5))){
                this.y -= this.speed;
            }
        }
        animation_from_bottom();

    }
}

class GameTitle extends Image {
    constructor(game, width, height, x, y, speed, image) {
        super(game, width, height, x, y, speed, image);
    }

    Tick(){

        const animation_from_top = () => {
            if(this.y <= (window.innerHeight - (window.innerHeight * 0.98))){
                this.y += this.speed;
            }
        }
        animation_from_top();

    }
}

class ButtonStart {
    constructor(game){
        this.game = game;
        this.width = (window.innerWidth * 0.10);
        this.height = this.width * 0.4
        this.initialWidth = this.width;
        this.x = (window.innerWidth / 1.18);
        this.y = (window.innerHeight * 1.25) ;
        this.speed = 2.5;
        this.image = document.getElementById("button_start")
    }
    

    draw(context){

        context.drawImage(this.image, this.x, this.y, this.width, this.height);

    }

    tick(){

        const begginingAnimation = (origin) => {

            if(origin === "fromBottom"){
                if(this.y >= (window.innerHeight * 0.95) - this.height){
                    this.y -= this.speed;
                }
                if(this.x >= (window.innerWidth * 0.95) - this.width){
                    this.x -= this.speed;
                }
            }

        }
        begginingAnimation("fromBottom");

        const hoverTransform = () => {
            if (start_button_hover.isColliding){

                if(this.width <= this.initialWidth * 1.1) {
                    this.width += 2;
                    this.height = this.width * 0.4
                    document.body.style.cursor = "pointer"
                }

            } else {
                if(this.width >= this.initialWidth) {
                    this.width -= 2;
                    this.height = this.width * 0.4
                    this.y += 1;
                    this.x += 1;
                    document.body.style.cursor = "auto"
                }
            }
        }
        hoverTransform();

        start_button_hover.x = this.x
        start_button_hover.y = this.y
        start_button_hover.width = this.width
        start_button_hover.height = this.height
    }
}



class ResolutionMessage {
    constructor(game){
        this.game = game;
        this.width = (window.innerWidth * 0.5);
        this.height = (window.innerHeight * 0.5);
        this.x = (window.innerWidth * 0.25)
        this.y = (window.innerHeight * 0.25) ;
    }

    draw(context){
        context.fillRect(this.x, this.y, this.width, this.height);
    }

}

class Game {
    constructor(canvas){

        const StartCanvas = () => {
            this.canvas = canvas;
            this.width = this.canvas.width;
            this.height = this.canvas.height;
        }
        StartCanvas();

        const RenderGameElements = () => {
            
            this.brand_logo = new DevLogo(this, dev_logo_width, dev_logo_height, dev_logo_x, dev_logo_y, dev_logo_speed, dev_logo_image)
            this.ButtonStart = new ButtonStart(this)
            this.GameTitle = new GameTitle(this, game_title_width, game_title_height, game_title_x, game_title_y, game_title_speed, game_title_image  )
    
            this.ResolutionMessage = new ResolutionMessage(this)
        }
        RenderGameElements();

       

    }
    render(context){

        this.ButtonStart.draw(context)
        this.ButtonStart.tick();


        this.GameTitle.BeginPlay(context)
        this.GameTitle.Tick()

        this.brand_logo.BeginPlay(context)
        this.brand_logo.Tick();


    }
    renderResolutionMessage(context){
        this.brand_logo.draw(context)
        this.brand_logo.tick();
        this.ResolutionMessage.draw(context)
    }
}

//RUN THE GAME WHEN EVERYTHING LOADS UP
window.addEventListener('load', ()=>{

    window.addEventListener('resize', () => {location.reload();})

    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth - 10;
    canvas.height = window.innerHeight - 10;

    const game = new Game(canvas);

    const animate = () => {
        if(canvas.width > 650 && canvas.height > 350) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            game.render(ctx);
            requestAnimationFrame(animate);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            game.renderResolutionMessage(ctx);
            requestAnimationFrame(animate);
        }

    }
    animate();

    const checkMouseCollision = (a, b) => {
        if(a.x >= b.x && a.x <= (b.x + b.width) 
        && a.y >= b.y && a.y <= (b.y + b.height)){
            start_button_hover.isColliding = true;
        } else {
            start_button_hover.isColliding = false;
        }
        console.log(a.isColliding)
    }

    const hover_on_element = (hover_this_element) => {

        canvas.addEventListener('click', function(e) {
            e.preventDefault();
    

            if (start_button_hover.isColliding) {
                window.location.href = './src/scenes/scene_1';
            }

        });
        

        canvas.addEventListener('mousemove', function(event) {

            let rect = canvas.getBoundingClientRect();
            let mouseX = event.clientX - rect.left;
            let mouseY = event.clientY - rect.top;

            let mouseToCollide = {x: mouseX, y: mouseY }

            checkMouseCollision(mouseToCollide, hover_this_element);
          
        });
    }
    hover_on_element(start_button_hover);

})

