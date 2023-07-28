function screenshot(){
    html2canvas(document.getElementById('nikke-images')).then(function(canvas) {
        document.body.appendChild(canvas);
        var a = document.createElement('a');
        a.href = canvas.toDataURL("image/png").replace("image/octet-stream");
        a.download = 'mynikke.png';
        a.click();
    });
}
