function saveUserState() {
    for (const num in nikke) {
        localStorage.setItem(`clickCount_${num}`, nikke[num].clickCount);

        // 儲存下拉式選單資料
        const selectElements = nikke[num].image.parentElement.querySelectorAll('select');
        for (let i = 0; i < selectElements.length; i++) {
            localStorage.setItem(`selectOption_${num}_${i}`, selectElements[i].value);
        }
    }
}

function loadUserState() {
    for (const num in nikke) {
        const savedClickCount = localStorage.getItem(`clickCount_${num}`);
        if (savedClickCount !== null) {
            nikke[num].clickCount = parseInt(savedClickCount);
            const imagePath = nikke[num].clickCount === 0 ? `images/character/image${num}b.webp` : `images/character/image${num}.webp`;
            nikke[num].image.src = imagePath;

            // 更新星星圖片路徑
            const starImage = nikke[num].image.nextElementSibling;
            const starimagePath = `images/others/star${nikke[num].clickCount}.webp`;
            starImage.src = starimagePath;


            // 解鎖或鎖定相應的下拉式選單
            const imageStarContainer = nikke[num].image.parentElement;
            const selectElements = imageStarContainer.querySelectorAll('select');
            for (let i = 0; i < selectElements.length; i++) {
                selectElements[i].disabled = nikke[num].clickCount === 0;
            }
        }

        // 載入三個下拉式選單的選擇
        const selectElements = nikke[num].image.parentElement.querySelectorAll('select');
        for (let i = 0; i < selectElements.length; i++) {
            const savedSelectOption = localStorage.getItem(`selectOption_${num}_${i}`);
            if (savedSelectOption !== null) {
                selectElements[i].value = savedSelectOption;
            }
        }
    }
}

// 網頁加載完成後顯示妮姬圖像，並載入使用者的操作資料
window.onload = function () {
    displayNikkeImages();
    loadUserState();
};

// 網頁將要被卸載前保存使用者的操作資料
window.onbeforeunload = function () {
    saveUserState();
};

// 重設所有資料
function resetalldata() {
    for (const num in nikke) {
        nikke[num].clickCount = 0;
        const imagePath = `images/character/image${num}b.webp`;
        nikke[num].image.src = imagePath;

        const imageStarContainer = nikke[num].image.parentElement;
        const selectElements = imageStarContainer.querySelectorAll('select');
        for (let i = 0; i < selectElements.length; i++) {
            selectElements[i].value = "1";
            selectElements[i].disabled = false;
        }

        const starImage = nikke[num].image.nextElementSibling;
        starImage.src = "images/others/star0.webp";

        location.reload();
        if (history.scrollRestoration) {
            history.scrollRestoration = 'manual';
        }
    }

    // 清除所有儲存的資料
    localStorage.clear();
}



window.addEventListener('load', function () {
    // 獲取包含圖片的資料夾路徑
    var imageFolderPath = 'images/';

    // 發送HTTP請求獲取圖片檔案名稱列表
    var xhr = new XMLHttpRequest();
    xhr.open('GET', imageFolderPath, true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            // 解析返回的HTML內容
            var parser = new DOMParser();
            var htmlDoc = parser.parseFromString(xhr.responseText, 'text/html');

            // 獲取所有的連結元素（a標籤）
            var links = htmlDoc.getElementsByTagName('a');

            // 建立一個DocumentFragment，用於在記憶體中暫存圖片，減少頁面重繪
            var fragment = document.createDocumentFragment();

            // 遞迴遍歷連結元素，獲取所有圖片檔案名稱
            function traverseLinks(links) {
                for (var i = 0; i < links.length; i++) {
                    var link = links[i];
                    var fileName = link.getAttribute('href');

                    // 判斷檔案名稱是否為圖片檔案（根據需要可能需要更複雜的判斷邏輯）
                    if (/\.(jpe?g|png|gif|webp)$/i.test(fileName)) {
                        var img = new Image();
                        img.src = imageFolderPath + fileName;
                        fragment.appendChild(img);
                    }

                    // 判斷連結是否為子資料夾，是的話遞迴遍歷
                    if (link.hasAttribute('href') && link.getAttribute('href').endsWith('/')) {
                        var subFolderPath = imageFolderPath + link.getAttribute('href');
                        var subXhr = new XMLHttpRequest();
                        subXhr.open('GET', subFolderPath, false);
                        subXhr.send();

                        if (subXhr.status === 200) {
                            var subHtmlDoc = parser.parseFromString(subXhr.responseText, 'text/html');
                            var subLinks = subHtmlDoc.getElementsByTagName('a');
                            traverseLinks(subLinks);
                        }
                    }
                }
            }

            // 開始遞迴遍歷圖片檔案名稱
            traverseLinks(links);

            // 將DocumentFragment中的圖片一次性添加到頁面的imageContainer中
            var imageContainer = document.getElementById('imageContainer');
            imageContainer.appendChild(fragment);
        }
    };

    xhr.send();
});
