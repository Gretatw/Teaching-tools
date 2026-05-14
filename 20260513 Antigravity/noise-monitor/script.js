const statusLight = document.getElementById('status-light');
const statusText = document.getElementById('status-text');

/**
 * Updates the state of the noise monitor light.
 * @param {string} state - The target state ('green', 'yellow', 'red').
 */
function updateState(state) {
    // Reset all state classes
    statusLight.classList.remove('state-green', 'state-yellow', 'state-red');
    
    // Apply new state and text with a slight animation trigger
    statusText.style.transform = 'scale(0.8)';
    statusText.style.opacity = '0';
    
    setTimeout(() => {
        switch (state) {
            case 'green':
                statusLight.classList.add('state-green');
                statusText.textContent = '請保持討論';
                break;
            case 'yellow':
                statusLight.classList.add('state-yellow');
                statusText.textContent = '注意音量';
                break;
            case 'red':
                statusLight.classList.add('state-red');
                statusText.textContent = '請安靜';
                break;
        }
        
        statusText.style.transform = 'scale(1)';
        statusText.style.opacity = '1';
    }, 200);
}

// Initial state animation
window.onload = () => {
    statusLight.style.opacity = '0';
    statusLight.style.transform = 'scale(0.5)';
    
    setTimeout(() => {
        statusLight.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
        statusLight.style.opacity = '1';
        statusLight.style.transform = 'scale(1)';
    }, 100);
};
