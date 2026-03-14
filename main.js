// 获取所有元素
let inputA = document.getElementById('inputA')
let inputB = document.getElementById('inputB')
let labelA = document.getElementById('labelA')
let labelB = document.getElementById('labelB')
let badgeA = document.getElementById('badgeA')
let badgeB = document.getElementById('badgeB')
let rateText = document.getElementById('rateText')
let switchBtn = document.getElementById('switchBtn')
let swapBtn = document.getElementById('swapBtn')

// 设置变量
let rate = 0.1      // 1 A = 0.1 B
let swapped = false // 是否切换方向

// 监听输入框A
inputA.addEventListener('input', function() {
    if (!swapped) {
        // 正常：输入A，计算B
        let val = inputA.value
        if (val !== '') {
            inputB.value = (parseFloat(val) * rate).toFixed(4)
        } else {
            inputB.value = ''
        }
    } else {
        // 切换：输入A（其实是B），计算B（其实是A）
        let val = inputA.value
        if (val !== '') {
            inputB.value = (parseFloat(val) / rate).toFixed(4)
        } else {
            inputB.value = ''
        }
    }
})

// 监听切换按钮
switchBtn.addEventListener('click', function() {
    swapped = !swapped
    
    if (swapped) {
        // 切换模式
        labelA.innerHTML = 'Token B (输出)'
        labelB.innerHTML = 'Token A (输入)'
        badgeA.innerHTML = 'B'
        badgeB.innerHTML = 'A'
        inputA.value = ''
        inputB.value = ''
        inputA.readOnly = true
        inputB.readOnly = false
        rateText.innerHTML = '💰 1 B = ' + (1/rate).toFixed(1) + ' A'
    } else {
        // 正常模式
        labelA.innerHTML = 'Token A (输入)'
        labelB.innerHTML = 'Token B (输出)'
        badgeA.innerHTML = 'A'
        badgeB.innerHTML = 'B'
        inputA.value = ''
        inputB.value = ''
        inputA.readOnly = false
        inputB.readOnly = true
        rateText.innerHTML = '💰 1 A = ' + rate + ' B'
    }
})

// 监听兑换按钮
swapBtn.addEventListener('click', function() {
    let valA = inputA.value
    let valB = inputB.value
    
    if (valA === '' || valB === '') {
        alert('❌ 请输入兑换数量！')
        return
    }
    
    if (swapped) {
        alert('✅ 兑换成功！\n' + valB + ' Token A 兑换成 ' + valA + ' Token B')
    } else {
        alert('✅ 兑换成功！\n' + valA + ' Token A 兑换成 ' + valB + ' Token B')
    }
})