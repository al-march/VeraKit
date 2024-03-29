// ========================>
// animation scroll
// <=======================
(function () {
  var linkNav = document.querySelectorAll('[href^="#"]'),
    V = .2;
  for (var i = 0; i < linkNav.length; i++) {
    linkNav[i].addEventListener('click', function (e) {
      e.preventDefault();
      var w = window.pageYOffset,
        hash = this.href.replace(/[^#]*(.*)/, '$1');
      t = document.querySelector(hash).getBoundingClientRect().top,
        start = null;
      requestAnimationFrame(step);
      function step(time) {
        if (start === null) start = time;
        var progress = time - start,
          r = (t < 0 ? Math.max(w - progress / V, w + t) : Math.min(w + progress / V, w + t));
        window.scrollTo(0, r);
        if (r != w + t) {
          requestAnimationFrame(step)
        } else {
          location.hash = hash
        }
      }
    }, false);
  }
})();
// ========================>
// validate input
// <=======================
(function () {
  var input = document.querySelector('input[name="name"]');
  input.addEventListener('input', function () {
    input.value = input.value.replace(/[0-9]/g, '')
  })
})();
// ========================>
// pulse btn
// <=======================
(function () {
  var offer = document.getElementById('offer');
  var btn = document.querySelector('.pulse__btn');
  window.addEventListener('scroll', (e) => {
    document.documentElement.scrollTop + 300 > offer.offsetTop ? btn.classList.add('show') : btn.classList.remove('show')
  })
})();
// ========================>
// active check
// <=======================
(function() {
  document.querySelectorAll('.sect7__item').forEach(checkBox => {
    checkBox.addEventListener('click', function() {
      this.classList.toggle('active')
    })
  });
})()
// ========================>
// timer
// <=======================
class minTimer {
  constructor(options) {
    this.hour = document.querySelectorAll(`.${options.hour}`);
    this.min = document.querySelectorAll(`.${options.min}`);
    this.sec = document.querySelectorAll(`.${options.sec}`);
    this.separation = options.separation
  }
  start() {
    const update = () => {
      let date = new Date
      let tz = date.getTimezoneOffset()
      let now = Math.floor(date / 1000 - tz * 60)
      let next = Math.ceil((date / 1000 / 60 - tz) / 60 / 24) * 60 * 60 * 24
      let left = next - now;

      let hourString = ("0" + ~~(left / 60 / 60)).slice(-2)
      let minString = ("0" + ~~(left / 60 % 60)).slice(-2)
      let secString = ("0" + ~~(left % 60)).slice(-2)
      // каждая цифра в отдельном элементе
      const separation = () => {
        for (let i = 0; i < this.min.length; i++) {
          this.hour[i].innerHTML = `<span>${hourString[0]}</span><span>${hourString[1]}</span>`
          this.min[i].innerHTML = `<span>${minString[0]}</span><span>${minString[1]}</span>`
          this.sec[i].innerHTML = `<span>${secString[0]}</span><span>${secString[1]}</span>`
        }
      }
      // цифры вместе
      const together = () => {
        for (let i = 0; i < this.min.length; i++) {
          this.hour[i].innerHTML = hourString
          this.min[i].innerHTML = minString
          this.sec[i].innerHTML = secString
        }
      }

      this.separation ? separation() : together()
    }

    setInterval(() => {
      update()
    }, 1000);
  }
}
const timer = new minTimer({
  hour: 'hour',
  min: 'min',
  sec: 'sec',
  separation: true
}).start();
