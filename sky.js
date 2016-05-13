// 天空的构造函数
function Sky(img,x) {
  this.img = img;
  this.x = x;
  this.speed = -0.03;
}

Sky.prototype.update = function(dt) {
    //如果天空飞出了屏幕范围，则将它拉回来，拉到（右移）到最右边，因为是两张天空的图片并排
    if(this.x < -800) {
      // 因为是两张天空图片并排排列，所以需要1600
      this.x = this.x + 800 * 2;
    }
    this.x = this.x + dt * this.speed;//每次的移动距离，其实就是速度乘以时间
}

Sky.prototype.draw = function () {
  ctx.drawImage(this.img,this.x,0);//y坐标不变，只是水平在移动
}