function giveGoldOutline() {
    var commissionCount = 1;

    // Iterate through canvas to find random artist
    // Find the target entity's RGB values
    const targetEntity = entities.find(entity => entity.name === "Artists");
    const targetColor = targetEntity ? targetEntity.color : null;

    // Convert the target color to RGB
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");
    tempCtx.fillStyle = targetColor;
    tempCtx.fillRect(0, 0, 1, 1);
    const [artistR, artistG, artistB] = tempCtx.getImageData(0, 0, 1, 1).data;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const imageData = ctx.getImageData(col * tileSize, row * tileSize, 1, 1);
            const [r, g, b] = imageData.data; // Extract RGB values

            // Check if the tile is purple
            if (r === 128 && g === 0 && b === 128) {
                // Change the tile to have a gold outline
                ctx.strokeStyle = "gold";
                ctx.lineWidth = 2;
                ctx.strokeRect(col * tileSize, row * tileSize, tileSize, tileSize);

                return; // Exit the function early
            }
        }
    }

    return false; // Return false if no purple tile was found
}