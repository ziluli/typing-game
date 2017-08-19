/**
 * Created by dell on 2017/5/10.
 */
function Game() {
    this.arr = [
        ['Q', 'img/2.png'],
        ['W', 'img/2.png'],
        ['E', 'img/2.png'],
        ['R', 'img/2.png'],
        ['T', 'img/2.png'],
        ['Y', 'img/2.png'],
        ['U', 'img/2.png'],
        ['I', 'img/2.png'],
        ['O', 'img/2.png'],
        ['P', 'img/2.png'],
        ['A', 'img/2.png'],
        ['S', 'img/2.png'],
        ['D', 'img/2.png'],
        ['F', 'img/2.png'],
        ['G', 'img/2.png'],
        ['H', 'img/2.png'],
        ['J', 'img/2.png'],
        ['K', 'img/2.png'],
        ['L', 'img/2.png'],
        ['Z', 'img/2.png'],
        ['X', 'img/2.png'],
        ['C', 'img/2.png'],
        ['V', 'img/2.png'],
        ['B', 'img/2.png'],
        ['N', 'img/2.png'],
        ['M', 'img/2.png'],  //相当于html传文件 没有../
    ];
    this.arrLength = 5;
    this.cw = window.innerWidth;
    this.currentArr = [];
    this.currentTop = [];
    this.speed = 10;
    this.sm = 7;
    this.fs = 0;
    this.gq = 10;
    this.gqg = 1;
    this.gqgq = document.querySelector('.gqgq');
    this.smSpan = document.querySelector('.sm');
    this.fsSpan = document.querySelector('.fs');
}
Game.prototype = {
    start: function () {
        this.add(this.arrLength);
        this.drop();
        this.key();
    },
    add: function (length) {
        for (let i = 0; i < length; i++) {
            this.getChar();
        }
    },
    checkRepeat: function (text) {
        return this.currentArr.some(function (value) {
            return value.innerText == text;
        })
    },
    checkPosition: function (lefts) {
        return this.currentTop.some(function (value) {
            return value + 70 > lefts && lefts + 50 > value;
        })
    },
    getChar: function () {
        let num = Math.floor(Math.random() * this.arr.length);
        //num this.arr[num][0] this.currentArr[i].innerText
        while (this.checkRepeat(this.arr[num][0])) {
            num = Math.floor(Math.random() * this.arr.length);
        }
        let ele = document.createElement('div');
        let tops = Math.random() * 100;

        let lefts = Math.random() * (this.cw - 400) + 200;
        while (this.checkPosition(lefts)) {
            lefts = Math.random() * (this.cw - 400) + 200;
        }

        ele.style.cssText = `width:100px;height:100px;
        background-image:url(${this.arr[num][1]});background-position:center;
        background-size:cover;border-radius:50%;
        position:absolute;font-size:30px;font-weight:700;color:brown;
        left:${lefts}px;top:${tops}px;text-align:center;line-height:80px;`;
        ele.innerText = this.arr[num][0];
        document.body.appendChild(ele);
        this.currentArr.push(ele);
        this.currentTop.push(lefts);
    },
    drop: function () {
        let self = this;
        self.t = setInterval(function () {
            for (let i = 0; i < self.currentArr.length; i++) {
                let tops = self.currentArr[i].offsetTop + self.speed;
                self.currentArr[i].style.top = tops + 'px';
                if (tops > 500) {
                    document.body.removeChild(self.currentArr[i]);
                    self.currentArr.splice(i, 1);
                    self.currentTop.splice(i, 1);
                    self.sm--;
                    self.smSpan.style.width = self.sm  + '%';

                    //重新开始
                    if (self.sm < 0) {
                        let flag = window.confirm('求爱失败，是否继续');
                        if (flag) {
                            self.restart();
                        } else {
                            close();
                        }
                    }
                }
            }
            if (self.currentArr.length < self.arrLength) {
                self.getChar();
            }
        }, 300)
    },
    key: function () {
        document.body.onkeydown = function (e) {
            let code = String.fromCharCode(e.keyCode);
            for (let i = 0; i < this.currentArr.length; i++) {
                if (code==this.currentArr[i].innerText) {
                    document.body.removeChild(this.currentArr[i]);
                    this.currentArr.splice(i, 1);
                    this.currentTop.splice(i, 1);
                    this.fs++;
                    this.fsSpan.innerText = this.fs;
                    if (this.fs >= this.gq) {
                        this.next();
                    }
                }
            }
            if (this.currentArr.length < this.arrLength) {
                this.getChar();
            }
        }.bind(this);
    },
    restart: function () {
        clearInterval(this.t);
        for (let i = 0; i < this.currentArr.length; i++) {
            document.body.removeChild(this.currentArr[i]);
        } //元素清除
        this.currentArr = []; //数组清空
        this.currentTop = [];
        this.sm = 7;
        this.smSpan.style.width = 100 + 'px';
        this.fs = 0;
        this.fsSpan.innerText = this.fs;
        this.gqg = 1;
        this.gqgq.innerText = this.gqg;
        this.speed++;
        this.start();
    },
    next: function () {
        clearInterval(this.t);
        for (let i = 0; i < this.currentArr.length; i++) {
            document.body.removeChild(this.currentArr[i]);
        }
        this.currentArr = [];
        this.currentTop = [];
        this.sm = 7;
        this.smSpan.style.width = 100 + 'px';
        this.gq += 10;
        this.gqg++;
        this.smSpan.style.width = 100 + 'px';
        this.gqgq.innerText = this.gqg;
        this.arrLength++;
        this.speed++;
        this.start();

    }

}
