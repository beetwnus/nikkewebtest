function screenshot(){
    html2canvas(document.getElementById('nikke-images')).then(function(canvas) {
        var newTab = window.open();
        newTab.crossOrigin = "anonymous"; // 設定為匿名模式，處理跨域
        newTab.document.write('<img src="' + canvas.toDataURL("image/png") + '" alt="mynikke.png"/>');
    });
}

