// 禁止右鍵選單
document.addEventListener('contextmenu', (event) => {
  event.preventDefault();
});

const nikkenum = {
  'Elysion': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 15, 73],
  'Missilis': [17, 18, 19, 20, 21, 22, 23, 25, 26, 27, 29, 30, 31, 32, 33, 28],
  'Tetra': [34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 58, 24, 59, 57, 60, 72],
  'Pilgrim': [61, 62, 63, 64, 65, 66, 67, 68, 69],
  'Abnormal': [70, 71],
};

// 使用解構賦值將容器長度儲存到相對應的變數中
const { Elysion, Missilis, Tetra, Pilgrim, Abnormal } = nikkenum;
const ElysionLen = Elysion.length;
const MissilisLen = Missilis.length;
const TetraLen = Tetra.length;
const PilgrimLen = Pilgrim.length;
const AbnormalLen = Abnormal.length;
const allnikkeLen = ElysionLen + MissilisLen + TetraLen + PilgrimLen + AbnormalLen;

const MFR = ['Elysion', 'Missilis', 'Tetra', 'Pilgrim', 'Abnormal'];
const MFRLen = MFR.length;

const nikke = {};

let clknum = 0;
let starnum = 0;
let collectnum = 0;
/*let Elysionnum = 0;
let Missilisnum = 0;
let Tetranum = 0;
let Pilgrimnum = 0;
let Abnormalnum = 0;*/

class NikkeImage {
  constructor(imageUrl, width, height) {
    this.imageUrl = imageUrl;
    this.image = new Image();
    this.image.src = this.imageUrl;
    this.image.width = width; // 設定圖像寬度
    this.image.height = height; // 設定圖像高度
    this.clickCount = 0;
    this.image.draggable = false;
  }

  toggleStarImage(starImage) {
    if (this.clickCount === 11) {
      clknum = clknum - 11;
    }
    else {
      clknum++;
    }

    if (this.clickCount === 3) {
      starnum = starnum + 1;
    }
    else if (this.clickCount === 11) {
      starnum = starnum - 1;
    }

    if (this.clickCount === 0) {
      collectnum = collectnum + 1;
    }
    else if (this.clickCount === 11) {
      collectnum = collectnum - 1;
    }

    this.clickCount = (this.clickCount + 1) % 12;
    const imagePath = `images/others/star${this.clickCount}.webp`;
    starImage.src = imagePath;

    // 解鎖或鎖定相應的下拉式選單
    const imageStarContainer = starImage.parentElement;
    const selectElements = imageStarContainer.querySelectorAll('select');
    for (const selectElement of selectElements) {
      selectElement.disabled = this.clickCount === 0;
      if (this.clickCount === 0) {
        selectElement.value = '1'; // 將下拉式選單的值設為預設值(1)
      }
    }
  }
  toggleStarImageM(starImage) {
    if (this.clickCount === 0) {
      clknum = clknum + 11;
    }
    else {
      clknum--;
    }

    this.clickCount = (this.clickCount - 1 + 12) % 12;
    const imagePath = `images/others/star${this.clickCount}.webp`;
    starImage.src = imagePath;

    if (this.clickCount === 3) {
      starnum = starnum - 1;
    }
    else if (this.clickCount === 11) {
      starnum = starnum + 1;
    }

    if (this.clickCount === 0) {
      collectnum = collectnum - 1;
    }
    else if (this.clickCount === 11) {
      collectnum = collectnum + 1;
    }

    // 解鎖或鎖定相應的下拉式選單
    const imageStarContainer = starImage.parentElement;
    const selectElements = imageStarContainer.querySelectorAll('select');
    for (const selectElement of selectElements) {
      selectElement.disabled = this.clickCount === 0;
      if (this.clickCount === 0) {
        selectElement.value = '1'; // 將下拉式選單的值設為預設值(1)
      }
    }
  }

  updateImageURL(num) {
    if (this.clickCount === 0) {
      this.imageUrl = `images/character/image${num}b.webp`;
    } else {
      this.imageUrl = `images/character/image${num}.webp`;
    }
    this.image.src = this.imageUrl;
  }
}

