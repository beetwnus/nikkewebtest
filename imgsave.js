function screenshot(){
    html2canvas(document.getElementById('nikke-images')).then(function(canvas) {
        document.body.appendChild(canvas);
        var a = document.createElement('a');
        a.crossOrigin = "anonymous"; // 設定為匿名模式，處理跨域
        a.href = canvas.toDataURL("image/png").replace("image/octet-stream");
        a.download = 'mynikke.png';
        a.click();
    });
}
