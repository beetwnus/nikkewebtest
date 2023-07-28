function saveUserState() {
    for (const num in nikke) {
        localStorage.setItem(`clickCount_${num}`, nikke[num].clickCount);

        // 儲存clknum、starnum與collectnum
        localStorage.setItem(`clknum_${num}`, clknum);
        localStorage.setItem(`starnum_${num}`, starnum);
        localStorage.setItem(`collectnum_${num}`, collectnum);

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

        // 載入clknum 
        const savedClknum = localStorage.getItem(`clknum_${num}`);
        if (savedClknum !== null) {
            clknum = parseInt(savedClknum);
        }

        // 載入starnum 
        const savedStarnum = localStorage.getItem(`starnum_${num}`);
        if (savedStarnum !== null) {
            starnum = parseInt(savedStarnum);
        }

        // 載入collectnum 
        const saveCollectnum = localStorage.getItem(`collectnum_${num}`);
        if (saveCollectnum !== null) {
            collectnum = parseInt(saveCollectnum);
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