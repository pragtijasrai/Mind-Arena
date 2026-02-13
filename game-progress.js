// Game Progress Tracking System
// Add this script to each level

const GameProgress = {
    calculateStars: (moves, time, level) => {
        // Star thresholds per level (moves, time)
        const thresholds = {
            1: { perfect: [4, 10], good: [6, 20] },
            2: { perfect: [6, 15], good: [9, 25] },
            3: { perfect: [8, 20], good: [12, 30] },
            4: { perfect: [10, 25], good: [15, 35] },
            5: { perfect: [12, 30], good: [18, 45] },
            6: { perfect: [12, 35], good: [18, 50] },
            7: { perfect: [16, 40], good: [24, 60] },
            8: { perfect: [20, 50], good: [30, 75] },
            9: { perfect: [24, 60], good: [36, 90] },
            10: { perfect: [24, 70], good: [36, 100] }
        };
        
        const threshold = thresholds[level] || thresholds[1];
        if (moves <= threshold.perfect[0] && time <= threshold.perfect[1]) return 3;
        if (moves <= threshold.good[0] && time <= threshold.good[1]) return 2;
        return 1;
    },
    
    saveLevelProgress: (level, stars, moves, time) => {
        const progress = JSON.parse(localStorage.getItem('gameProgress') || '{}');
        if (!progress[level] || progress[level].stars < stars) {
            progress[level] = { stars, moves, time, completed: true };
        }
        if (!progress[level + 1] && level < 10) {
            progress[level + 1] = { unlocked: true };
        }
        localStorage.setItem('gameProgress', JSON.stringify(progress));
    },
    
    displayStars: (stars, container) => {
        const starsContainer = document.createElement('div');
        starsContainer.style.cssText = 'font-size: 40px; margin: 15px 0;';
        for (let i = 0; i < 3; i++) {
            const star = document.createElement('span');
            star.textContent = i < stars ? '⭐' : '☆';
            star.style.cssText = 'margin: 0 5px; display: inline-block; animation: starPop 0.5s ease-out;';
            star.style.animationDelay = `${i * 0.2}s`;
            starsContainer.appendChild(star);
        }
        container.appendChild(starsContainer);
    }
};
