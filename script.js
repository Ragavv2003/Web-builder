const sidebarItems = document.querySelectorAll('.draggable');
const canvas = document.getElementById('canvas');
const saveBtn = document.getElementById('save');
const clearBtn = document.getElementById('clear');

let draggedElement = null;

// Drag Start (PC)
sidebarItems.forEach(item => {
    item.addEventListener('dragstart', (event) => {
        draggedElement = event.target.cloneNode(true);
        event.dataTransfer.setData('text/plain', '');
    });

    // Touch Start (Mobile)
    item.addEventListener('touchstart', (event) => {
        draggedElement = event.target.cloneNode(true);
        draggedElement.style.position = 'absolute';
        draggedElement.style.zIndex = '1000';
        document.body.appendChild(draggedElement);
        moveElement(event.touches[0]);
    });
});

// Move Element on Touch
document.addEventListener('touchmove', (event) => {
    if (draggedElement) {
        moveElement(event.touches[0]);
    }
});

function moveElement(touch) {
    draggedElement.style.left = `${touch.pageX - 50}px`;
    draggedElement.style.top = `${touch.pageY - 50}px`;
}

// Drop on Canvas (Touch End)
document.addEventListener('touchend', (event) => {
    if (draggedElement) {
        if (event.target === canvas || canvas.contains(event.target)) {
            let newElement = draggedElement.cloneNode(true);
            newElement.classList.add('element');
            newElement.style.position = 'static';
            newElement.setAttribute('contenteditable', 'true');

            newElement.addEventListener('dblclick', () => newElement.remove());
            canvas.appendChild(newElement);
        }

        draggedElement.remove();
        draggedElement = null;
    }
});

// Drag Over (PC)
canvas.addEventListener('dragover', (event) => {
    event.preventDefault();
});

// Drop on Canvas (PC)
canvas.addEventListener('drop', (event) => {
    event.preventDefault();
    if (!draggedElement) return;

    let newElement = draggedElement.cloneNode(true);
    newElement.classList.add('element');
    newElement.style.position = 'static';
    newElement.setAttribute('contenteditable', 'true');

    newElement.addEventListener('dblclick', () => newElement.remove());
    canvas.appendChild(newElement);
});

// Save Layout
saveBtn.addEventListener('click', () => {
    localStorage.setItem('webLayout', canvas.innerHTML);
    alert('Layout saved!');
});

// Load Layout on Refresh
document.addEventListener('DOMContentLoaded', () => {
    const savedLayout = localStorage.getItem('webLayout');
    if (savedLayout) {
        canvas.innerHTML = savedLayout;
    }
});

// Clear Layout
clearBtn.addEventListener('click', () => {
    canvas.innerHTML = '<p>Drop elements here</p>';
    localStorage.removeItem('webLayout');
});
