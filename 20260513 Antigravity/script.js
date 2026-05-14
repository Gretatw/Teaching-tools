document.addEventListener('DOMContentLoaded', () => {
    // 設定日期
    const dateElement = document.getElementById('current-date');
    const updateDate = () => {
        const now = new Date();
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            weekday: 'long' 
        };
        dateElement.textContent = now.toLocaleDateString('zh-TW', options);
    };
    
    updateDate();

    // 設定姓名
    const userNameElement = document.getElementById('user-name');
    const savedName = localStorage.getItem('teacherName');
    
    if (savedName) {
        userNameElement.textContent = savedName;
    } else {
        userNameElement.textContent = "許淑茹 老師";
    }

    userNameElement.addEventListener('click', () => {
        const newName = prompt("請輸入您的姓名：", userNameElement.textContent);
        if (newName && newName.trim() !== "") {
            userNameElement.textContent = newName;
            localStorage.setItem('teacherName', newName);
        }
    });

    // 增加一點進場動畫
    const cards = document.querySelectorAll('.tool-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
    });
});
