class Form{

    constructor(){
        this.button=createButton("Start")
    }


    display(){
        this.button.position(600, 200)
        this.button.mousePressed(()=>{
            this.button.hide();
            gameState=PLAY;
            
        })
    }

}