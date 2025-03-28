function processRandomNumber(decisionMade, decisionWeight) {
    console.log("Received random number:", decisionMade);
    console.log("Received decision weight:", decisionWeight);

    const totalInfluence = decisionWeightCalculation(decisionWeight);
    console.log("Total Influence:", totalInfluence);

    // Decision map for cleaner logic
    const decisionMap = {
        1: () => "Hire",
        2: () => "Commission",
        3: () => handlePropaganda(),
        4: () => handleKidnap(),
        5: () => "Starve Peasants",
        6: () => handleAttack(totalInfluence, 6)
    };

    const decisionText = decisionMap[decisionMade]
        ? decisionMap[decisionMade]()
        : "Unknown Decision";

    console.log("Decision:", decisionText);

    // Show popup with decision details
    showPopup(`Decision: ${decisionText}<br>Total Influence: ${totalInfluence}`);

    function decisionWeightCalculation(decisionWeight) {
        const baseInfluence = 50;
        return baseInfluence + decisionWeight;
    }

    function generateClass() {
        const classes = ["Knights", "Peasants", "Merchants", "Bandits", "Artists", "Mercenaries", "Monsters"];
        return classes[Math.floor(Math.random() * classes.length)];
    }

    function handlePropaganda() {
        GlobalState.propagandaTarget = generateClass();
        return `Propaganda! The King spreads propaganda against the ${GlobalState.propagandaTarget}`;
    }

    function handleKidnap() {
        const kidnapper = generateClass();
        const kidnapped = generateClass();
        return `Kidnap! The King orders ${kidnapper} to kidnap ${kidnapped}`;
    }

    function handleAttack(totalInfluence, decisionNumber) {
        const attacker = generateClass();
        const attacked = generateClass();

        if (attacker === "Knights") {
            generateKnightBehaviour(totalInfluence, decisionNumber, attacked);
        }

        return `Attack! The King orders ${attacker} to attack ${attacked}`;
    }
}
