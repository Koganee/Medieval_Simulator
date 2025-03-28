document.addEventListener("DOMContentLoaded", () => {
    showPopupNews("Hello World! This is a test message.");
});

function showPopupNews(message) {
    const popup = document.createElement("div");
    popup.textContent = message;
    popup.style.position = "fixed";
    popup.style.bottom = "10px";
    popup.style.left = "10px";
    popup.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    popup.style.color = "white";
    popup.style.padding = "10px";
    popup.style.borderRadius = "5px";
    popup.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.3)";
    popup.style.zIndex = "1000";
    document.body.appendChild(popup);

    setTimeout(() => {
        popup.remove();
    }, 10000); // Remove popup after 3 seconds
}