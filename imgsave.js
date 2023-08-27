function screenshot1() {
    // 隱藏按鈕
    var removeButton = document.getElementById('btn_teamR');
    var addButton = document.getElementById('btn_teamA');
    var resetButton = document.getElementById('btn_reset');
    var saveButton = document.getElementById('btn_save');

    removeButton.classList.add('hidden');
    addButton.classList.add('hidden');
    resetButton.classList.add('hidden');
    saveButton.classList.add('hidden');

    html2canvas(document.getElementById('team-container')).then(function (canvas) {
        var newTab = window.open();
        newTab.crossOrigin = "anonymous"; // 設定為匿名模式，處理跨域
        newTab.document.write('<img src="' + canvas.toDataURL("image/png") + '" alt="mynikke.png"/>');

        // 截圖完成後顯示按鈕
        removeButton.classList.remove('hidden');
        addButton.classList.remove('hidden');
        resetButton.classList.remove('hidden');
        saveButton.classList.remove('hidden');

    });
}