// 获取图片展示项的容器
const imgItemsContainer = document.querySelector('.img-display-page__img-item-container')
// 获取页面中的图片展示项模板
const imgItemTemplate = document.querySelectorAll('.img-item')[0]

// 图片展示项最大数量
const imgItemMaxCnt = 1
// 每次生成的图片展示项个数
const imgItemCreateCntPer = 4
// 图片宽高所允许的范围
const imgSizeMin = 1080
const imgSizeMax = 1920

/**
 * 生成指定范围的随机整数，随机数的生成区间为 [min, max]
 * @param {*} min 
 * @param {*} max 
 * @returns 
 */
const genRandInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * 生成随机的图片大小
 * 
 * @param {*} min 图片大小范围的最小值
 * @param {*} max 图片大小范围的最大值
 * @return 图片的宽高组成的对象
 */
const genRandImgSize = (min, max) => {
    return {
        width: genRandInt(min, max),
        height: genRandInt(min, max)
    }
}

// 当前是否可以调用处理函数 —— genImgItems
let isInvoke = true

// 图片加载中
const imgLoading = document.querySelector('.img-display-page__loading')
// 没有更多
const notMore = document.querySelector('.img-display-page__not-more')

/**
 * 生成图片展示项
 */
const genImgItems = () => {
    // 获取页面中图片展示项的个数
    let imgItemCnt = document.querySelectorAll('.img-item').length
    // 如果超过指定的页面中允许的最大个数
    if (imgItemCnt >= imgItemMaxCnt) {
        notMore.style.display = 'flex'
        return
    } else {
        notMore.style.display = 'none'
    }
    // 显示图片加载中
    imgLoading.style.display = 'flex'
    // 记录新增的图片展示项是否全部图片访问完成
    let isShowImgCnt = { cnt: 0 }
    // 创建 isShowImgCnt 的代理，以达到能够监听其的目的
    const isShowImgCntProxy = new Proxy(isShowImgCnt, {
        // target-被代理的对象, property-修改属性, value-新属性值
        set(target, property, value) {
            target[property] = value
            // 所有的新增图片在页面中完成显示，允许再次调用 genImgItems
            if (isShowImgCnt.cnt === imgItemCreateCntPer) {
                // 隐藏图片加载中
                imgLoading.style.display = 'none'
                isInvoke = true
            }
        }
    })
    // 生成图片展示项
    for (let i = 0; i < imgItemCreateCntPer; i++) {
        // 根据模板克隆图片展示项，true 表示深度克隆
        let imgItem_clone = imgItemTemplate.cloneNode(true)
        // 生成随机图片地址
        let imgSize = genRandImgSize(imgSizeMin, imgSizeMax)
        // let randInt = genRandInt(1, 100) // 防止大小一样走浏览器缓存展示相同图片
        // let imgSrc = `https://picsum.photos/${imgSize.width}/${imgSize.height}?random=${randInt}`
        let imgSrc = `https://picsum.photos/${imgSize.width}/${imgSize.height}`
        // 修改元素图片地址
        let img = imgItem_clone.querySelector('img')
        img.src = imgSrc
        // 为图片元素添加图片显示成功事件
        img.addEventListener('load', () => {
            // 加入页面中
            imgItemsContainer.appendChild(imgItem_clone);
            isShowImgCntProxy.cnt++
        })
        // 为图片元素添加图片显示失败事件
        img.addEventListener('error', () => {
            console.log(imgSrc + '图片显示失败');
            img.src = './image/img-01.jpg'
            // 加入页面中
            imgItemsContainer.appendChild(imgItem_clone);
            isShowImgCntProxy.cnt++
        })
    }
}

/**
 * 节流函数，执行要进行调用的函数要在上一次调用之后
 * 
 * @param {*} handler 
 * @param {*} delay 
 */
const throttle = (handler, delay) => {
    // 可以调用，才执行调用函数
    if (isInvoke) {
        // 标记当前不可继续调用
        isInvoke = false
        // 调用处理函数
        handler.apply(this)
    }
}

/**
 * 事件处理函数防抖，防止短时间内事件处理函数被重复调用执行。
 * 通过定时器控制事件处理函数段时间内的执行次数，只执行一次
 * 
 * @param {*} handler 事件处理函数
 * @param {*} delay 事件触发后执行事件处理的延时
 */
const debounce2 = (handler, delay) => {
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

// 生成图片展示项
throttle(genImgItems)

// 绑定滚动事件
window.addEventListener('scroll', debounce2(() => {
    // 页面向上滚动的距离
    let docScrollTop = document.body.scrollTop || document.documentElement.scrollTop
    // document.documentElement.clientHeight 网页文档可视区域的高度
    // docVisibleMax 当前浏览器可视区域的底边在网页文档高度的什么位置
    let docVisibleMax = document.documentElement.clientHeight + docScrollTop
    // 如果要滚动到页面底部
    // document.body.clientHeight 网页文档高度
    if (docVisibleMax + 200 >= document.body.clientHeight) {
        // 生成图片展示项
        throttle(genImgItems)
    }
}, 100))