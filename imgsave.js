function screenshot() {
    // 隱藏按鈕
    var resetButton = document.getElementById('btn_reset');
    var saveButton = document.getElementById('btn_save');
    var dataButton = document.getElementById('btn_data');
    resetButton.classList.add('hidden');
    saveButton.classList.add('hidden');
    dataButton.classList.add('hidden');

    html2canvas(document.getElementById('container')).then(function (canvas) {
        var newTab = window.open();
        newTab.crossOrigin = "anonymous"; // 設定為匿名模式，處理跨域
        newTab.document.write('<img src="' + canvas.toDataURL("image/png") + '" alt="mynikke.png"/>');

        // 截圖完成後顯示按鈕
        resetButton.classList.remove('hidden');
        saveButton.classList.remove('hidden');
        dataButton.classList.remove('hidden');
        
    });
}