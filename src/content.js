const toxicWords = ["herta", "badword2", "badword3"];

// Tracks the last toggle state to avoid redundant processing
let lastFilterState = true;

function blurToxicComments() {
    const toggle = document.getElementById("filter-toggle");
    const currentFilterState = toggle ? toggle.checked : false;

    // If the state has not changed, do nothing
    if (currentFilterState === lastFilterState) {
        return;
    }

    lastFilterState = currentFilterState;

    console.log("Applying filtering state:", currentFilterState);

    const comments = document.querySelectorAll("#content #content-text");

    if (!currentFilterState) {
        // Reset all comments to their original state when the filter is disabled
        comments.forEach((comment) => {
            comment.style.filter = "none";
            comment.style.pointerEvents = "auto";
            comment.style.cursor = "default";
            comment.removeAttribute("title");
        });
        return;
    }

    // Apply filtering logic when the filter is enabled
    comments.forEach((comment) => {
        if (toxicWords.some((word) => comment.textContent.toLowerCase().includes(word))) {
            comment.style.filter = "blur(5px)";
            comment.style.pointerEvents = "auto";
            comment.style.cursor = "pointer";
            comment.title = "This comment contains potentially toxic content. Hover or click to reveal.";

            // Ensure hover functionality is reapplied
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

    // Attach the toggle change listener
    document.getElementById("filter-toggle").addEventListener("change", () => {
        console.log("Toggle state changed.");
        blurToxicComments();
    });
}

createToggleUI();

// Initial execution of the function
blurToxicComments();

// Observe changes in the DOM to detect new comments
const commentsContainer = document.querySelector("#comments");
if (commentsContainer) {
    const observer = new MutationObserver(() => {
        console.log("DOM changed. Checking toggle state.");
        const toggle = document.getElementById("filter-toggle");
        if (toggle && toggle.checked) {
            blurToxicComments();
        }
    });
    observer.observe(commentsContainer, { childList: true, subtree: true });
}
