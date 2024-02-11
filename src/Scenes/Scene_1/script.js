let start_button_hover = {x: 0, y: 0, width: 0, height: 0}

class Projectile {
    constructor(){
        this.width = 10;
        this.height = 3;
        this.x = 10;
        this.y - 0;
        this.speed = 20;
        this.free = true;
    }
    draw(context){
        if(!this.free){
            context.fillRect(this.x, this.y, this.width, this.height)
        }
    }
    tick(){
        if(!this.free){
          this.x += this.speed;  
        }
    }
    start(x, y){
        this.x = x;
        this.y = y;
        this.free = false;
    }
    reset(){
        this.free = true;
    }
}

class Player {
    constructor(game){

        this.game = game;

        this.width = window.innerWidth * 0.3;
        this.height = this.width * 0.9;
        this.x = 200;
        this.y = 200;

        this.isAttackig = false;
        this.isDeffending = false;
        this.isRunningRight = false;
        this.isRunningLeft = false;
        this.isInAir = false;

        this.currentAttack = 1;

        this.speed = 5;
        this.health = 100;
    }
    draw(context){
        context.fillRect(this.x, this.y, this.width, this.height);
    }
    tick(){
        if (this.game.keysPressed.indexOf('a') > -1) this.x -= this.speed;
        if (this.game.keysPressed.indexOf('d') > -1) this.x += this.speed;
        if ((this.x + this.width * 0.5) < 0) this.x = 0 - (this.width * 0.5);
        if (this.x >= window.innerWidth - (this.width * 0.5)) this.x = window.innerWidth - (this.width * 0.5)
    }
    fire(){
        const projectile = this.game.getProjectile();
        if(projectile) projectile.start(this.x, this.y);
    }
    
}

class Game {
    constructor(canvas){

        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.keysPressed = []
        this.Player = new Player(this)

        this.projectilesPool = [];
        this.numberOfProjectiles = 10;
        this.createProjectiles();
        console.log(this.projectilesPool)

        window.addEventListener('keydown', (e)=>{
            if(this.keysPressed.indexOf(e.key) === -1){
                this.keysPressed.push(e.key);
            }
            console.log(this.keysPressed)
        })

        window.addEventListener('keyup', (e)=>{
            const index = this.keysPressed.indexOf(e.key);
            if (index > -1) this.keysPressed.splice(index, 1);
            console.log(this.keysPressed)
        })

    }
    render(context){
        this.Player.draw(context)
        this.Player.tick()
    }
    createProjectiles(){
        for (let i = 0; i < this.numberOfProjectiles; i++){
            this.projectilesPool.push(new Projectile());
        }
    }
    getProjectile(){
        for (let i = 0; i < this.projectilesPool.length; i++){
            if (this.projectilesPool[i].free) return this.projectilesPool[i]
        }
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
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.render(ctx);
        requestAnimationFrame(animate);
    }
    animate();


})

