export default {
  deedClone: function (val) {
    if (val) {
      return JSON.parse(JSON.stringify(val))
    } else {
      return {}
    }
  },
  throttle(func, wait) { // 节流
    let timeout
    return function () {
      const context = this
      const args = arguments
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null
          func.apply(context, args)
        }, wait)
      }
    }
  },
  debounce(func, wait) { //防抖
    let timer
    return function () {
      const context = this
      const args = arguments
      if (timer) clearTimeout(timer)
      const callNow = !timer
      timer = setTimeout(() => {
        timer = null
      }, wait)
      if (callNow) func.apply(context, args)
    }
  },
  uuid() {	// uuid
    var s = [];
    var hexDigits = '0123456789abcdef';
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = '-';
    var uuid = s.join('');
    return uuid;
  },
  hexToRGB(hex) { // hex转rgb
    hex = hex.slice(1)
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
    }
    return {
      r: Number.parseInt(hex.slice(0, 2), 16),
      g: Number.parseInt(hex.slice(2, 4), 16),
      b: Number.parseInt(hex.slice(4, 6), 16),
      rgb: `${Number.parseInt(hex.slice(0, 2), 16)},${Number.parseInt(hex.slice(2, 4), 16)},${Number.parseInt(hex.slice(4, 6), 16)}`
    }
  },
  getLastDay(year, month) { // 判断某一年一月的最后一天是几号
    let new_year = year //取当前的年份
    let new_month = month++//取下一个月的第一天，方便计算（最后一天不固定）
    if (month > 12) {
      new_month -= 12 //月份减
      new_year++ //年份增
    }
    const new_date = new Date(new_year, new_month, 1) //取当年当月中的第一天
    return (new Date(new_date.getTime() - 1000 * 60 * 60 * 24)).getDate()//获取当月最后一天日期
  },
  keyInput(event) { // input按键事件，只允许输入数字和小数
    const obj = event.target
    obj.value = obj.value.replace(/[^\d.]/g, '') //清除“数字”和“.”以外的字符
    obj.value = obj.value.replace(/^\./g, '') //小数点出现在第一个位置，就删除第一个小数点
    obj.value = obj.value.replace(/\.{2,}/g, '') //只保留第一个. 清除多余的
    obj.value = obj.value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
    if (obj.value.indexOf('.') < 0 && obj.value !== '') { //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
      obj.value = parseFloat(obj.value)
    }
  },
  fileDown(href, name) { // 文件下载
    const a = document.createElement('a')
    a.setAttribute('href', href)
    a.setAttribute('download', name)
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  },
  imgDown(filename, href) { // 图片下载
    const eleLink = document.createElement('a');
    eleLink.setAttribute('download', filename)
    eleLink.setAttribute('href', href)
    eleLink.style.display = 'none';
    document.body.appendChild(eleLink);
    eleLink.click();
    document.body.removeChild(eleLink);
  },
  screenHeight() { // 当前屏幕高度
    return document.documentElement.clientHeight || document.body.clientHeight
  },
  screenWidth() { // 当前屏幕宽度
    return document.documentElement.clientWidth || document.body.clientWidth
  },
  charLen(str) { // 计算字符串长度，包含汉字和其他
    let len = 0
    if (str) {
      const re = /[\u4E00-\u9FA5]/g //  汉字的正则匹配
      const count = re.test(str) ? str.match(re).length : 0
      len = count * 20 + (str.length - count) * 20
    }
    return len
  },
  goToAddress(url, isAll) { // 生成a标签并跳转到指定url
    const a = document.createElement('a')
    const address = window.location.href.split('#')[0]
    const href = isAll || `${address}#/${url}`
    a.setAttribute('href', href)
    a.setAttribute('target', '_blank')
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  },
}
