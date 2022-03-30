console.log('Hello MDN')

const a = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(111)
    }, 2000)
  })
a().then(res => {
  console.log(res)
})

async function dd() {
  await a()
  console.log(123)
}

dd()

const b = new Promise((resolve, reject) => {
  resolve(222)
})
b.then(res => {
  console.log(res)
})

function loadAsset() {
  let xhr = new XMLHttpRequest()
  xhr.open('get', 'http://www.baidu.com')
  xhr.responseType = 'json'

  xhr.onload = function () {
    console.log(123)
  }

  xhr.send()
}
