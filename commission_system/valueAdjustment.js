function valueAdjustment(wealth)
{
    var commissionCost = 50;
    var deliveryCost = 20;

    wealth = wealth - (commissionCost + deliveryCost);

    return wealth;
}

function stockValue()
{
    for(let i = 0; i < window.arrayArt.length; i++)
    {
        if(window.arrayArt[i] != null)
        {
            if(window.arrayArtValue[i] < 60)
            {
                window.arrayArtValue[i] = window.arrayArtValue[i] + 10;
            }
        }
        console.log("Art value at index", i, ":", window.arrayArtValue[i]); // Log the art value for debugging
    }
}
