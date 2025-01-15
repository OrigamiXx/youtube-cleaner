const toxicWords = ["herta", "badword2", "badword3"];

function blurToxicComments() {
    const toggle = document.getElementById("filter-toggle");
    if (!toggle || !toggle.checked) {
        // If toggle is disabled, ensure comments are unmodified
        const comments = document.querySelectorAll("#content #content-text");
        comments.forEach((comment) => {
            comment.style.filter = "none";
            comment.style.pointerEvents = "auto";
            comment.style.cursor = "default";
            comment.removeAttribute("title");
        });
        return;
    }

    const comments = document.querySelectorAll("#content #content-text");
    comments.forEach((comment) => {
        if (toxicWords.some((word) => comment.textContent.toLowerCase().includes(word))) {
            comment.style.filter = "blur(5px)";
            comment.style.pointerEvents = "auto";
            comment.style.cursor = "pointer";
            comment.title = "This comment contains potentially toxic content. Hover or click to reveal.";

            comment.addEventListener("mouseenter", () => {
                comment.style.filter = "none";
            });
            comment.addEventListener("mouseleave", () => {
                comment.style.filter = "blur(5px)";
            });
        } else {
            comment.style.filter = "none";
            comment.style.pointerEvents = "auto";
            comment.style.cursor = "default";
            comment.removeAttribute("title");
        }
    });
}

function createToggleUI() {
    const toggleContainer = document.createElement("div");
    toggleContainer.id = "filter-toggle-container";
    toggleContainer.style.position = "fixed";
    toggleContainer.style.top = "10px";
    toggleContainer.style.right = "10px";
    toggleContainer.style.backgroundColor = "white";
    toggleContainer.style.border = "1px solid #ccc";
    toggleContainer.style.borderRadius = "5px";
    toggleContainer.style.padding = "10px";
    toggleContainer.style.zIndex = "9999";
    toggleContainer.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
    
    const label = document.createElement("label");
    label.innerHTML = `
        <input type="checkbox" id="filter-toggle" checked />
        Enable Filtering
    `;
    label.style.cursor = "pointer";
    label.style.fontSize = "14px";

    toggleContainer.appendChild(label);
    document.body.appendChild(toggleContainer);
}

createToggleUI();

// Initial execution of the function
blurToxicComments();

// Observe changes in the DOM to detect new comments
const observer = new MutationObserver(() => {
    const toggle = document.getElementById("filter-toggle");
    console.log("Toggle element:", toggle);
    console.log("Toggle checked state:", toggle ? toggle.checked : "undefined");
    if (toggle && toggle.checked) {
        blurToxicComments();
    }
});
observer.observe(document.body, { childList: true, subtree: true });