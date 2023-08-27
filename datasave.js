// 網頁加載完成後顯示妮姬圖像，並載入使用者的操作資料
window.onload = function () {
    displayNikkeImages1();
};

// 重設所有資料
function resetalldata1() {

    location.reload();
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    }

    // 清除所有儲存的資料
    localStorage.clear();
}