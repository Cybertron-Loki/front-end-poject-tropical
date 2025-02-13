
var arrLang = {
    "en": {
        "LEGEND": "legend",
        "RAINFALL": "rainfall",
        "INSIGHT": "insight",
        "TC LIST": "TC List",
        "SEEK": "seek",
        "PROCESS": "process",
        "EN": "en",
        "Rainfall Intensity": "Rainfall Intensity",
        "STI Insights": "STI Insights",
        "Instruction": "Instruction",
        "Scale Conversion": "Scale Conversion",
        "CMA wind intensity": "CMA wind intensity",
        "help":"help",
        "Archive":"Archive",
        "Close" :"Close",
        "next": "next",
        "previous": "previous",
        "suTY": "suTy",
        "STY": "STY",
        "TY": "TY",
        "STS": "STS",
        "TS": "TS",
        "TD": "TD",
    },
    "zh": {
        "LEGEND": "图例",
        "RAINFALL": "降水",
        "INSIGHT": "情报",
        "TC LIST": "事件列表",
        "SEEK": "搜城市/台风",
        "PROCESS": "台风进度",
        "EN": "cn",
        "Rainfall Intensity": "降水等级",
        "STI Insights": "台风所报告",
        "Instruction": "说明指导",
        "Scale Conversion": "风力等级转换表",
        "CMA wind intensity": "台风等级",
        "help": "帮助",
        "Archive": "存档",
        "Close": "关闭",
        "next": "下一步",
        "previous": "上一步",
        "suTY": "超强台风",
        "STY": "强台风",
        "TY": "台风",
        "STS": "强热带风暴",
        "TS": "热带风暴",
        "TD": "热带低压",
    }
};
// 初始化语言
let currentLanguage = 'en';

// 显示当前语言内容
function show() {
    // 检查 localStorage 支持
    if ('localStorage' in window) {
        const lang = localStorage.getItem('lang') || navigator.language.slice(0, 2);
        currentLanguage = arrLang[lang] ? lang : 'en';
    }

    // 更新按钮文本
    languageButton.textContent = currentLanguage === 'en' ? 'En' : '中';

    // 更新页面上的语言文本
    $(".lang").each(function () {
        const key = $(this).attr("key");
        $(this).text(arrLang[currentLanguage][key]);
    });
}

// 页面加载时显示语言
$(document).ready(function () {
    show();

    const languageButton = document.getElementById('languageButton');

    // 点击语言按钮切换显示
    languageButton.addEventListener('click', function () {
        currentLanguage = currentLanguage === 'en' ? 'zh' : 'en';

        // 更新按钮文本
        languageButton.textContent = currentLanguage === 'en' ? 'En' : '中';

        // 更新 localStorage
        if ('localStorage' in window) {
            localStorage.setItem('lang', currentLanguage);
        }

        // 更新页面上的语言文本
        $(".lang").each(function () {
            const key = $(this).attr("key");
            $(this).text(arrLang[currentLanguage][key]);
        });
    });
});



