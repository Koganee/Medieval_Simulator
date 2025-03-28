var knightCount = 20;
var knightTrustInKing = 30;

function knightBehaviourStandard() {
    const canvas = document.getElementById('playCanvas');
    const ctx = canvas.getContext('2d');
    const tileSize = 5;

    // Get canvas dimensions
    const rows = canvas.height / tileSize;
    const cols = canvas.width / tileSize;

    // Iterate through the canvas to find knight tiles (white tiles)
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const imageData = ctx.getImageData(col * tileSize, row * tileSize, 1, 1);
            const [r, g, b] = imageData.data; // Extract RGB values

            // Check if the tile is white (knight)
            if (r === 255 && g === 255 && b === 255) {
                // Clear the current knight tile
                ctx.fillStyle = "green";
                ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);

                // Move the knight 3 spaces in a random direction
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

                // Draw the knight at the new position
                ctx.fillStyle = "white";
                // Check if the new position is empty (green tile)
                const newTileData = ctx.getImageData(newCol * tileSize, newRow * tileSize, 1, 1);
                const [newR, newG, newB] = newTileData.data;

                if (newR === 0 && newG === 128 && newB === 0) { // Green tile
                    ctx.fillRect(newCol * tileSize, newRow * tileSize, tileSize, tileSize);
                } else {
                    // If the new position is not empty, revert to the previous position
                    ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
                }
            }
        }
    }


    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const imageData = ctx.getImageData(col * tileSize, row * tileSize, 1, 1);
            const [r, g, b] = imageData.data; // Extract RGB values

            // Check if the tile is white (knight)
            if (r === 255 && g === 255 && b === 255) {
                // Check if the tile beside the knight is dark purple
                const adjacentTileData = ctx.getImageData((col + 1) * tileSize, row * tileSize, 1, 1);
                const [adjR, adjG, adjB] = adjacentTileData.data;

                if (adjR === 0 && adjG === 0 && adjB === 0) {
                    console.log("The tile beside the knight is a monster.");
                    ctx.fillStyle = "red";
                    const randomNumber = Math.floor(Math.random() * 2) + 1;
                    console.log("Generated random number:", randomNumber);

                    if (randomNumber === 1) {
                        // Knight tile goes red
                        ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
                    } else {
                        // Monster tile goes red
                        ctx.fillRect((col + 1) * tileSize, row * tileSize, tileSize, tileSize);
                    }
                }
            }
        }
    }
}

