const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const notes = []; // Array to hold the notes
const numNotes = 10; // Number of notes
const radius = 20; // Radius of each note
const bigCircleRadius = 150; // Radius of the big hollow circle
const speed = 2; // Speed of movement
const startOffset = 40; // Starting position offset (~1cm in pixels)
const endOffset = 150; // Ending position offset (~3.75cm in pixels)

// Paths corresponding to positions 1 through 8
const paths = [
    (0 + Math.PI / 8),                 // Position 1: 22.5 degrees
    (Math.PI / 4 + Math.PI / 8),        // Position 2: 67.5 degrees
    (Math.PI / 2 + Math.PI / 8),        // Position 3: 112.5 degrees
    ((3 * Math.PI) / 4 + Math.PI / 8),  // Position 4: 157.5 degrees
    (Math.PI + Math.PI / 8),            // Position 5: 202.5 degrees
    ((5 * Math.PI) / 4 + Math.PI / 8),  // Position 6: 247.5 degrees
    ((3 * Math.PI) / 2 + Math.PI / 8),  // Position 7: 292.5 degrees
    ((7 * Math.PI) / 4 + Math.PI / 8)   // Position 8: 337.5 degrees
];

// Sample notes data
const noteData = [
    { type: "hit", position: 1, delay: 0 },
    { type: "hit", position: 2, delay: 100 },
    { type: "hit", position: 3, delay: 200 },
    { type: "hit", position: 4, delay: 300 },
    { type: "hit", position: 5, delay: 400 },
    { type: "hit", position: 6, delay: 500 },
    { type: "hit", position: 7, delay: 600 },
    { type: "hit", position: 8, delay: 700 }
];

function createNotes() {
    notes.length = 0; // Clear existing notes

    // Create notes based on noteData with delays
    noteData.forEach(note => {
        setTimeout(() => {
            const angle = paths[note.position - 1]; // Get the angle based on the position

            const startX = canvas.width / 2 + startOffset * Math.cos(angle);
            const startY = canvas.height / 2 + startOffset * Math.sin(angle);

            notes.push({
                type: note.type,
                x: startX,
                y: startY,
                color: `hsl(${Math.random() * 360}, 100%, 50%)`, // Random color
                angle: angle,
                distanceTravelled: startOffset, // Track how far the note has traveled
                holdDuration: note.holdDuration || 0, // Duration to hold
                isHolding: note.type === "hold", // Whether the note is currently in hold state
                holdEndTime: note.holdDuration ? Date.now() + note.holdDuration : null // End time for holding
            });
        }, note.delay); // Delay for each note
    });
}

function drawBigCircle() {
    // Draw a big hollow circle at the end of the paths
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, bigCircleRadius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)'; // Set stroke color
    ctx.lineWidth = 5; // Set stroke width
    ctx.stroke();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    drawBigCircle(); // Draw the big hollow circle

    // Draw each note
    for (let i = notes.length - 1; i >= 0; i--) {
        const note = notes[i];

        // Check if the note should move or stay
        if (note.distanceTravelled < endOffset) {
            // Move the note towards the end of the path
            note.x += speed * Math.cos(note.angle);
            note.y += speed * Math.sin(note.angle);
            note.distanceTravelled += speed; // Track how far the note has traveled

            // Draw the note
            ctx.beginPath();
            ctx.arc(note.x, note.y, radius, 0, Math.PI * 2);
            ctx.fillStyle = note.color; // Use the note's color
            ctx.fill();
            ctx.closePath();

            // Draw extended hold line if it’s a hold note
            if (note.isHolding) {
                ctx.beginPath();
                ctx.moveTo(canvas.width / 2 + startOffset * Math.cos(note.angle),
                           canvas.height / 2 + startOffset * Math.sin(note.angle));
                ctx.lineTo(note.x, note.y); // Line from start to current position
                ctx.strokeStyle = note.color; // Use the note's color
                ctx.lineWidth = 5; // Set line width
                ctx.stroke();
                ctx.closePath();
            }
        } else if (note.isHolding && Date.now() < note.holdEndTime) {
            // Draw the hold note at the end position while hold duration is active
            const endX = canvas.width / 2 + endOffset * Math.cos(note.angle);
            const endY = canvas.height / 2 + endOffset * Math.sin(note.angle);

            ctx.beginPath();
            ctx.arc(endX, endY, radius, 0, Math.PI * 2);
            ctx.fillStyle = note.color; // Use the note's color
            ctx.fill();
            ctx.closePath();

            // Keep the line drawn until the hold duration is over
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2 + startOffset * Math.cos(note.angle),
                       canvas.height / 2 + startOffset * Math.sin(note.angle));
            ctx.lineTo(endX, endY); // Line from start to end position
            ctx.strokeStyle = note.color; // Use the note's color
            ctx.lineWidth = 5; // Set line width
            ctx.stroke();
            ctx.closePath();
        } else {
            // Regular notes disappear after reaching the end or hold notes after hold duration
            notes.splice(i, 1);
        }
    }

    // If all notes are gone, reset the animation after a 1 second delay
    if (notes.length === 0) {
        setTimeout(() => {
            createNotes(); // Create new notes
        }, 1000); // Delay of 1 second
    }

    requestAnimationFrame(draw); // Call draw again for the next frame
}

// Start the animation
createNotes(); // Initialize the notes
draw();
