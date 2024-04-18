// 图片展示项展示效果类名
const imgItemDisplayClassName = 'display'

// 获取 .img-display-page 元素
const imgDisplayPage = document.querySelector('.img-display-page')
// 获取所有的图片展示项
let imgItems = document.querySelectorAll('.img-item')

/**
 * 根据当前展示的图片项中的图片修改网页背景
 * 
 * @param {*} imgItem 当前展示的图片项
 */
const changePageBgImgByDisplayImgItem = (imgItem) => {
    imgDisplayPage.style.backgroundImage = `url(${imgItem.querySelector('img').src})`
}

/**
 * 为图片展示项添加展示效果
 * 
 * @param {*} idx 要添加展示效果的图片展示项的索引
 * @returns 
 */
const addDisplay2ImgItemHandler = (idx) => {
    if (idx < 0 || idx >= imgItems.length) return
    let imgItem = imgItems[idx]
    imgItem.classList.add(imgItemDisplayClassName)
    changePageBgImgByDisplayImgItem(imgItem)
}

// 默认展示第一个图片展示项
if (imgItems.length >= 1) {
    addDisplay2ImgItemHandler(0)
}

/**
 * 网页滚动事件处理函数
 * 
 * @returns 
 */
const docScrollHandler = () => {
    // 由于会触底更新，所以需要重新获取网页中的图片展示项
    // 获取所有的图片展示项
    imgItems = document.querySelectorAll('.img-item')
    // 没有图片展示项直接返回
    if (imgItems.length <= 0) return
    // 获取网页向上滚动的距离
    // 使用此方法获取网页向上滚动的距离的原因可参考：
    // https://blog.csdn.net/qq_41494959/article/details/104370213
    // https://blog.csdn.net/NotBad_/article/details/52325437
    let docScrollTop = document.body.scrollTop || document.documentElement.scrollTop
    // 获取网页可视区域的高度
    // 使用如下方式获取，document.body.clientHeight 获取整个网页 body 的高度
    let docVisibleHeight = document.documentElement.clientHeight
    // 网页在浏览器中可视区域的范围
    let docVisibleMin = docScrollTop
    let docVisibleMax = docScrollTop + docVisibleHeight
    // 网页在浏览器中可视区域的范围的中位线
    let docVisibleMiddle = docVisibleMin + (docVisibleMax - docVisibleMin) / 2
    // 判断每个图片展示项是否在浏览器可视区域内
    imgItems.forEach(item => {
        // 默认取消图片项的展示效果
        item.classList.remove(imgItemDisplayClassName)
        // 如果当前在页面顶部
        if (docScrollTop === 0) {
            addDisplay2ImgItemHandler(0)
            return
        }
        // 如果滚动到页面底部
        if (docVisibleMax === document.body.clientHeight) {
            addDisplay2ImgItemHandler(imgItems.length - 1)
            return
        }
        // 图片展示项在网页中的位置范围
        // offsetTop 当前元素上边(不包括边框)到其定位父级元素(当前元素相对于哪个元素进行定位)
        // 上边的距离
        // 定位父级元素可以通过 offsetParent 获取
        // offsetHeight 包括边框；clientHeight 不包括边框
        let itemDocMin = item.offsetTop
        let itemDocMax = item.offsetTop + item.offsetHeight
        // 如果网页在浏览器中可视区域的范围的中位线在图片展示项内，添加 display 类名
        if (itemDocMin <= docVisibleMiddle && itemDocMax >= docVisibleMiddle) {
            item.classList.add(imgItemDisplayClassName)
            changePageBgImgByDisplayImgItem(item)
        }
    })
}

/**
 * 事件处理函数防抖，防止短时间内事件处理函数被重复调用执行。
 * 通过定时器控制事件处理函数段时间内的执行次数，只执行一次
 * 
 * @param {*} handler 事件处理函数
 * @param {*} delay 事件触发后执行事件处理的延时
 */
const debounce = (handler, delay) => {
    // 定时器(返回的所有函数共用)
    let timer = null
    return function () {
        // 已有定时器，就清除重新创建
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            // 调用事件处理函数
            handler.apply(this, arguments)
        }, delay)
    }
}

// 为整个网页绑定滚动事件
document.addEventListener('scroll', debounce(docScrollHandler, 100))

