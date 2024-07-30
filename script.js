document.addEventListener('DOMContentLoaded', () => {
    const runningMan = document.getElementById('runningMan');
    const infinite = document.querySelector('.infinite');
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('closeModal');
    let x = 0;
    let y = 0;

    const toughWords = ["Funding", "Compete", "Market Fit", "Customer Base", "Business Plan", "Tech Issues", "Work-Life Balance"]; // Tough words

    // Function to create and place hurdles randomly in a zigzag pattern
    function createHurdles(numHurdles, maxWidth) {
        const hurdlePositions = []; // To track the positions of the hurdles

        for (let i = 1; i <= numHurdles; i++) {
            const hurdle = document.createElement('div');
            hurdle.className = 'hurdle';
            hurdle.textContent = toughWords[Math.floor(Math.random() * toughWords.length)]; // Random tough word
            
            // Calculate a random position for the hurdle
            let position;
            do {
                position = Math.floor(Math.random() * (maxWidth - 100)); // Ensure enough space for the goal
            } while (hurdlePositions.some(pos => Math.abs(pos - position) < 80)); // Avoid overlap

            hurdlePositions.push(position); // Store the position
            hurdle.style.left = `${position}px`;
            hurdle.style.bottom = `${30 + (i % 2 === 0 ? 20 : -20)}px`;
            infinite.appendChild(hurdle);
        }
    }

    // Create goal
    function createGoal(maxWidth) {
        const goal = document.createElement('div');
        goal.className = 'goal';
        goal.textContent = 'GOAL'; // Text for the goal
        goal.style.left = `${maxWidth - 100}px`; // Position it near the end of the road
        goal.style.bottom = '30px'; // Same as the running man
        infinite.appendChild(goal);
    }

    // Generate hurdles and goal
    createHurdles(5, infinite.clientWidth);
    createGoal(infinite.clientWidth);

    const hurdles = document.querySelectorAll('.hurdle');
    const goal = document.querySelector('.goal');

    function checkCollision() {
        const manRect = runningMan.getBoundingClientRect();
        for (const hurdle of hurdles) {
            const hurdleRect = hurdle.getBoundingClientRect();
            if (
                manRect.left < hurdleRect.left + hurdleRect.width &&
                manRect.left + manRect.width > hurdleRect.left &&
                manRect.top < hurdleRect.top + hurdleRect.height &&
                manRect.height + manRect.top > hurdleRect.top
            ) {
                // Collision detected
                x = 0;
                y = 0;
                runningMan.style.transform = `translate(${x}px, ${y}px)`;
                return;
            }
        }
        // Check if reached goal
        const goalRect = goal.getBoundingClientRect();
        if (
            manRect.left < goalRect.left + goalRect.width &&
            manRect.left + manRect.width > goalRect.left &&
            manRect.top < goalRect.top + goalRect.height &&
            manRect.height + manRect.top > goalRect.top
        ) {
            // Reached goal
            modal.style.display = 'flex';
        }
    }

    document.addEventListener('keydown', (event) => {
        const step = 10;
        switch (event.key) {
            case 'ArrowUp':
                y -= step;
                break;
            case 'ArrowDown':
                y += step;
                break;
            case 'ArrowLeft':
                x -= step;
                break;
            case 'ArrowRight':
                x += step;
                break;
        }
        runningMan.style.transform = `translate(${x}px, ${y}px)`;
        checkCollision();
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        x = 0;
        y = 0;
        runningMan.style.transform = `translate(${x}px, ${y}px)`;
    });
});