function displayNikkeImages() {
  const nikkeContainer = document.getElementById('nikke-images');

  for (let i = 0; i < MFRLen; i++) {
    const MFRDiv = document.createElement('div');
    MFRDiv.classList.add('MFRDiv');

    // 創建 MFR 標題元素
    const MFRTitle = document.createElement('h2');
    const MFRImage = document.createElement('img');
    MFRImage.src = `images/others/MFR${i}.webp`;
    MFRImage.width = 70;
    MFRImage.height = 70;
    MFRImage.title = MFR[i];
    MFRImage.draggable = false;
    MFRTitle.appendChild(MFRImage);

    // 將 MFR 標題元素添加到 MFRDiv
    MFRDiv.appendChild(MFRTitle);

    for (const num of nikkenum[MFR[i]]) {
      const imageStarContainer = document.createElement('div');
      imageStarContainer.classList.add('imageStarContainer');

      const nikkeImage = new NikkeImage(`images/character/image${num}b.webp`, 70, 70);
      const starImage = new Image();
      starImage.classList.add('starImage');
      starImage.src = "images/others/star0.webp";
      starImage.alt = "star";
      starImage.draggable = false;

      imageStarContainer.appendChild(nikkeImage.image);
      imageStarContainer.appendChild(starImage);

      // 建立下拉式選單
      const selectElement = document.createElement('select');
      for (let optionValue = 1; optionValue <= 10; optionValue++) {
        const option = document.createElement('option');
        option.value = optionValue;
        option.textContent = optionValue;
        selectElement.appendChild(option);
      }

      // 設定下拉式選單的鎖定狀態
      selectElement.disabled = nikkeImage.clickCount === 0;

      // 將三個下拉式選單添加到 imageStarContainer
      for (let j = 0; j < 3; j++) {
        imageStarContainer.appendChild(selectElement.cloneNode(true));
      }

      MFRDiv.appendChild(imageStarContainer);

      nikkeImage.image.addEventListener('click', (event) => {
        if (reverseCheckbox.checked) {
          nikkeImage.toggleStarImageM(starImage);
        } else {
          nikkeImage.toggleStarImage(starImage);
        }
        //nikkeImage.toggleStarImage(starImage);
        nikkeImage.updateImageURL(num);
      });

      nikkeImage.image.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        if (reverseCheckbox.checked) {
          nikkeImage.toggleStarImage(starImage);
        } else {
          nikkeImage.toggleStarImageM(starImage);
        }
        //nikkeImage.toggleStarImageM(starImage);
        nikkeImage.updateImageURL(num);
      });

      nikke[num] = nikkeImage;
    }

    nikkeContainer.appendChild(MFRDiv);
    // 創建分隔符號 <hr>，並將其添加到 MFRContainer 後面
    if (i < MFRLen - 1) {
      const separator = document.createElement('hr');
      separator.classList.add('separator'); // 新增CSS類名
      nikkeContainer.appendChild(separator);
    }
  }
}

// 反轉功能提示視窗
const Toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 3000,
  onOpen: toast => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

var reverseCheckbox = document.getElementById('reverseCheckbox');
reverseCheckbox.addEventListener('change', function () {
  if (reverseCheckbox.checked) {
    // 被勾選時顯示警告視窗
    Toast.fire({
      icon: 'warning',
      title: '已反轉左右鍵'
    });
  } else {
    // 未勾選時顯示普通視窗
    Toast.fire({
      icon: 'warning',
      title: '已取消反轉左右鍵'
    });
  }
});

//顯示統計資料
function showdata() {
  Swal.fire({
    icon: 'info',
    title: '收藏進度',
    html: 'SSR數量：' + clknum + '<br><br>突破三以上：' + starnum + '<br><br>已擁有比例：' + collectnum + '／' + allnikkeLen + '<br><br>',
    buttonsStyling: false, // 關閉按鈕自訂樣式開關
    customClass: {
      closeButton: 'swal2-close', // 設定關閉按鈕的樣式為自訂樣式
    }
  });
}

/*function showdata() {
  Swal.fire({
    icon: 'info',
    title: '收藏進度',
    html: 'SSR數量：' + clknum + '<br><br>突破三以上：' + starnum + '<br><br>已擁有比例：' + collectnum + '／' + allnikkeLen +
      '<br><br>極樂淨土：' + Elysionnum + '／' + ElysionLen + '<br><br>米西利斯：' + Missilisnum + '／' + MissilisLen + '<br><br>泰特拉：' + Tetranum + '／' + TetraLen +
      '<br><br>朝聖者：' + Pilgrimnum + '／' + PilgrimLen + '<br><br>反常：' + Abnormalnum + '／' + AbnormalLen,
    buttonsStyling: false, // 關閉按鈕自訂樣式開關
    customClass: {
      closeButton: 'swal2-close', // 設定關閉按鈕的樣式為自訂樣式
    }
  });
}*/

var menuTimeout;

function showMenu() {
  clearTimeout(menuTimeout);
  var menu = document.getElementById("menu");
  menu.style.display = "block";
}

function hideMenu() {
  menuTimeout = setTimeout(function () {
    var menu = document.getElementById("menu");
    menu.style.display = "none";
  });
}

function clearMenuTimeout() {
  clearTimeout(menuTimeout);
}

function enlargeHeader() {
  var header = document.querySelector(".fixed-header");
  header.style.transform = "scale(1.1)";
}

function resetHeader() {
  var header = document.querySelector(".fixed-header");
  header.style.transform = "scale(1)";
}
