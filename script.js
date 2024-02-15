import { Image } from "./lib/Image/Image.js";
import { Button } from "./lib/Button/Button.js";
import { ResolutionMessage } from "./lib/Messages/ResolutionMessage.js";

/**ALL VARIABLES DATA WILL BE STORED HERE*/
let GameData = []

/**FUNCTION TO SET ALL VARIABLES TO ELEMENTS THAT WILL BE RENDERED IN CANVAS */
const SetGameElementsData = () => {

    //dev logo
    const ImageDevLogo = () => {
        GameData.dev_logo_width = window.innerWidth * 0.15
        GameData.dev_logo_height = GameData.dev_logo_width * 0.25
        GameData.dev_logo_x = window.innerWidth / 100;
        GameData.dev_logo_y = window.innerHeight;
        GameData.dev_logo_speed = 0.5;
        GameData.dev_logo_image = document.getElementById("dev_logo")
    }
    ImageDevLogo();

    //game title
    const ImageGameTitle = () => {
        GameData.game_title_width = window.innerWidth * 0.5
        GameData.game_title_height = GameData.game_title_width * 0.50
        GameData.game_title_x =  (window.innerWidth * 0.20)
        GameData.game_title_y = (window.innerHeight * -0.7)
        GameData.game_title_speed = 1.5;
        GameData.game_title_image = document.getElementById("image_cartola")
    }
    ImageGameTitle();

    //start button
    const ImageStartButton = () => {
        GameData.start_button_width = (window.innerWidth * 0.10)
        GameData.start_button_height = GameData.start_button_width * 0.4
        GameData.start_button_x = (window.innerWidth / 1.18)
        GameData.start_button_y = (window.innerHeight * 1.25)
        GameData.start_button_speed = 2.5;
        GameData.start_button_image = document.getElementById("button_start")
    }
    ImageStartButton();

}
SetGameElementsData();

/**DECLARATION OF CLASSES THAT WILL BE RENDERED IN CANVAS */
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
class ButtonStart extends Button {
    constructor(game, width, height, x, y, speed, image){
        super(game, width, height, x, y, speed, image);


    }
    
    Tick(){

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

        //this.HoverTransformScale();
    }
}


/**MAIN CLASS*/
class Game {
    constructor(canvas){

        const StartCanvas = () => {
            this.canvas = canvas;
            this.width = this.canvas.width;
            this.height = this.canvas.height;
        }
        StartCanvas();

        const RenderGameElements = () => {
            this.brand_logo = new DevLogo(this, GameData.dev_logo_width, GameData.dev_logo_height, GameData.dev_logo_x, GameData.dev_logo_y, GameData.dev_logo_speed, GameData.dev_logo_image)
            this.ButtonStart = new ButtonStart(this, GameData.start_button_width, GameData.start_button_height, GameData.start_button_x, GameData.start_button_y, GameData.start_button_speed, GameData.start_button_image )
            this.GameTitle = new GameTitle(this, GameData.game_title_width, GameData.game_title_height, GameData.game_title_x, GameData.game_title_y, GameData.game_title_speed, GameData.game_title_image  )
            this.ResolutionMessage = new ResolutionMessage(this)
        }
        RenderGameElements();

       

    }
    render(context){

        const StartAllElements = () => {

            this.ButtonStart.BeginPlay(context)
            this.ButtonStart.Tick();
       
            this.GameTitle.BeginPlay(context)
            this.GameTitle.Tick()
    
            this.brand_logo.BeginPlay(context)
            this.brand_logo.Tick();
        }
        StartAllElements();

    }
    renderResolutionMessage(context){
        this.brand_logo.BeginPlay(context)
        this.brand_logo.Tick();
        this.ResolutionMessage.draw(context)
    }
}

//RUN THE GAME WHEN EVERYTHING LOADS UP
const BeginPlay = () => {

    window.addEventListener('load', ()=>{

        window.addEventListener('resize', () => {location.reload();})

        const GetCanvasAndStart = () => {
            const canvas = document.getElementById('canvas1');
            const ctx = canvas.getContext('2d');
            canvas.width = window.innerWidth - 10;
            canvas.height = window.innerHeight - 10;
        
            const game = new Game(canvas);
        
            const Tick = () => {
                if(canvas.width > 650 && canvas.height > 350) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    game.render(ctx);
                    requestAnimationFrame(Tick);
                } else {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    game.renderResolutionMessage(ctx);
                    requestAnimationFrame(Tick);
                }
        
            }
            Tick();
        }
        GetCanvasAndStart();
    
    })
}
BeginPlay();


