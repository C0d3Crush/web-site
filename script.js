// Function to open windows (My Computer, Recycle Bin, Images Folder)
function openWindow(id) {
    document.getElementById(id).style.display = 'block';
    if (id === 'images-folder') {
        loadImages();
    }
}

// Function to close windows
function closeWindow(id) {
    document.getElementById(id).style.display = 'none';
}

// Make windows draggable
dragElement(document.getElementById("my-computer"));
dragElement(document.getElementById("recycle-bin"));
dragElement(document.getElementById("images-folder"));

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
        'images/photo3.jpg'
    ];

    images.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        imagesContent.appendChild(img);
    });
}

// Shutdown Functionality
function shutdown() {
    const shutdownMessage = document.createElement("div");
    shutdownMessage.innerText = "Shutting down...";
    shutdownMessage.style.position = "fixed";
    shutdownMessage.style.top = "50%";
    shutdownMessage.style.left = "50%";
    shutdownMessage.style.transform = "translate(-50%, -50%)";
    shutdownMessage.style.fontSize = "24px";
    shutdownMessage.style.color = "white";
    shutdownMessage.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    shutdownMessage.style.padding = "20px";
    shutdownMessage.style.borderRadius = "10px";
    document.body.appendChild(shutdownMessage);

    // Animate (fade out)
    setTimeout(() => {
        shutdownMessage.style.opacity = "0";
        shutdownMessage.style.transition = "opacity 2s";
    }, 100);

    // Close the website after the animation
    setTimeout(() => {
        window.close(); // This will only work if the page was opened by a script
        // For testing purposes, you can redirect to a different URL
        // window.location.href = 'about:blank'; // Uncomment for testing
    }, 3000); // Wait for the animation to complete
}
