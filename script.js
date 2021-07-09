let canvas = document.getElementById("snake"); // elemento que irá rodar com o jogo
let context = canvas.getContext("2d"); //elemento para carregar img em 2d
let box = 32; //definição do tamanho box
let snake = []; //criar snake como array
snake[0] ={
    x: 8 * box,
    y: 8 * box
}
//direção inicial
let direction = "right";
//pontos aletorios do objetivo da snake
let food ={
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}
//desenha o retângulo usando x e y e a largura e altura setadas
function criarBG(){
    context.fillStyle = "lightblue";
    context.fillRect(0, 0, 16*box, 16*box); 
}

//cobrinha criação
function criarCobrinha (){
    for(i = 0; i < snake.length; i++){
        context.fillStyle = "blue";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood (){
    context.fillStyle = "green";
    context.fillRect(food.x, food.y, box, box);
}

//quando um evento acontece, detecta e chama uma função
document.addEventListener('keydown', update);

//direcionar snake de um lado para o outro 
//numeros direcionais com base na box geral
function update(event){
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
}

function iniciarJogo(){    
	//para mostrar a snake no outro lado
    if(snake[0].x > 15*box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if(snake[0].y > 15*box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;
    
	//caso snake encoste no "proprio corpo"
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('Game Over ');
        }
    }

	//chamando as funções
    criarBG();
    criarCobrinha();
    drawFood();

	//ponto de partida da snake
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

	//adicionando uma box quando direcionado 
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

	//condição caso snake encontre objetivo
    if(snakeX != food.x || snakeY != food.y){
        snake.pop(); //pop tira o último elemento da lista
    }else{
        food.x = Math.floor(Math.random() * 15 +1) * box;
        food.y = Math.floor(Math.random() * 15 +1) * box;
    }
    
    let newHead ={
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newHead); //método unshift adiciona como primeiro da array da snake
}

//intervalo de tempo para iniciar o jogo
let jogo = setInterval(iniciarJogo, 100);