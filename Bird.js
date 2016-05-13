// 构造鸟的函数
function Bird(img,cvs) {
  // 将this存一下，因为在下面的addEventListener中function例的直接写的this是指向window的，相当于函数模式，所以先存一下
  var _this = this;

  // 当鼠标点击(画布)时，让小鸟向上飞
  cvs.addEventListener('click',function(event) {
    var x = event.layerX;
    var y = event.layerY;
    _this.fly();
  });

  // 图像来源
  this.img = img;

  //位置
  this.x = 200;
  this.y = 100;

  // 当前帧
  this.index = 0;

  // 速度、加速度
  this.speed = 0;
  this.a = 0.0005;

  // 精灵在当前帧等待了多长时间,实现精灵的切换频率与浏览器刷新频率的不同，因为浏览器是每秒刷新60帧（60次），鸟是没面刷新10帧（10次）
  this.waitTime = 0;
}

Bird.prototype.update = function (dt) {
  // 根据两帧间隔时间，更新精良的数据（定的是100ms，也就是一秒刷新10次的节奏）
  // 更新当前帧的数据
  this.waitTime = this.waitTime + dt;
  if (this.waitTime > 100) {
    this.index = (this.index + 1) % 3;//保证index一直循环切换，不会出现空白
    this.waitTime = this.waitTime - 100;
  }

  // 更新位置数据
  this.speed = this.speed + this.a * dt;//当前速度等于初始速度+加速度(a)*时间（dt)
  this.y = this.y + this.speed * dt;
};

Bird.prototype.draw = function() {
  // 根据精灵的数据，把图片绘制到画布上
  ctx.save();//与下面的restore对应，这样下面restore后就会回到这次保存的状态，这样能够使这两个之间的状态不会对其他元素（land，pipe，sky）产生影响

  // 先translate再rotate
  ctx.translate(this.x,this.y);//这样确保坐标系是以小鸟的中心旋转，能够确保小鸟只是角度变化，位移不变

  // 速度为0.3时，角度为30度
  // 保证它永远不会转的超过45度
  var speed = this.speed > 0.3 ? 0.3 : this.speed;

  var angle = this.speed / 0.3 * 45;
  // var angle = this.speed / 0.3;
  ctx.rotate(angle / 180 * Math.PI);
// 绘制小鸟
  ctx.drawImage(imgObjects[0],
              52 * this.index, 0, 52, 45,
              // -26和22.5用于：让鸟的图片的中心点和当前坐标系的中心店重合
              // 因为rotate是以坐标系的原点为中心点旋转的
              -26, -22.5, 52, 45
    );
  ctx.restore();//鸟绘制完后，恢复context的状态到绘制鸟之前的状态
};

//在被点击时，改变速度，使小鸟向上飞
Bird.prototype.fly = function () {
  this.speed = -0.3;
}