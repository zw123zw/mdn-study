const logNext = (...str) => {
  window.console.log(...str)
  window.console.log('--------------------------------')
}

logNext('Hello MDN', 123)

const a = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(111)
    }, 2000)
  })
a().then(res => {
  logNext(res)
})

async function dd() {
  await a()
  logNext(123)
}

dd()

const b = new Promise((resolve, reject) => {
  resolve(222)
})
b.then(res => {
  logNext(res)
})

function loadAsset() {
  let xhr = new XMLHttpRequest()
  xhr.open('get', 'http://www.baidu.com')
  xhr.responseType = 'json'

  xhr.onload = function () {
    logNext(123)
  }

  xhr.send()
}

const badImg = document.querySelector('.bad-img')
badImg.addEventListener('error', event => {
  logNext(event)
})
badImg.setAttribute('src', 'i-dont-exist')

const video = document.querySelector('video')
const videoSrc = 'https://path/to/video.webm'

video.addEventListener('abort', () => {
  logNext(`Abort loading: ${videoSrc}`)
})

const source = document.createElement('source')
source.setAttribute('src', videoSrc)
source.setAttribute('type', 'video/webm')
video.appendChild(source)

document.addEventListener('DOMContentLoaded', event => {
  logNext('page is fully DOMContentLoaded')
})
window.addEventListener('load', event => {
  logNext('page is fully loaded')
})

window.addEventListener('beforeunload', event => {
  logNext('I am the 2nd one.')
  // // Cancel the event as stated by the standard.
  // event.preventDefault()
  // // Chrome requires returnValue to be set.
  // event.returnValue = ''
})

window.addEventListener('unload', function (event) {
  logNext('I am the 4th and last one…')
})

setTimeout(() => {
  document.querySelector('iframe').remove()
}, 2000)

window.addEventListener('offline', event => {
  logNext('You are not connected to the network.')
})
window.addEventListener('online', event => {
  logNext('You are now connected to the network.')
})

window.addEventListener(
  'pagehide',
  event => {
    if (event.persisted) {
      /* the page isn't being discarded, so it can be reused later */
    }
  },
  false
)

// window.addEventListener('animationstart', e => {
//   logNext('animationstart')
// })
// window.addEventListener('animationend', e => {
//   logNext('animationend')
// })
// window.addEventListener('animationiteration', e => {
//   logNext('animationiteration')
// })

const inputElement = document.querySelector('input[type="text"]')

inputElement.addEventListener('compositionstart', event => {
  logNext(`generated characters were: ${event.data}`)
})

// Note that the API is still vendor-prefixed in browsers implementing it
document.addEventListener('fullscreenchange', function (event) {
  // The event object doesn't carry information about the fullscreen state of the browser,
  // but it is possible to retrieve it through the fullscreen API
  if (document.fullscreenElement !== null) {
    // The target of the event is always the document,
    // but it is possible to retrieve the fullscreen element through the API
    document.fullscreenElement
  }
  logNext('123')
})

function full(ele) {
  if (ele.requestFullscreen) {
    ele.requestFullscreen()
  } else if (ele.mozRequestFullScreen) {
    ele.mozRequestFullScreen()
  } else if (ele.webkitRequestFullscreen) {
    ele.webkitRequestFullscreen()
  } else if (ele.msRequestFullscreen) {
    ele.msRequestFullscreen()
  }
}

document.querySelector('.full').addEventListener('click', e => {
  full(document.body)
})
;(function () {
  var throttle = function (type, name, obj) {
    obj = obj || window
    var running = false
    var func = function () {
      if (running) {
        return
      }
      running = true
      requestAnimationFrame(function () {
        obj.dispatchEvent(new CustomEvent(name))
        running = false
      })
    }
    obj.addEventListener(type, func)
  }

  /* init - you can init any event */
  throttle('resize', 'optimizedResize')
})()

// handle event
window.addEventListener('optimizedResize', function () {
  logNext('Resource conscious resize callback!')
})

document.addEventListener('copy', function (e) {
  // e.clipboardData.setData('text/plain', 'Hello, world!')
  // e.clipboardData.setData('text/html', '<b>Hello, world!</b>')
  e.preventDefault() // We want our data, not data from any selection, to be written to the clipboard
})
document.addEventListener('paste', function (event) {
  event.preventDefault()
})

document.addEventListener('keydown', e => {})
document.addEventListener('keypress', e => {})
document.addEventListener('keyup', e => {})

document.querySelector('table').addEventListener('contextmenu', e => {
  e.preventDefault()
})

document.body.addEventListener('dblclick', e => {
  logNext(e)
})

function logSelection(event) {
  const selection = event.target.value.substring(
    event.target.selectionStart,
    event.target.selectionEnd
  )
  logNext(`You selected: ${selection}`)
}

const input = document.querySelector('input')
input.addEventListener('select', logSelection)

var dragged

/* 拖动目标元素时触发drag事件 */
document.addEventListener('drag', function (event) {}, false)

document.addEventListener(
  'dragstart',
  function (event) {
    // 保存拖动元素的引用(ref.)
    dragged = event.target
    // 使其半透明
    event.target.style.opacity = 0.5
  },
  false
)

document.addEventListener(
  'dragend',
  function (event) {
    // 重置透明度
    event.target.style.opacity = ''
  },
  false
)

/* 放置目标元素时触发事件 */
document.addEventListener(
  'dragover',
  function (event) {
    // 阻止默认动作以启用drop
    event.preventDefault()
  },
  false
)

document.addEventListener(
  'dragenter',
  function (event) {
    // 当可拖动的元素进入可放置的目标时高亮目标节点
    if (event.target.className == 'dropzone') {
      event.target.style.background = 'purple'
    }
  },
  false
)

document.addEventListener(
  'dragleave',
  function (event) {
    // 当拖动元素离开可放置目标节点，重置其背景
    if (event.target.className == 'dropzone') {
      event.target.style.background = ''
    }
  },
  false
)

document.addEventListener(
  'drop',
  function (event) {
    // 阻止默认动作（如打开一些元素的链接）
    event.preventDefault()
    // 将拖动的元素到所选择的放置目标节点中
    if (event.target.className == 'dropzone') {
      event.target.style.background = ''
      dragged.parentNode.removeChild(dragged)
      event.target.appendChild(dragged)
    }
  },
  false
)

window.addEventListener('storage', () => {
  // When local storage changes, dump the list to
  // the console.
  console.log(JSON.parse(window.localStorage.getItem('sampleList')))
})

window.onstorage = () => {
  // When local storage changes, dump the list to
  // the console.
  console.log(JSON.parse(window.localStorage.getItem('sampleList')))
}
