const toxicWords = ["herta", "badword2", "badword3"];

function blurToxicComments() {
    const comments = document.querySelectorAll("#content #content-text");
    comments.forEach((comment) => {
        if (toxicWords.some((word) => comment.textContent.toLowerCase().includes(word))) {
            // Apply the blur effect and add a tooltip for awareness
            comment.style.filter = "blur(5px)";
            comment.style.pointerEvents = "auto"; // Allow user interaction
            comment.style.cursor = "pointer";
            comment.title = "This comment contains potentially toxic content. Hover or click to reveal.";

            // Add an event listener to remove the blur on click or hover
            comment.addEventListener("mouseenter", () => {
                comment.style.filter = "none";
            });
            comment.addEventListener("mouseleave", () => {
                comment.style.filter = "blur(5px)";
            });
        } else {
            // Ensure non-toxic comments are visible
            comment.style.filter = "none";
            comment.style.pointerEvents = "auto";
            comment.style.cursor = "default";
            comment.removeAttribute("title");
        }
    });
}

// Initial execution of the function
blurToxicComments();

// Observe changes in the DOM to detect new comments
const observer = new MutationObserver(blurToxicComments);
observer.observe(document.body, { childList: true, subtree: true });