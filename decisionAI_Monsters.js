function monsterBehaviourStandard() {
    const canvas = document.getElementById('playCanvas');
    const ctx = canvas.getContext('2d');
    const tileSize = 5;

    // Get canvas dimensions
    const rows = canvas.height / tileSize;
    const cols = canvas.width / tileSize;

    // Create a list to store monster positions
    const monsterPositions = [];

    // Iterate through the canvas to find monster tiles (black tiles)
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const imageData = ctx.getImageData(col * tileSize, row * tileSize, 1, 1);
            const [r, g, b] = imageData.data; // Extract RGB values

            // Check if the tile is black (monster)
            if (r === 0 && g === 0 && b === 0) {
                monsterPositions.push({ row, col }); // Store the monster's position
            }
        }
    }

    // Move each monster
    monsterPositions.forEach(({ row, col }) => {
        // Clear the current monster tile
        ctx.fillStyle = "green";
        ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);

        // Move the monster 3 spaces in a random direction
        let newRow = row;
        let newCol = col;
        const direction = Math.floor(Math.random() * 4); // 0 = up, 1 = right, 2 = down, 3 = left
        switch (direction) {
            case 0: // Move up
                newRow = Math.max(0, row - 3);
                break;
            case 1: // Move right
                newCol = Math.min(cols - 1, col + 3);
                break;
            case 2: // Move down
                newRow = Math.min(rows - 1, row + 3);
                break;
            case 3: // Move left
                newCol = Math.max(0, col - 3);
                break;
        }

        // Draw the monster at the new position
        ctx.fillStyle = "black";
        ctx.fillRect(newCol * tileSize, newRow * tileSize, tileSize, tileSize);
    });
}