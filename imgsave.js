function screenshot1() {
    // 隱藏按鈕
    var removeButton = document.getElementById('btn_teamR');
    var addButton = document.getElementById('btn_teamA');
    var resetButton1 = document.getElementById('btn_reset1');
    var saveButton1 = document.getElementById('btn_save1');

    removeButton.classList.add('hidden');
    addButton.classList.add('hidden');
    resetButton1.classList.add('hidden');
    saveButton1.classList.add('hidden');

    html2canvas(document.getElementById('team-container')).then(function (canvas) {
        var newTab = window.open();
        newTab.crossOrigin = "anonymous"; // 設定為匿名模式，處理跨域
        newTab.document.write('<img src="' + canvas.toDataURL("image/png") + '" alt="mynikke.png"/>');

        // 截圖完成後顯示按鈕
        removeButton.classList.remove('hidden');
        addButton.classList.remove('hidden');
        resetButton1.classList.remove('hidden');
        saveButton1.classList.remove('hidden');

    });
}