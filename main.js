const nikkenum = {
  'Elysion': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16],
  'Missilis': [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29, 30, 31, 32, 33],
  'Tetra': [34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 58, 59],
  'Pilgrim': [61, 62, 63, 64, 65, 66, 67, 68, 69],
  'Abnormal': [70, 71],
  'Limited': [15, 28, 57, 60],
};

const MFR = ['Elysion', 'Missilis', 'Tetra', 'Pilgrim', 'Abnormal', 'Limited'];
const MFRLen = MFR.length;
const nikke = {};

class NikkeImage {
  constructor(imageUrl, width, height) {
    this.imageUrl = imageUrl;
    this.image = new Image();
    this.image.src = this.imageUrl;
    this.image.width = width; // 設定圖像寬度
    this.image.height = height; // 設定圖像高度
    this.clickCount = 0;
  }

  toggleStarImage(starImage) {
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
    this.clickCount = (this.clickCount - 1 + 12) % 12;
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
        nikkeImage.toggleStarImage(starImage);
        nikkeImage.updateImageURL(num);
      });

      nikkeImage.image.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        nikkeImage.toggleStarImageM(starImage);
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

// 禁止右鍵選單
document.addEventListener('contextmenu', (event) => {
  event.preventDefault();
});
