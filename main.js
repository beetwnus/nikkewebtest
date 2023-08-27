// 禁止右鍵選單
document.addEventListener('contextmenu', (event) => {
  event.preventDefault();
});

const nikkenum = {
  'Burst 1': [1, 5, 20, 23, 29, 35, 36, 38, 40, 41, 43, 45, 49, 50, 51, 52, 55, 59, 57, 60, 62, 64],
  'Burst 2': [3, 4, 8, 12, 14, 73, 21, 25, 26, 27, 28, 31, 32, 37, 39, 42, 44, 47, 53, 54, 58, 24, 67, 69, 70],
  'Burst 3': [2, 6, 7, 9, 10, 11, 13, 16, 15, 17, 18, 19, 22, 30, 33, 34, 46, 48, 56, 72, 61, 63, 65, 66, 68, 71],
};

const Burst = ['Burst 1', 'Burst 2', 'Burst 3'];
const BurstLen = Burst.length;

const nikke = {};

class NikkeImage {
  constructor(imageUrl, width, height, nikkeNum) {
    this.imageUrl = imageUrl;
    this.image = new Image();
    this.image.src = this.imageUrl;
    this.image.width = width;
    this.image.height = height;


    this.image.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', this.imageUrl); // 设置拖动数据
      event.dataTransfer.effectAllowed = 'move'; // 设置拖动操作效果
    });
  }
}



function displayNikkeImages() {
  const nikkeContainer = document.getElementById('nikke-images');

  for (let i = 0; i < BurstLen; i++) {
    const BurstDiv = document.createElement('div');
    BurstDiv.classList.add('BurstDiv');

    // 創建 Burst 標題元素
    const BurstTitle = document.createElement('h2');
    const BurstImage = document.createElement('img');
    BurstImage.src = `images/others/Burst${i}.webp`;
    BurstImage.width = 70;
    BurstImage.height = 70;
    BurstImage.draggable = false;
    BurstImage.title = Burst[i];
    BurstTitle.appendChild(BurstImage);

    // 將 Burst 標題元素添加到 BurstDiv
    BurstDiv.appendChild(BurstTitle);

    for (const num of nikkenum[Burst[i]]) {
      const imageNIKKEContainer = document.createElement('div');
      imageNIKKEContainer.classList.add('imageNIKKEContainer');

      const nikkeImage = new NikkeImage(`images/character/image${num}.webp`, 70, 70);

      imageNIKKEContainer.appendChild(nikkeImage.image);

      BurstDiv.appendChild(imageNIKKEContainer);

      nikke[num] = nikkeImage;
    }

    nikkeContainer.appendChild(BurstDiv);
    // 創建分隔符號 <hr>，並將其添加到 BurstContainer 後面
    if (i < BurstLen - 1) {
      const separator = document.createElement('hr');
      separator.classList.add('separator'); // 新增CSS類名
      nikkeContainer.appendChild(separator);
    }
  }
}

function generateTable() {
  const teamImagesContainer = document.getElementById('team-images');

  const table = document.createElement('table');
  const tableId = 'team'; // 唯一的 ID
  table.id = tableId; // 設定表格的 ID
  table.style.borderCollapse = 'collapse'; // 合併邊框

  const cells = []; // 用來儲存每個格子的狀態，是否已有圖片存在

  for (let row = 0; row < 1; row++) { // 創建 1 行
    const tableRow = document.createElement('tr');

    for (let col = 0; col < 5; col++) { // 每行創建 5 列
      const tableCell = document.createElement('td');
      tableCell.style.border = '3px solid gray'; // 設定邊框粗細為 1 像素
      tableCell.style.width = '100px'; // 設定每個格子寬度
      tableCell.style.height = '100px'; // 設定每個格子高度
      table.style.margin = '0 auto';
      table.style.backgroundColor = 'lightgray'; // 设置背景色为浅灰色
      table.style.marginBottom = '5px';


      cells.push({ occupied: false, image: null, cell: tableCell }); // 添加 image 屬性

      // 將可拖曳的圖像放置在表格格子中
      tableCell.addEventListener('dragover', (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
      });

      tableCell.addEventListener('drop', (event) => {
        event.preventDefault();

        if (!cells[col].occupied) {
          const imageUrl = event.dataTransfer.getData('text/plain');
          const imageNum = getImageNumFromUrl(imageUrl);

          if (!isImageInTeam(imageNum)) {
            const nikkeImage = new NikkeImage(imageUrl, 70, 70);
            tableCell.appendChild(nikkeImage.image);
            cells[col].occupied = true;

            nikkeImage.image.addEventListener('dragstart', (event) => {
              event.preventDefault();
            });

            nikkeImage.image.addEventListener('click', () => {
              tableCell.removeChild(nikkeImage.image);
              cells[col].occupied = false;
            });
          }
        }
      });

      tableRow.appendChild(tableCell);
    }

    table.appendChild(tableRow);
  }

  teamImagesContainer.appendChild(table);
}

