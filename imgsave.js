function screenshot() {
    // 隱藏按鈕
    var switchLabel = document.querySelector('.switch');
    var resetButton = document.getElementById('btn_reset');
    var saveButton = document.getElementById('btn_save');

    switchLabel.classList.add('hidden');
    resetButton.classList.add('hidden');
    saveButton.classList.add('hidden');

    html2canvas(document.getElementById('main')).then(function (canvas) {
        var newTab = window.open();
        newTab.crossOrigin = "anonymous"; // 設定為匿名模式，處理跨域
        newTab.document.write('<img src="' + canvas.toDataURL("image/png") + '" alt="mynikke.png"/>');
    });

    // 截圖完成後顯示按鈕
    switchLabel.classList.remove('hidden');
    resetButton.classList.remove('hidden');
    saveButton.classList.remove('hidden');
}


