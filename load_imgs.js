//这一个模块就是处理资源加载的，也是实现动画的第一步
// 加载图片
var imgs = ['birds.png', 'land.png', 'pipe1.png', 'pipe2.png', 'sky.png'];
var imgObjects = [];
//这个imgObjects可以改成键值对的形式
//var imgObjects = {birds:"birds.png",land:"land.png".......}

var loadCount = 0;
// 图片加载完成后的监听器,回调函数
function listener() {
    loadCount++;
    if (loadCount >= imgs.length) {//这一步能够确保加载完毕
        main();
    }
}

imgs.forEach(function (imgurl) {
    var img = new Image();
    img.addEventListener('load', listener);//这里加载的时候并不会立即执行listener，listener相当于回调函数
    // 当真正加载完之后listener才会执行，因为图片加载其实是异步的，所以应该在listener中进行loadCount++；记录下当前加载的图片数
    img.src = './imgs/' + imgurl;
    imgObjects.push(img);
});