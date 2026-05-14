const quotes = [
    "未來的你，一定會感謝現在努力的自己。",
    "成功不是終點，失敗也非末日，最重要的是持續前進的勇氣。",
    "學習的路雖然辛苦，但收穫的果實最為甜美。",
    "每一分努力，都是在為未來的夢想鋪路。",
    "不要因為走得太遠，而忘記當初為什麼出發。",
    "失敗只是暫時的繞道，不是死胡同。",
    "你的潛力，遠比你想像中更強大。",
    "每天進步一點點，就是成功的開始。",
    "夢想不會逃走，會逃走的只有自己。",
    "只要還有明天，今天就永遠是起跑點。",
    "所有的驚艷，都來自長久的努力與累積。",
    "不要害怕失敗，要害怕的是從未嘗試。",
    "即使路途遙遠，只要起步，終會到達。",
    "用汗水澆灌出的花朵，綻放得最為燦爛。",
    "每一次的低頭努力，都是為了以後能抬頭挺胸。",
    "若你能夢想，你就能實現。",
    "讓事情開始的方法是停止說話，動手去做。",
    "勝敗之間的區別，往往在於是否放棄。",
    "如果你有好奇心，你會找到很多有趣的事做。",
    "當挫折發生時，你可能不會意識到，但迎面的痛擊可能是世界上最棒的事。",
    "人一定要受過傷才會沉默專注，對成長都有益處。",
    "走得最慢的人，只要他不喪失目標，也比漫無目的地徘徊的人走得快。",
    "命運負責洗牌，但是玩牌的是我們自己！",
    "困難是一塊頑石，對於弱者它是絆腳石，對於強者它是墊腳石。",
    "沒有礁石，就沒有美麗的浪花；沒有挫折，就沒有壯麗的人生。",
    "行動是治癒恐懼的良藥，而猶豫、拖延將不斷滋養恐懼。",
    "沒有退路的時候，正是潛力發揮最大的時候。",
    "懶惰受到的懲罰不僅僅是自己的失敗，還有別人的成功。",
    "最困難的時候，也就是離成功不遠的時候。",
    "寶劍鋒從磨礪出，梅花香自苦寒來。",
    "遇順境，處之淡然，遇逆境，處之泰然。",
    "人不會苦一輩子，但總會苦一陣子；許多人為了逃避苦一陣子，卻苦了一輩子。",
    "一個人知道自己為什麼而活，就能忍受任何生活。"
];

const forestBackgrounds = [
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=2000",
    "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=2000",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=2000",
    "https://images.unsplash.com/photo-1501854140801-50d01674aa3e?auto=format&fit=crop&q=80&w=2000",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80&w=2000"
];

let currentQuoteIndex = 0;
let currentBgIndex = 0;
let transitionCount = 0;

function formatQuote(text) {
    // 每 10 個字插入一個換行符號
    const regex = /.{1,10}/g;
    const lines = text.match(regex);
    return lines.join('<br>');
}

function changeQuote() {
    const quoteBox = document.getElementById('quote-box');
    const quoteText = document.getElementById('quote-text');
    
    // 移除動畫類別以便重新觸發
    quoteBox.style.animation = 'none';
    quoteBox.offsetHeight; // 強制重繪
    quoteBox.style.animation = 'softEntrance 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards';

    // 更新文字
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    const rawQuote = quotes[currentQuoteIndex];
    quoteText.innerHTML = formatQuote(rawQuote);

    // 計數並檢查是否更換背景
    transitionCount++;
    if (transitionCount % 10 === 0) {
        changeBackground();
    }
}

function changeBackground() {
    currentBgIndex = (currentBgIndex + 1) % forestBackgrounds.length;
    document.body.style.backgroundImage = `url('${forestBackgrounds[currentBgIndex]}')`;
}

function init() {
    // 初始隨機金句與背景
    currentQuoteIndex = Math.floor(Math.random() * quotes.length);
    currentBgIndex = Math.floor(Math.random() * forestBackgrounds.length);
    
    const rawQuote = quotes[currentQuoteIndex];
    document.getElementById('quote-text').innerHTML = formatQuote(rawQuote);
    document.body.style.backgroundImage = `url('${forestBackgrounds[currentBgIndex]}')`;

    // 設定輪播：每 6 秒更換一次金句
    setInterval(changeQuote, 6000);
}

// 頁面載入完成後執行
document.addEventListener('DOMContentLoaded', init);
