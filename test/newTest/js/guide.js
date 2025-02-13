
$(document).ready(function () {
    // Bootstrap 5 会自动处理 navbar-toggler 的点击事件
    // $('.navbar-toggler').click(function () {
    //     $('.navbar-collapse').toggleClass('show'); // 不需要手动处理
    // });

    $(".burger").addClass("unToggled");
    $(".burger").click(function () {
        $(this).toggleClass("toggled");
        $(this).toggleClass("unToggled");
        // 这里可以添加打开菜单的逻辑
        // 例如：$('.navbar-collapse').toggleClass('show'); // 如果需要手动控制
    });
});

var legendButton = document.getElementById('legend');
var modalElement = document.getElementById('guide');

modalElement.addEventListener('show.bs.modal', function () {
    legendButton.classList.add('highlight'); // 打开模态框时添加红色边框
    // legendButton.offsetHeight; // 强制重绘
    // console.log(modalElement, legendButton);
});

modalElement.addEventListener('hide.bs.modal', function () {
    legendButton.classList.remove('highlight'); // 关闭模态框时移除红色边框
});

var rainfallButton = document.getElementById('rainfall');
var rainfallModal = document.getElementById('rainfall-modal');

rainfallModal.addEventListener('show.bs.modal', function () {
    rainfallButton.classList.add('highlight'); // 打开模态框时添加红色边框
});

rainfallModal.addEventListener('hide.bs.modal', function () {
    rainfallButton.classList.remove('highlight'); // 关闭模态框时移除红色边框
});

var insightButton = document.getElementById('insight');
var insightModal = document.getElementById('insight-modal');

insightModal.addEventListener('show.bs.modal', function () {
    insightButton.classList.add('highlight'); // 打开模态框时添加红色边框
});

insightModal.addEventListener('hide.bs.modal', function () {
    insightButton.classList.remove('highlight'); // 关闭模态框时移除红色边框
});


var TCListButton = document.getElementById('TC-list');
var TCListModal = document.getElementById('TC-List-modal');

TCListModal.addEventListener('show.bs.modal', function () {
    TCListButton.classList.add('highlight'); // 打开模态框时添加红色边框
});

TCListModal.addEventListener('hide.bs.modal', function () {
    TCListButton.classList.remove('highlight'); // 关闭模态框时移除红色边框
});

var seekButton = document.getElementById('seek');
var seekModal = document.getElementById('seek-modal');

seekModal.addEventListener('show.bs.modal', function () {
    seekButton.classList.add('highlight'); // 打开模态框时添加红色边框
});

seekModal.addEventListener('hide.bs.modal', function () {
    seekButton.classList.remove('highlight'); // 关闭模态框时移除红色边框
});