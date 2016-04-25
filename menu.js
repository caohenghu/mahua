;(function() {
    var foods = [
        {price: 12, name: '番茄鸡蛋汤'},
        {price: 18, name: '酸辣土豆丝'},
        {price: 20, name: '家常豆腐/麻婆豆腐'},
        {price: 22, name: '西红柿炒鸡蛋'},
        {price: 22, name: '芥兰/生菜/西兰花'},
        {price: 22, name: '地三鲜/红烧茄子/肉沫烧茄子'},
        {price: 22, name: '干煸豆角'},
        {price: 22, name: '疙瘩汤'},
        {price: 25, name: '馕炒莲花白'},
        {price: 28, name: '地皮菜炒鸡蛋'},
        {price: 28, name: '干锅土豆片/干锅有机菜花/铁板粉丝包菜'},
        {price: 28, name: '宫爆鸡丁/辣子鸡丁'},
        {price: 28, name: '风干肉焖土豆条'},
        {price: 38, name: '鱼香肉丝'},
        {price: 48, name: '大蒜烧肚条/红烧肚块'},
        {price: 48, name: '水煮牛肉/土豆烧牛肉/卷子小牛肉'},
        {price: 58, name: '清炖萝卜羔羊肉'},
        {price: 68, name: '酸菜鱼'}
    ];
    var MIN_PRICE = getMinPrice(); // 单价最便宜的菜
    var MAX_PRICE = 40; // 允许点的价格高的菜的阀值，比如40以上就算价格高的菜了
    var UNIT_PRICE = 25; // 人均价格
    var RICE_PRICE = 2; // 米饭价格
    var SELECT_PRICE = 0; // 已点菜的价格

    function getMenu(peopleNum, riceNum, expectPrice) {
        var totalPrice = peopleNum * UNIT_PRICE; // 允许点菜的总价格
        var selectPrice = riceNum * RICE_PRICE + parseFloat(expectPrice); // 已点菜的价格
        var whileCount = 0;
        var maxWhileCount = 1000;
        var maxPriceCount = 0; // 价格高的菜的最大数量
        var menu = []; // 已选择的菜
        var copyFoods = foods.slice();

        while (true) {
            // 如果剩余的钱连最便宜的菜都点不了，则停止
            if (totalPrice - selectPrice < MIN_PRICE) {
                break;
            }

            // 如果循环超过限制的最大数量，则停止
            if (whileCount++ > maxWhileCount) {
                break;
            }

            var len = copyFoods.length;
            var random = getRandom(1, len) - 1;
            var food = copyFoods[random];

            // 计算一道菜单价超过40元的不能超过2盘，这里的数据只是打个比方
            if (maxPriceCount >= Math.ceil(peopleNum / 3)) {
                continue;
            }

            // 计算点菜的总价格
            if (food.price < totalPrice - selectPrice) {
                menu.push(food);
                copyFoods.splice(random, 1);
                selectPrice += food.price;

                if(food > MAX_PRICE) {
                    maxPriceCount++;
                }
            }
        }

        SELECT_PRICE = selectPrice;
        menu.push({
            name: '米饭',
            price: riceNum * RICE_PRICE
        });
        return menu;
    }

    function getMinPrice() {
        var minPrice = 1000;
        for (var i = 0; i < foods.length; i++) {
            if (minPrice > foods[i].price) {
                minPrice = foods[i].price;
            }
        }
        return minPrice;
    }

    function getRandom(min, max) {
        return Math.round(min + Math.random() * (max - min));
    }

    function showMenu() {
        var peopleNum = document.getElementById('people_num').value;
        var riceNum = document.getElementById('rice_num').value;
        var exceptPrice = document.getElementById('except_price').value;
        var table = document.getElementById('menu');
        var trs = [];
        var menu = getMenu(peopleNum, riceNum, exceptPrice);

        trs.push('<tr><th>菜名</th><th>价格</th></tr>');
        for (var i = 0; i < menu.length; i++) {
            trs.push('<tr><td>' + menu[i].name + '</td><td>' + menu[i].price + '</td></tr>');
        }
        trs.push('<tr><td>合计</td><td>' + SELECT_PRICE + '</td></tr>');
        table.innerHTML = trs.join('');
    }

    window.init = function () {
        showMenu();
    };
})();