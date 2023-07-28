function screenshot() {
    // 隱藏按鈕
    var reverseCheckbox = document.getElementById('reverseCheckbox');
    var resetButton = document.getElementById('btn_reset');
    var saveButton = document.getElementById('btn_save');
    reverseCheckbox.classList.add('hidden');
    resetButton.classList.add('hidden');
    saveButton.classList.add('hidden');

    html2canvas(document.getElementById('main')).then(function (canvas) {
        var newTab = window.open();
        newTab.crossOrigin = "anonymous"; // 設定為匿名模式，處理跨域
        newTab.document.write('<img src="' + canvas.toDataURL("image/png") + '" alt="mynikke.png"/>');
    });

    // 截圖完成後顯示按鈕
    reverseCheckbox.classList.remove('hidden');
    resetButton.classList.remove('hidden');
    saveButton.classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', function () {
    var reverseCheckbox = document.getElementById('reverseCheckbox');

    // 添加复选框状态改变事件监听器
    reverseCheckbox.addEventListener('change', function () {
        // 根据复选框的选中状态切换左右键功能
        if (reverseCheckbox.checked) {
            document.addEventListener('mousedown', reverseMouseDown, false);
        } else {
            document.removeEventListener('mousedown', reverseMouseDown, false);
        }
    });

    // 定义一个函数，用于在左右键功能相反状态下执行的操作
    function reverseMouseDown(event) {
        // 取消默认右键菜单弹出
        event.preventDefault();

        // 判断是左键还是右键，并执行相应的操作
        if (event.button === 0) {
            // 左键操作（在这里执行右键操作的逻辑）
            console.log('右键功能');
        } else if (event.button === 2) {
            // 右键操作（在这里执行左键操作的逻辑）
            console.log('左键功能');
        }
    }
});
