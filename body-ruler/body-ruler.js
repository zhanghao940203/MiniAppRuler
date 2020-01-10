const app = getApp();
// {{{name}}}
var deltaX = 0;
var minValue = 1;
var tmp = 0;
var count = 0;
var timer = false;
var eve = {}

Component({
  data: {
    num: 0,
    canvasHeight: 80,
    halfWindowWidth: 375 / 2,
    scrollTopId: 0,
    scrollLeft: 0,
    list: [],
    timeout: false
  },
  props: {
    title: '',
    unit: '',
    low: '',
    high: '',
    value: ''
  },
  didMount() {
    // const halfWindowWidth = app.globalData.windowWidth / 2
    const halfWindowWidth = 375 / 2
    let {
      low,
      high,
      value
    } = this.props
    let list = []
    for (let i = Number(low); i <= Number(high); i++) {
      list.push(i)
    }
    // console.log(list)
    let idx = list.indexOf(Number(value))
    tmp = idx
    // console.log(idx)
    var scrollLeft = 0
    var j = 0
    while (j < idx) {
      scrollLeft += 18
      j++
    }
    scrollLeft += 8
    this.setData({
      halfWindowWidth: halfWindowWidth,
      num: value,
      scrollLeft,
      list
    })

    if (this.props.title === "身高") {
      this.$page.heightRuler = this
    } else if (this.props.title === "当前体重") {
      this.$page.weightRuler = this
    } else if (this.props.title === "目标体重") {
      this.$page.targetRuler = this
    }
  },
  methods: {
    didScroll(e) {
      count++;
      eve = e
      if (count % 5 == 0 && timer == false) {
        console.log('111')
        this.timer(count, e)
      } else {
        if (count > 10000) {
          count = 0;
        }
        return
      }
    },
    timer(c) {
      timer = true
      let e =eve
      setTimeout(() => {
        if (count != c) {
          this.timer(count)
        }
        else {
          console.log('12')
          const halfWindowWidth = this.data.halfWindowWidth
          const scrollLeft = e.detail.scrollLeft
          // console.log(scrollLeft)
          const positionX = scrollLeft
          const unitWidth = 18
          // console.log(halfWindowWidth+','+positionX)
          let idx = Math.floor(positionX / unitWidth)
          // console.log(idx)
          if (idx > this.data.list.length - 1) {
            idx = this.data.list.length - 1
          }
          let num = this.data.list[idx]
          if (idx != tmp) {
            var newScrollLeft = 0
            var j = 0
            while (j < idx) {
              newScrollLeft += 18
              j++
            }
            this.setData({
              scrollLeft: newScrollLeft+9
            })
          }
          tmp = idx
          console.log(num)
          timer = false
          this.setData({
            num: num
          })
        }
      }, 200)
    }
  },
});