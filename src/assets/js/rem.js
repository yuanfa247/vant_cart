// 简单适配方案
(function () {
    'use strict';
    // 阈值
    var max = 1024;
    var min = 320;

    setRemUnit();
    // 设置rem单位
    function setRemUnit() {
        var _html = document.documentElement;
        var _viewport = _html.getBoundingClientRect().width || window.innerWidth;
        var ratio = 18.75;

        // 判断视口宽度是否在阈值内
        if (_viewport > max) _viewport = max;
        else if (_viewport < min) _viewport = min;
        _html.style.fontSize = _viewport / ratio + 'px';
    }
    window.onresize = setRemUnit;
})();
