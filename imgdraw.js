var nikkenum = {
    'Elysion': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    'Missilis': [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33],
    'Tetra': [34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
    'Pilgrim': [61, 62, 63, 64, 65, 66, 67, 68, 69],
    'Abnormal': [70, 71],
};

var MFR = ['Elysion', 'Missilis', 'Tetra', 'Pilgrim', 'Abnormal'];
var MFRLen = MFR.length;
var MFRImages = new Array(MFRLen);

classes = [1, 2, 3, 4, 5];
for (var i = 0; i < classes.length; i++) {
    MFRImages[i] = new Image();
    MFRImages[i].src = "images/others/MFR" + classes[i] + ".webp";
}
var units = [];
var nikke = [];

var imageUrls = [];
var totalImages = 10; // 假設總共有 10 張圖片，你可以更改這個數字

// 生成圖片的 URL 陣列
function generateImageUrls() {
  for (var i = 1; i <= totalImages; i++) {
    var imageUrl = "images/character/image" + i + ".webp";
    imageUrls.push(imageUrl);
  }
}

generateImageUrls();

var canvas = document.getElementById("Imgcanvas");
var ctx = canvas.getContext("2d");

// 載入圖片並繪製在 Canvas 上
function loadAndDrawImages() {
  for (var i = 0; i < imageUrls.length; i++) {
    var img = new Image();
    img.crossOrigin = "anonymous"; // 設定為匿名模式，處理跨域
    img.onload = function () {
      ctx.drawImage(this, this.width * i, 0, this.width, this.height);
    };
    img.src = imageUrls[i];
  }
}

loadAndDrawImages();

// 擷取 Canvas 上的內容並顯示在新的視窗中
function screenshot() {
  var screenshot = canvas.toDataURL();
  var win = window.open();
  win.document.write('<img src="' + screenshot + '"/>');
}

