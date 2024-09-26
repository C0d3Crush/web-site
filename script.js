// Function to open windows (My Computer, Recycle Bin, Images Folder, DVD Screensaver, Notes)
function openWindow(id) {
    document.getElementById(id).style.display = 'block';
    
    // Load specific content when opening windows
    if (id === 'images-folder') {
        loadImages();
    } 
    if (id === 'dvd-screensaver') {
        startDvdScreensaver();
    } 
    if (id === 'text-file-window') {
        loadTextFile();
    }
    if (id === 'snake') {
        startSnakeGame();
    }
}

// Function to close windows
function closeWindow(id) {
    document.getElementById(id).style.display = 'none';
}

// Function to load the notes.txt file content into the Notes window
function loadTextFile() {
    fetch('notes.txt')
        .then(response => response.text())  
        .then(data => {
            // Split the text into lines and insert breaks
            const lines = data.split('\n').map(line => line.trim()).filter(line => line !== '');
            const formattedText = lines.join('<br>'); // Join lines with <br> tags
            document.getElementById('text-file-content').innerHTML = formattedText; // Use innerHTML for line breaks
        })
        .catch(error => {
            console.error('Error loading text file:', error);
            document.getElementById('text-file-content').textContent = 'Error loading notes.';
        });
}



// Make windows draggable
dragElement(document.getElementById("my-computer"));
dragElement(document.getElementById("projects"));
dragElement(document.getElementById("recycle-bin"));
dragElement(document.getElementById("images-folder"));
dragElement(document.getElementById("dvd-screensaver"));
dragElement(document.getElementById("full-size-image"));

function dragElement(elmnt) {
    let startX = 0, startY = 0, initialX = 0, initialY = 0;
    const header = elmnt.querySelector(".window-header");

    if (header) {
        header.onmousedown = dragMouseDown;
    } else {
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        startX = e.clientX;
        startY = e.clientY;
        const computedStyle = window.getComputedStyle(elmnt);
        initialX = parseInt(computedStyle.left, 10) || 0;
        initialY = parseInt(computedStyle.top, 10) || 0;
        document.onmouseup = stopDrag;
        document.onmousemove = drag;
    }

    function drag(e) {
        e = e || window.event;
        e.preventDefault();
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        elmnt.style.left = (initialX + deltaX) + "px";
        elmnt.style.top = (initialY + deltaY) + "px";
    }

    function stopDrag() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// Toggle Start Menu
function toggleStartMenu() {
    const startMenu = document.getElementById("start-menu");
    startMenu.style.display = startMenu.style.display === 'block' ? 'none' : 'block';
}

// Load Images in the Images Folder
function loadImages() {
    const imagesContent = document.getElementById("images-content");
    imagesContent.innerHTML = ''; // Clear previous images

    // Add your image paths here
    const images = [
        'images/photo1.jpg',
        'images/photo2.jpg',
        'images/photo3.jpg',
        'images/photo4.jpg',
        'images/photo5.jpg',
        'images/photo6.jpg',
        'images/photo7.jpg',
        'images/photo8.jpg',
        'images/photo9.jpg',
        'images/photo10.jpg',
        'images/photo11.jpg',
        'images/photo12.jpg',
        'images/photo13.jpg',
        'images/photo14.jpg',
        'images/photo15.jpg',
        'images/photo16.jpg'
    ];

    images.forEach(image => {
        const img = document.createElement("img");
        img.src = image;
        img.className = "thumbnail";
        img.onclick = function() {
            openFullSizeImage(image);
        };
        imagesContent.appendChild(img);
    });
}

// Open Full Size Image
function openFullSizeImage(imageSrc) {
    const fullSizeImageWindow = document.getElementById('full-size-image');
    const fullSizeImageElement = document.getElementById('full-size-image-element');
    fullSizeImageElement.src = imageSrc;
    fullSizeImageWindow.style.display = 'block';
}

// Shut Down Function
function shutdown() {
    alert("Shutting down...");
}
// Start DVD Screensaver
function startDvdScreensaver() {
    const dvdLogo = document.getElementById("dvd-logo");
    const container = document.getElementById("dvd-container");
    
    // Initial position
    let posX = 0;
    let posY = 0;
    let dx = 2; // Change in x
    let dy = 2; // Change in y
    const logoWidth = 100; // Assuming the logo is 100px wide
    const logoHeight = 50; // Assuming the logo is 50px tall

    function animate() {
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;

        // Check for collisions with the container boundaries
        if (posX + dx > containerWidth - logoWidth || posX + dx < 0) {
            dx = -dx; // Reverse direction on x-axis
        }
        if (posY + dy > containerHeight - logoHeight || posY + dy < 0) {
            dy = -dy; // Reverse direction on y-axis
        }

        // Update position
        posX += dx;
        posY += dy;

        // Move the DVD logo
        dvdLogo.style.left = posX + 'px';
        dvdLogo.style.top = posY + 'px';

        requestAnimationFrame(animate);
    }
    
    animate();
}

// Start Snake Game
function startSnakeGame() {
    const canvas = document.getElementById("snake-canvas");
    const ctx = canvas.getContext("2d");

    const box = 20; // Size of the snake and food
    let snake = [{ x: 9 * box, y: 9 * box }]; // Initial snake position
    let food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 15) * box };
    let d; // Direction

    // Control the snake with arrow keys
    document.addEventListener("keydown", direction);

    function direction(event) {
        if (event.keyCode == 37 && d != "RIGHT") {
            d = "LEFT";
        } else if (event.keyCode == 38 && d != "DOWN") {
            d = "UP";
        } else if (event.keyCode == 39 && d != "LEFT") {
            d = "RIGHT";
        } else if (event.keyCode == 40 && d != "UP") {
            d = "DOWN";
        }
    }

    function draw() {
        // Draw background
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw snake
        for (let i = 0; i < snake.length; i++) {
            ctx.fillStyle = (i === 0) ? "lime" : "white"; // Head of the snake
            ctx.fillRect(snake[i].x, snake[i].y, box, box);
        }

        // Draw food
        ctx.fillStyle = "red";
        ctx.fillRect(food.x, food.y, box, box);

        // Old snake position
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        // Move the snake
        if (d == "LEFT") snakeX -= box;
        if (d == "UP") snakeY -= box;
        if (d == "RIGHT") snakeX += box;
        if (d == "DOWN") snakeY += box;

        // If the snake eats the food
        if (snakeX == food.x && snakeY == food.y) {
            food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 15) * box };
        } else {
            // Remove the tail
            snake.pop();
        }

        // Add new head
        const newHead = { x: snakeX, y: snakeY };

        // Game over conditions
        if (snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height || collision(newHead, snake)) {
            clearInterval(game); // Stop the game
            alert("Game Over!"); // Alert game over
        }

        snake.unshift(newHead); // Add new head to the snake
    }

    // Collision detection
    function collision(head, array) {
        for (let i = 0; i < array.length; i++) {
            if (head.x === array[i].x && head.y === array[i].y) {
                return true;
            }
        }
        return false;
    }

    const game = setInterval(draw, 100); // Call the draw function every 100ms
}
