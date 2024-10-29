const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');
    const nombre_cercle = document.getElementById('circle-number');
    const nom_fruit = document.getElementById('fruit-name');

    // dimensions du canvas
    const rows = 10;
    const cols = 10;
    const cellWidth = 50;
    const cellHeight = 50;

    let number = 0; 
    const circles = []; 

    // List of 99 random fruits from chatgpt
    // const fruits = [
    //     'Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape', 'Honeydew', 'Indian Fig', 'Jackfruit',
    //     'Kiwi', 'Lemon', 'Mango', 'Nectarine', 'Orange', 'Papaya', 'Quince', 'Raspberry', 'Strawberry', 'Tangerine',
    //     'Ugli Fruit', 'Vanilla', 'Watermelon', 'Xigua', 'Yellow Passion Fruit', 'Zucchini', 'Apricot', 'Blackberry', 
    //     'Cantaloupe', 'Dragon Fruit', 'Eggplant', 'Feijoa', 'Guava', 'Huckleberry', 'Ilama', 'Jujube', 'Kumquat',
    //     'Lychee', 'Mulberry', 'Nashi Pear', 'Olive', 'Pineapple', 'Quandong', 'Rambutan', 'Salak', 'Tamarind',
    //     'Uva Ursi', 'Voavanga', 'Wax Jambu', 'Ximenia', 'Yam', 'Ziziphus', 'Acai', 'Boysenberry', 'Cloudberry', 
    //     'Damson', 'Elderflower', 'Finger Lime', 'Gooseberry', 'Hawthorn', 'Ice Cream Bean', 'Jabuticaba', 'Kiwano',
    //     'Loganberry', 'Miracle Fruit', 'Nance', 'Orangequat', 'Pawpaw', 'Quararibea', 'Rangpur', 'Soursop', 'Tangelo',
    //     'Uva', 'Velvet Apple', 'Wolfberry', 'Xylocarp', 'Yangmei', 'Zabergau', 'Atemoya', 'Bilberry', 'Cranberry',
    //     'Durian', 'Emu Apple', 'Fairchild Tangerine', 'Grumichama', 'Hackberry', 'Icaco', 'Jostaberry', 'Kei Apple',
    //     'Loquat', 'Mammee Apple', 'Noni', 'Osage Orange', 'Pomegranate', 'Queen Anne Cherry', 'Redcurrant', 'Surinam Cherry'
    // ];

    // fontion pour dessiner le tableau
       function drawTable() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); //clear canvas pour eviter qu'on dessine au dessus

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const x = col * cellWidth;
                const y = row * cellHeight;

                
                ctx.strokeRect(x, y, cellWidth, cellHeight);
            }
        }

        // dessiner les cercles
        circles.forEach(circle => {
            ctx.beginPath();
            ctx.arc(circle.centerX, circle.centerY, circle.radius, 0, Math.PI * 2);
            ctx.stroke();

            // Number of the circles
            ctx.font = "16px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(circle.number, circle.centerX, circle.centerY);
        });
    }

    // Function to check if the user clicked inside a circle
    function isInsideCircle(x, y, circle) {
        const dx = x - circle.centerX;
        const dy = y - circle.centerY;
        return (dx * dx + dy * dy) <= (circle.radius * circle.radius);
    }

    // mousedown event on the canvas
    canvas.addEventListener('mousedown', function(e) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Check if the mousedown was inside any circle
        for (let i = 0; i < circles.length; i++) {
            const circle = circles[i];
            if (isInsideCircle(mouseX, mouseY, circle)) {
                draggingCircle = circle; 
                offsetX = mouseX - circle.centerX;
                offsetY = mouseY - circle.centerY;
                break;
            }
        }
    });

    // mousemove event to drag the circle
    canvas.addEventListener('mousemove', function(e) {
        if (draggingCircle) {
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            
            draggingCircle.centerX = mouseX - offsetX;
            draggingCircle.centerY = mouseY - offsetY;

            drawTable();
        }
    });

    // mouseup event to stop dragging 
    canvas.addEventListener('mouseup', function(e) {
        if (draggingCircle) {
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            }

            draggingCircle = null; // Stop dragging
            drawTable(); // Redraw the table and circles
        });

    //__________________ popup "ne fonctionne pas pour le moment!!!"_________________________
    function showPopup(circleNumber, fruit) {
        circleNumberElement.textContent = `Circle #${circleNumber}`;
        fruitNameElement.textContent = `Fruit: ${fruit}`;

        popup.style.display = 'block';
        overlay.style.display = 'block'; 
    }

    // Close the popup 
    overlay.addEventListener('click', function() {
        popup.style.display = 'none';
        overlay.style.display = 'none';
    });

    // Initialize the circles with their positions
    function initializeCircles() {
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const x = col * cellWidth + cellWidth / 2;
                const y = row * cellHeight + cellHeight / 2;
                circles.push({ centerX: x, centerY: y, radius: 15, number });
                number++;
            }
        }

        drawTable(); 
    }

    initializeCircles();

   
 