function generateKnightBehaviour(totalInfluence, decisionNumber, attacked) {
    // Access and update global variables
    const knightTrust = GlobalState.knightTrustInKing;
    console.log(`Knight Trust in King: ${knightTrust}`);

    // Update the global killCount
    GlobalState.killCount = 0;

    var acceptCount = 0;
    var declineCount = 0;

    for (let i = 0; i < knightCount; i++) {
        let randomNumber = Math.floor(Math.random() * 100) + 1;

        // Factor in knightTrustInKing and totalInfluence
        const adjustedNumber = randomNumber + knightTrustInKing + totalInfluence;

        // Debugging log to verify calculations
        console.log(`Knight ${i + 1}: Random Number = ${randomNumber}, Trust = ${knightTrustInKing}, Influence = ${totalInfluence}, Adjusted = ${adjustedNumber}`);

        // Adjust threshold to make decisions more balanced
        if (adjustedNumber < 160) {
            declineCount++;
        } else {
            acceptCount++;
        }
    }

    console.log("Accept Count:", acceptCount);
    console.log("Decline Count:", declineCount);

    // Define the entities and their colors
    const entities = [
        { name: "King", color: "gold" },
        { name: "Knights", color: "white" },
        { name: "Peasants", color: "grey" },
        { name: "Merchants", color: "blue" },
        { name: "Bandits", color: "darkorange" },
        { name: "Artists", color: "purple" },
        { name: "Mercenaries", color: "darkgreen" },
        { name: "Monsters", color: "black" }
    ];

    if (decisionNumber == 6) { //Attack Decision
        var killCount = 0;
        showPopup(acceptCount + " Knights accepted the King's order to attack " + attacked + ".");

        // Behaviour Code------------------------------
        const canvas = document.getElementById('playCanvas');
        const ctx = canvas.getContext('2d');
        const tileSize = 5;

        // Get canvas dimensions
        const rows = canvas.height / tileSize;
        const cols = canvas.width / tileSize;

        let knightsProcessed = 0;

        // Find the target entity's RGB values
        const targetEntity = entities.find(entity => entity.name === attacked);
        const targetColor = targetEntity ? targetEntity.color : null;

        // Convert the target color to RGB
        const tempCanvas = document.createElement("canvas");
        const tempCtx = tempCanvas.getContext("2d");
        tempCtx.fillStyle = targetColor;
        tempCtx.fillRect(0, 0, 1, 1);
        const [attackedR, attackedG, attackedB] = tempCtx.getImageData(0, 0, 1, 1).data;

        for (let row = 0; row < rows && knightsProcessed < acceptCount; row++) {
            for (let col = 0; col < cols && knightsProcessed < acceptCount; col++) {
                const imageData = ctx.getImageData(col * tileSize, row * tileSize, 1, 1);
                const [r, g, b] = imageData.data; // Extract RGB values

                // Check if the tile is white (knight)
                if (r === 255 && g === 255 && b === 255) {
                    knightsProcessed++;

                    // Search for tiles matching the attacked class color
                    for (let dr = -10; dr <= 10; dr++) {
                        for (let dc = -10; dc <= 10; dc++) {
                            const newRow = row + dr;
                            const newCol = col + dc;

                            // Ensure the new position is within bounds
                            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                                const targetData = ctx.getImageData(newCol * tileSize, newRow * tileSize, 1, 1);
                                const [tr, tg, tb] = targetData.data;

                                // Check if the tile matches the attacked class color
                                if (tr === attackedR && tg === attackedG && tb === attackedB) {
                                    // Change the tile to red
                                    ctx.fillStyle = "red";
                                    ctx.fillRect(newCol * tileSize, newRow * tileSize, tileSize, tileSize);
                                    killCount++;
                                }
                            }
                        }
                    }
                }
            }
        }

        if(targetEntity === GlobalState.propagandaTarget)
        {
            knightTrustInKing = knightTrustInKing + 5; 
            GlobalState.trustInKing = GlobalState.trustInKing + 5;
            showPopup("The King has successfully spread propaganda against the " + attacked + "!");
        }
        // Behaviour Code------------------------------

        
        //News Bulletin Code------------------------------
        if(attacked == "Knights"){
            GlobalState.trustInKing = GlobalState.trustInKing - 5 - killCount;
            knightsAttackKnights = "Knights Attack Knights! Turmoil in the kingdom!";
            showPopupNews(knightsAttackKnights);
            knightTrustInKing = knightTrustInKing - declineCount;
        }
        else if(attacked == "Peasants")
        {
            knightTrustInKing = knightTrustInKing - declineCount;
            GlobalState.trustInKing = GlobalState.trustInKing - 5  - (killCount * 3);
            if(killCount > 0)
            {
                knightsAttackPeasants = "Knights Attack Peasants! King turns against his people! " + killCount + " Peasants killed!";
            }
            else
            {
                knightsAttackPeasants = "Knights Attack Peasants! King turns against his people!";
            }
            showPopupNews(knightsAttackPeasants);
        }
        else if(attacked == "Merchants")
        {
            knightsAttackMerchants = "Knights Attack Merchants! Trade routes in jeopardy!";
            showPopupNews(knightsAttackMerchants);
        }
        else if(attacked = "Mercenaries")
        {
            knightsAttackMercenaries = "Knights Attack Mercenaries! A potential ally slain?";
            showPopupNews(knightsAttackMercenaries);
        }
        else if(attacked == "Monsters")
        {
            knightTrustInKing = knightTrustInKing + 5;
            knightsAttackMonsters = "Knights Attack Monsters! Victory for the Kingdom!";
            if(killCount > 0)
            {
                knightsAttackMonsters = "Knights Attack Monsters! Victory for the Kingdom!" + killCount + " Monsters killed!";
            }
            showPopupNews(knightsAttackMonsters);
        }
        else if(attacked == "Bandits")
        {
            knightsAttackBandits = "Knights Attack Bandits! Crime rates plummet!";
            showPopupNews(knightsAttackBandits);
        }
        else if(attacked == "Artists")
        {
            GlobalState.trustInKing = GlobalState.trustInKing - 5;
            knightsAttackArtists = "Knights Attack Artists! Is art truly dead?";
            showPopupNews(knightsAttackArtists);
        }
        //News Bulletin Code------------------------------
    }
}
