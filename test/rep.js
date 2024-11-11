// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.square');
    const container = document.getElementById('container');

    // Initial positions: center the squares randomly around the center
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    squares.forEach((square, index) => {
        // Position squares in a grid or randomly
        const cols = Math.ceil(Math.sqrt(squares.length));
        const rows = Math.ceil(squares.length / cols);
        const gap = 100;
        const startX = (containerWidth - (cols * gap)) / 2;
        const startY = (containerHeight - (rows * gap)) / 2;

        const col = index % cols;
        const row = Math.floor(index / cols);

        square.style.left = `${startX + col * gap}px`;
        square.style.top = `${startY + row * gap}px`;
    });

    let draggedSquare = null;
    let offsetX = 0;
    let offsetY = 0;

    squares.forEach(square => {
        square.addEventListener('mousedown', (e) => {
            draggedSquare = square;
            offsetX = e.clientX - square.offsetLeft;
            offsetY = e.clientY - square.offsetTop;
            square.style.cursor = 'grabbing';
            square.style.zIndex = 1000; // Bring to front
        });
    });

    document.addEventListener('mousemove', (e) => {
        if (draggedSquare) {
            let x = e.clientX - offsetX;
            let y = e.clientY - offsetY;

            // Keep within container bounds
            x = Math.max(0, Math.min(container.clientWidth - draggedSquare.clientWidth, x));
            y = Math.max(0, Math.min(container.clientHeight - draggedSquare.clientHeight, y));

            draggedSquare.style.left = `${x}px`;
            draggedSquare.style.top = `${y}px`;

            applyRepulsion(draggedSquare);
        }
    });

    document.addEventListener('mouseup', () => {
        if (draggedSquare) {
            draggedSquare.style.cursor = 'grab';
            draggedSquare.style.zIndex = '';
            draggedSquare = null;
        }
    });

    function applyRepulsion(movingSquare) {
        const movingRect = movingSquare.getBoundingClientRect();

        squares.forEach(square => {
            if (square === movingSquare) return;

            const rect = square.getBoundingClientRect();

            // Calculate center positions
            const movingCenterX = movingRect.left + movingRect.width / 2;
            const movingCenterY = movingRect.top + movingRect.height / 2;
            const squareCenterX = rect.left + rect.width / 2;
            const squareCenterY = rect.top + rect.height / 2;

            // Calculate distance
            const dx = movingCenterX - squareCenterX;
            const dy = movingCenterY - squareCenterY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Define a threshold for repulsion
            const threshold = 100; // pixels

            if (distance < threshold && distance > 0) {
                // Calculate repulsion force
                const force = (threshold - distance) / threshold;

                // Normalize direction
                const ux = dx / distance;
                const uy = dy / distance;

                // Apply displacement (adjust the multiplier for effect strength)
                const displacement =   10 * force;

                // Update square position
                let newLeft = square.offsetLeft - ux * displacement;
                let newTop = square.offsetTop - uy * displacement;

                // Keep within container bounds
                newLeft = Math.max(0, Math.min(container.clientWidth - square.clientWidth, newLeft));
                newTop = Math.max(0, Math.min(container.clientHeight - square.clientHeight, newTop));

                square.style.left = `${newLeft}px`;
                square.style.top = `${newTop}px`;
            }
        });
    }
});
//verison 1.1