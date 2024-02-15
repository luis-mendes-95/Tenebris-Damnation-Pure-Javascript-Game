
import { Button } from "../../../lib/Button/Button.js" 
import {ResolutionMessage} from "../../../lib/Messages/ResolutionMessage.js"

/**ALL VARIABLES DATA WILL BE STORED HERE*/
let GameData = {}

/**FUNCTION TO SET ALL VARIABLES TO ELEMENTS THAT WILL BE RENDERED IN CANVAS */
const SetGameElementsData = () => {

    //dev logo
    const RiddenCharacter = () => {

        GameData.RiddenCharacterAnimationIdleRight = []
        GameData.RiddenCharacterAnimationIdleLeft = []

        GameData.dev_logo_width = window.innerWidth * 0.15
        GameData.dev_logo_height = GameData.dev_logo_width * 0.25
        GameData.dev_logo_x = window.innerWidth / 100;
        GameData.dev_logo_y = window.innerHeight;
        GameData.dev_logo_speed = 0.5;
        GameData.dev_logo_image = document.getElementById("dev_logo")
    }
    RiddenCharacter();

    

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

        this.HoverTransformScale(GameData);

        this.GoToLink(GameData, "http://tejas.com")

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

        this.HoverTransformScale(GameData);

        this.GoToLink(GameData, "src/Scenes/Scene_1")

    }

    t
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

            this.ResolutionMessage = new ResolutionMessage(this)
        }
        RenderGameElements();

       

    }
    render(context){

        const StartAllElements = () => {


        }
        StartAllElements();

    }
    renderResolutionMessage(context){
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
            GameData.GameWidth = canvas.width;
            GameData.GameHeight = canvas.height;
        
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

            /**GETS MOUSE X AND Y POSITION*/
            canvas.addEventListener('mousemove', function(event) {
    
                let rect = canvas.getBoundingClientRect();
                let x = event.clientX - rect.left;
                let y = event.clientY - rect.top;

                GameData.MouseX = x;
                GameData.MouseY = y;       
        
            });

            /**GETS IF MOUSE IS CLICKED */
            canvas.addEventListener('click', function(event) {
    
                let rect = canvas.getBoundingClientRect();
                let x = event.clientX - rect.left;
                let y = event.clientY - rect.top;

                GameData.Clicked = true;

                setTimeout(() => {
                    GameData.Clicked = false;
                }, 200);  
        
            });


        }
        GetCanvasAndStart();


    
    })
}
BeginPlay();


