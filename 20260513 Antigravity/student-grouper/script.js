document.getElementById('generate-btn').addEventListener('click', generateGroups);

function generateGroups() {
    const listText = document.getElementById('student-list').value.trim();
    const groupCount = parseInt(document.getElementById('group-count').value);
    const resultsGrid = document.getElementById('results-grid');

    if (!listText) {
        alert('請輸入學生名單！\nPlease enter the student list!');
        return;
    }

    if (isNaN(groupCount) || groupCount < 2) {
        alert('請輸入有效的組數（至少 2 組）！\nPlease enter a valid number of groups (at least 2)!');
        return;
    }

    // Parse and shuffle names
    let students = listText.split(/[\n\s,，]+/).filter(name => name.trim() !== "");
    
    if (students.length < groupCount) {
        alert('學生人數不足以分成這麼多組！\nNot enough students to divide into these many groups!');
        return;
    }

    students = shuffle(students);

    // Create groups
    const groups = Array.from({ length: groupCount }, () => []);
    students.forEach((student, index) => {
        groups[index % groupCount].push(student);
    });

    // Clear previous results
    resultsGrid.innerHTML = '';

    // Render cards with animation
    groups.forEach((members, index) => {
        const cardContainer = document.createElement('div');
        cardContainer.className = 'card-container';
        cardContainer.style.animationDelay = `${index * 0.1}s`;

        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-face card-front">
                <h3>第 ${index + 1} 組</h3>
                <small style="opacity: 0.7">點擊翻開 Reveal</small>
            </div>
            <div class="card-face card-back">
                <h4>組員名單 (${members.length})</h4>
                <ul class="member-list">
                    ${members.map((m, i) => `<li class="member-item" style="animation-delay: ${0.5 + i * 0.1}s">${m}</li>`).join('')}
                </ul>
            </div>
        `;

        card.onclick = () => card.classList.toggle('flipped');
        
        cardContainer.appendChild(card);
        resultsGrid.appendChild(cardContainer);
        
        // Trigger the entry animation
        setTimeout(() => cardContainer.classList.add('show'), 50);
    });
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}
