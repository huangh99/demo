(function (r) {
  var t,
    v,
    n = {},
    p = [],
    k = {};
  k.friction = 0.5;
  k.trails = 20; // 轨迹数量
  k.size = 50; // 轨迹长度
  k.dampening = 0.25;
  k.tension = 0.98;
  Math.TWO_PI = Math.PI * 2;
  function g(w) {
    this.init(w || {});
  } // 获取颜色
  g.prototype = (function () {
    var w = 0;
    return {
      init: function (x) {
        this.phase = x.phase || 0;
        this.offset = x.offset || 0;
        this.frequency = x.frequency || 0.001;
        this.amplitude = x.amplitude || 1;
      },
      update: function () {
        this.phase += this.frequency;
        w = this.offset + Math.sin(this.phase) * this.amplitude;
        return w;
      },
      value: function () {
        return w;
      },
    };
  })(); // 获取颜色
  function o(w) {
    this.init(w || {});
  }
  o.prototype = (function () {
    function w() {
      this.x = 0;
      this.y = 0;
      this.vy = 0;
      this.vx = 0;
    }
    return {
      init: function (z) {
        this.spring = z.spring + Math.random() * 0.1 - 0.05;
        this.friction = k.friction + Math.random() * 0.01 - 0.005;
        this.nodes = [];
        for (var x = 0, y; x < k.size; x++) {
          y = new w();
          y.x = n.x;
          y.y = n.y;
          this.nodes.push(y);
        }
      },
      update: function () {
        var y = this.spring;
        var B = this.nodes[0];
        B.vx += (n.x - B.x) * y;
        B.vy += (n.y - B.y) * y;
        for (var x, z = 0, A = this.nodes.length; z < A; z++) {
          B = this.nodes[z];
          if (z > 0) {
            x = this.nodes[z - 1];
            B.vx += (x.x - B.x) * y;
            B.vy += (x.y - B.y) * y;
            B.vx += x.vx * k.dampening;
            B.vy += x.vy * k.dampening;
          }
          B.vx *= this.friction;
          B.vy *= this.friction;
          B.x += B.vx;
          B.y += B.vy;
          y *= k.tension;
        }
      },
      draw: function () {
        var A = this.nodes[0].x,
          B = this.nodes[0].y,
          C,
          x;
        t.beginPath();
        t.moveTo(A, B);
        for (var y = 1, z = this.nodes.length - 2; y < z; y++) {
          C = this.nodes[y];
          x = this.nodes[y + 1];
          A = (C.x + x.x) * 0.5;
          B = (C.y + x.y) * 0.5;
          t.quadraticCurveTo(C.x, C.y, A, B);
        }
        C = this.nodes[y];
        x = this.nodes[y + 1];
        t.quadraticCurveTo(C.x, C.y, x.x, x.y);
        t.stroke();
        t.closePath();
      },
    };
  })();
  function a(w) {
    document.removeEventListener("mousemove", a);
    document.addEventListener("mousemove", f);
    f(w);
    h();
    e();
  }
  function h() {
    p = [];
    for (var w = 0; w < k.trails; w++) {
      p.push(
        new o({
          spring: 0.45 + 0.025 * (w / k.trails),
        })
      );
    }
  } // 创建k.trails条轨迹
  function e() {
    if (!t.running) {
      return;
    }
    t.globalCompositeOperation = "source-over";
    t.fillStyle = "rgba(8,5,16,0.4)";
    t.fillRect(0, 0, t.canvas.width, t.canvas.height);
    t.globalCompositeOperation = "lighter";
    t.strokeStyle = "hsla(" + "125" + ",90%,50%,0.25)";
    t.lineWidth = 1;
    if (t.frame % 60 == 0) {
      console.log(
        v.update(),
        Math.round(v.update()),
        v.phase,
        v.offset,
        v.frequency,
        v.amplitude
      );
    }
    for (var w = 0, x; w < k.trails; w++) {
      x = p[w];
      x.update();
      x.draw();
    }
    t.frame++;
    requestAnimFrame(e);
  }
  function i() {
    t.canvas.width = r.innerWidth;
    t.canvas.height = r.innerHeight;
  } // 宽高重置
  function l() {
    if (!t.running) {
      t.running = true;
      e();
    }
  } // 开始动画
  function m() {
    t.running = false;
  } // 暂停动画
  function f(w) {
    n.x = w.clientX;
    n.y = w.clientY;
    w.preventDefault(); // 阻止默认事件
  } // 获取当前鼠标位置

  r.requestAnimFrame = (function () {
    return (
      r.requestAnimationFrame ||
      r.webkitRequestAnimationFrame ||
      r.mozRequestAnimationFrame ||
      function (w) {
        r.setTimeout(w, 1000 / 60);
      }
    );
  })();
  r.onload = function () {
    t = document.getElementById("canvas").getContext("2d");
    t.running = true;
    t.frame = 1;
    v = new g({
      phase: Math.random() * Math.TWO_PI,
      amplitude: 85,
      frequency: 0.0015,
      offset: 285,
    });
    document.addEventListener("mousemove", a);
    r.addEventListener("resize", i); // 宽高重置
    r.addEventListener("focus", l); // 开始动画
    r.addEventListener("blur", m); // 暂停动画
    i(); // 初始化宽高
  };
})(window);
