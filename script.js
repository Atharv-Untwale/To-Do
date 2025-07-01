let ctr = 0;

function addTodo() {
    const inputEl = document.querySelector(".todo-input");
    const value = inputEl.value.trim();
    
    // Don't add empty todos
    if (value === "") {
        inputEl.focus();
        return;
    }

    // Hide empty state if it exists
    const emptyState = document.getElementById("empty-state");
    if (emptyState) {
        emptyState.style.display = "none";
    }

    const newDivEl = document.createElement("div");
    newDivEl.setAttribute("id", ctr);
    newDivEl.className = "todo-item";
    newDivEl.innerHTML = `
        <div class="todo-text">${value}</div> 
        <button class="delete-btn" onclick="deleteTodo(${ctr})">
            🗑️ Delete
        </button>
    `;

    document.getElementById("todos-container").appendChild(newDivEl);
    
    // Clear input and focus for next todo
    inputEl.value = "";
    inputEl.focus();
    
    ctr = ctr + 1;
}

function deleteTodo(index) {
    const element = document.getElementById(index);
    
    // Add fade out animation
    element.style.animation = "fadeOut 0.3s ease-out forwards";
    
    setTimeout(() => {
        element.parentNode.removeChild(element);
        
        // Show empty state if no todos left
        const remainingTodos = document.querySelectorAll(".todo-item");
        if (remainingTodos.length === 0) {
            document.getElementById("empty-state").style.display = "block";
        }
    }, 300);
}

// Add keydown event listener for Enter key
document.addEventListener("DOMContentLoaded", function() {
    const inputEl = document.querySelector(".todo-input");
    inputEl.addEventListener("keydown", function(e) {
        if (e.key === "Enter") {
            addTodo();
        }
    });
    
    // Focus input on page load
    inputEl.focus();
});

// CSS for fade out animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(-20px);
        }
    }
`;
document.head.appendChild(style);