
export const CheckMouseCollision = (Element) => {
    //console.log("dae viadaje")
    //console.log(Element.width)
    //console.log(Element.isMouseColliding)

    //console.log(Element.game.canvas.width)
    //console.log(Element.game.canvas.height)

    Element.game.canvas.addEventListener('mousemove', function(event) {

        let changed = false;

        let rect = Element.game.canvas.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;

    });

 
}