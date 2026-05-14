// 鼓勵訊息資料庫
const messages = {
    happy: "太棒了！保持這份好心情，今天也會是充滿活力的一天！",
    neutral: "辛苦了，給自己一個深呼吸，你已經做得很好了！",
    sad: "沒關係的，給自己一點空間休息，雨後一定會有彩虹。"
};

// 音效生成器 (使用 Web Audio API)
function playClickSound() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(880, audioCtx.currentTime); // A5 note
    oscillator.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.1);
}

// 選擇 DOM 元素
const moodButtons = document.querySelectorAll('.mood-btn');
const checkinCard = document.getElementById('checkin-card');
const encouragementMsg = document.getElementById('encouragement-msg');
const closeBtn = document.getElementById('close-btn');

// 為按鈕添加事件監聽
moodButtons.forEach(button => {
    button.addEventListener('click', () => {
        const mood = button.getAttribute('data-mood');
        
        // 播放音效
        playClickSound();
        
        // 設定訊息
        encouragementMsg.textContent = messages[mood];
        
        // 顯示卡片
        checkinCard.classList.remove('hidden');
        setTimeout(() => {
            checkinCard.classList.add('show');
        }, 10);
    });
});

// 關閉按鈕事件
closeBtn.addEventListener('click', () => {
    checkinCard.classList.remove('show');
    setTimeout(() => {
        checkinCard.classList.add('hidden');
    }, 500);
});

// 點擊背景關閉
checkinCard.addEventListener('click', (e) => {
    if (e.target === checkinCard) {
        closeBtn.click();
    }
});
