document.addEventListener('DOMContentLoaded', () => {
    const dateDisplay = document.getElementById('date-display');
    
    // Update date
    const updateDate = () => {
        const now = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
        dateDisplay.textContent = now.toLocaleDateString('zh-TW', options);
    };

    updateDate();

    // Pause animation on hover
    const marquee = document.getElementById('marquee');
    marquee.addEventListener('mouseenter', () => {
        marquee.style.animationPlayState = 'paused';
    });
    
    marquee.addEventListener('mouseleave', () => {
        marquee.style.animationPlayState = 'running';
    });

    // Settings Panel Logic
    const settingsToggle = document.getElementById('settings-toggle');
    const settingsPanel = document.getElementById('settings-panel');
    const updateBtn = document.getElementById('update-btn');
    const resetBtn = document.getElementById('reset-btn');
    const announcementInput = document.getElementById('announcement-input');
    const marqueeTexts = document.querySelectorAll('.marquee-text');

    const DEFAULT_TEXT = '今日重點：AI 協作實務、Python 環境安裝、檔案自動化處理';

    // Load from localStorage
    const savedText = localStorage.getItem('announcement-text');
    if (savedText) {
        marqueeTexts.forEach(span => span.textContent = savedText);
        announcementInput.value = savedText;
    }

    settingsToggle.addEventListener('click', () => {
        settingsPanel.classList.toggle('active');
    });

    const updateMarquee = (text) => {
        marqueeTexts.forEach(span => {
            span.textContent = text;
        });
        localStorage.setItem('announcement-text', text);
    };

    updateBtn.addEventListener('click', () => {
        const newText = announcementInput.value.trim();
        if (newText) {
            updateMarquee(newText);
            settingsPanel.classList.remove('active');
            
            // Visual feedback
            updateBtn.textContent = '更新成功！';
            updateBtn.style.background = '#4CAF50';
            setTimeout(() => {
                updateBtn.textContent = '確認更新';
                updateBtn.style.background = 'var(--accent-orange)';
            }, 2000);
        }
    });

    resetBtn.addEventListener('click', () => {
        updateMarquee(DEFAULT_TEXT);
        announcementInput.value = DEFAULT_TEXT;
        settingsPanel.classList.remove('active');
    });

    // Close panel when clicking outside
    document.addEventListener('click', (e) => {
        if (!settingsPanel.contains(e.target) && e.target !== settingsToggle) {
            settingsPanel.classList.remove('active');
        }
    });
});