generateTable();

const teamImagesContainer = document.getElementById('team'); // 取得具有 id 'team' 的 HTML 容器

// 當圖像被拖曳到容器上方時觸發的事件處理器
teamImagesContainer.addEventListener('dragover', (event) => {
  event.preventDefault(); // 阻止瀏覽器的預設放置操作
  event.dataTransfer.dropEffect = 'move'; // 設定拖放效果為 'move'
});

// 當圖像被放置到容器內時觸發的事件處理器
tableCell.addEventListener('drop', (event) => {
  event.preventDefault();

  if (!cells[col].occupied) {
    const imageUrl = event.dataTransfer.getData('text/plain');
    const imageNum = getImageNumFromUrl(imageUrl);

    if (!isImageInTeam(imageNum)) {
      const nikkeImage = new NikkeImage(imageUrl, 70, 70);
      tableCell.appendChild(nikkeImage.image);
      cells[col].occupied = true;
      cells[col].image = nikkeImage.image;

      nikkeImage.image.addEventListener('dragstart', (event) => {
        event.preventDefault();
      });

      nikkeImage.image.addEventListener('click', () => {
        tableCell.removeChild(nikkeImage.image);
        cells[col].occupied = false;
        cells[col].image = null;
      });
    }
  }
});

// 檢查圖像是否已存在於團隊圖像中的函數
function isImageInTeam(imageNum) {
  const allCells = document.querySelectorAll('td'); // 取得所有表格格子
  for (const cell of allCells) {
    const image = cell.querySelector('img');
    if (image) {
      const imageUrl = image.src;
      const num = getImageNumFromUrl(imageUrl);
      if (num === imageNum) {
        return true; // 圖像已經存在於團隊圖像中
      }
    }
  }
  return false; // 圖像不存在於團隊圖像中
}


// 從圖像網址中解析出圖像編號的函數
function getImageNumFromUrl(imageUrl) {
  const match = imageUrl.match(/image(\d+)\.webp/); // 使用正則表達式從網址中提取編號
  if (match && match[1]) {
    return parseInt(match[1]); // 將編號轉換為整數並返回
  }
  return -1; // 如果沒有找到編號，返回 -1
}

// 增加表格的函數
function addTeam() {
  if (document.querySelectorAll('table').length < 5) {
    generateTable();
    adjustTeamImagesContainerHeight(1);
  }
}

function removeTeam() {
  const tables = document.querySelectorAll('table');
  if (tables.length > 1) {
    const lastTable = tables[tables.length - 1];
    lastTable.remove();
    adjustTeamImagesContainerHeight(-1);
  }
}

function adjustTeamImagesContainerHeight(change) {
  const teamImagesContainer = document.getElementById('team-images');
  const currentHeight = parseInt(getComputedStyle(teamImagesContainer).height);
  const newHeight = currentHeight + change * 100; 
  teamImagesContainer.style.height = newHeight + 'px' - 100 + 'px';
}

function generateInitialTables() {
  const teamImagesContainer = document.getElementById('team-images');
  const initialHeight = 5 * 100; 
  teamImagesContainer.style.height = initialHeight + 'px';

  for (let i = 0; i < 5; i++) {
    generateTable();
  }
}

function generateInitialTables() {
  for (let i = 0; i < 5; i++) {
    generateTable();
  }
}

generateInitialTables();