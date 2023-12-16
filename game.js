const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');
const historyTable = document.createElement('table');
document.body.appendChild(historyTable);

//const stripe = Stripe('pk_test_51NfghqKD8fOntsL1XBbcv0kNLxM1B5MI7x2A47ufbIIl3h0w1sPkWewS7b6Gr4JJ4yFu0tRYPfcxaEzNGbzo9evG00VU7cmw13');
let round = 1; // Add a round variable

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const playerImage = new Image();
playerImage.src = 'planeimgt.png';

const enemyImage = new Image();
enemyImage.src = 'backgaltt.png';

let playerX = 100;
let playerY = canvas.height / 2;
const playerWidth = 100;
const playerHeight = 60;
const playerSpeed = 5;

const enemies = [];
let amount = 1.00;
let level = 1;

let gameRunning = true; // Flag to control game state

function gameLoop() {
    if (!gameRunning) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawGameOverScreen();
        return;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);

    spawnEnemies();
    update();
    draw();

    requestAnimationFrame(gameLoop);
}

function spawnEnemies() {
    if (Math.random() < 0.02) {
        const newEnemy = {
            x: canvas.width,
            y: Math.random() * canvas.height,
            width: 40,
            height: 20,
            speed: 5 + level * 0.5,
        };
        enemies.push(newEnemy);
    }
}

function update() {
    playerY += Math.sin(Date.now() * 0.001) * 2;

    for (const enemy of enemies) {
        enemy.x -= enemy.speed;
    }

    enemies.forEach((enemy, index) => {
        if (enemy.x + enemy.width < 0) {
            enemies.splice(index, 1);
            amount += 0.1;

            
          // Increase score when an enemy passes without collision
        }
    });

    for (const enemy of enemies) {
        if (
            playerX < enemy.x + enemy.width &&
            playerX + playerWidth > enemy.x &&
            playerY < enemy.y + enemy.height &&
            playerY + playerHeight > enemy.y
        ) {
            gameRunning = false; // Stop the game
        }
    }

    if (amount >= level * 100) {
        level++;
    }
}

function draw() {
    context.drawImage(playerImage, playerX, playerY, playerWidth, playerHeight);

    for (const enemy of enemies) {
        context.drawImage(enemyImage, enemy.x, enemy.y, enemy.width, enemy.height);
    }

    context.fillStyle = 'white';
    context.font = '25px Arial';
    context.fillText(`Amount: x${amount} `, 10, 20);
}

function drawGameOverScreen() {

    context.fillStyle = 'white';
    context.font = '40px Arial';
    context.fillText(`Round: ${round}`, canvas.width / 2 - 80, canvas.height / 2 - 20);

    context.fillStyle = 'red';
    context.font = '25px Arial';
    context.fillText('Restarting', canvas.width / 2 - 80, canvas.height / 2 + 20);

    context.fillStyle = 'white';
    context.font = '30px Arial';
    context.fillText(`Final Amount: x${amount}`, canvas.width / 2 - 80, canvas.height / 2 + 80);

     // Update the history table
     const row = historyTable.insertRow(-1);  // Insert a row at the end of the table
     const cell1 = row.insertCell(0);
     const cell2 = row.insertCell(1);
     cell1.textContent = `Round ${round}`;
     cell2.textContent = amount > 0 ? `Amount: KES ${amount}` : 'Game Over';

     // Check if the round reaches 200 and restart it
     if (round >= 200) {
        round = 1;
    }
    setTimeout(() => {
        resetGame();
    }, 7000); // Restart the game after a delay
}

function resetGame() {
    playerY = canvas.height / 2;
    enemies.length = 0; // Clear the enemies array
    amount = 1.00;
    level = 1;
    round++;
    gameRunning = true; // Restart the game

    
    // Update the history table
    const row = historyTable.insertRow(-1);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    cell1.textContent = `Round ${round}`;
    cell2.textContent = 'Restarted';
  
    gameLoop(); // Start the game loop
   
}

function updateCashOutButton() {
    if (!gameRunning) {
        cashOutButton.disabled = true;
    } else {
        cashOutButton.disabled = false;
    }
}

playerImage.onload = () => {
    enemyImage.onload = () => {
        gameLoop();
    };
};




fullscreenButton.addEventListener('click', toggleFullscreen);

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        canvas.requestFullscreen().catch(err => {
            console.log('Error attempting to enable fullscreen:', err.message);
        });
    } else {
        document.exitFullscreen();
    }
}




let stake = 0;
const maxStake = 50; // Set the maximum stake amount here

addStakeButton.addEventListener('click', () => {
    if (gameRunning) {
        stake += 10; // Add a fixed stake amount
        updateStakeDisplay();
        
        
        if (stake >= maxStake) {
           cashOut();
        }
     
    }
});

function updateStakeDisplay() {
    stakeDisplay.textContent = `Stake: $${stake}`;
}



cashOutButton.addEventListener('click', cashOut);


function cashOut() {
    if (!gameRunning) {
        cashOutButton.disabled = true;
        return; // Don't allow cash out during game restart
    }


    // Create a payment intent on the server
    /*const response = await fetch('https://2943-102-217-157-221.ngrok-free.app/deposit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }), // Send the amount to the server
    });
    const data = await response.json();

    // Handle response or display success message
    if (response.ok) {
        alert('Deposit successful!');
    } else {
        alert('Deposit failed. Please try again.');
    }*/

   // alert(`Payment successful! You cashed out with an amount of *${amount}!`);
    //resetGame();
    
}
