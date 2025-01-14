const toxicWords = ["badword1", "badword2", "badword3"];

function hideToxicComments() {
    const comments = document.querySelectorAll("#content #content-text");
    comments.forEach((comment) => {
        if (toxicWords.some((word) => comment.textContent.toLowerCase().includes(word))) {
            comment.style.display = "none";
        }
    });
}

hideToxicComments();

const observer = new MutationObserver(hideToxicComments);
observer.observe(document.body, { childList: true, subtree: true });
