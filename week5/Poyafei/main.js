let data = {
    rate: 50,
    balance: { A: 100, B: 5000 },
    token: { A: 'ETH', B: 'USDC' }
};

const dom = {
    amountA: document.getElementById('amountA'),
    amountB: document.getElementById('amountB'),
    tokenA: document.getElementById('tokenA'),
    tokenB: document.getElementById('tokenB'),
    balanceA: document.getElementById('balanceA'),
    balanceB: document.getElementById('balanceB'),
    rate: document.getElementById('rate')
};

function update() {
    dom.tokenA.textContent = data.token.A;
    dom.tokenB.textContent = data.token.B;
    dom.balanceA.textContent = `(${data.balance.A})`;
    dom.balanceB.textContent = `(${data.balance.B})`;
    dom.rate.textContent = `1 ${data.token.A} = ${data.rate} ${data.token.B}`;
}

function calcAtoB() {
    let a = parseFloat(dom.amountA.value) || 0;
    dom.amountB.value = (a * data.rate).toFixed(2);
}

function calcBtoA() {
    let b = parseFloat(dom.amountB.value) || 0;
    dom.amountA.value = (b / data.rate).toFixed(2);
}

dom.amountA.oninput = () => { calcAtoB(); };
dom.amountB.oninput = () => { calcBtoA(); };

document.getElementById('swapIcon').onclick = () => {
    [data.token.A, data.token.B] = [data.token.B, data.token.A];
    [data.balance.A, data.balance.B] = [data.balance.B, data.balance.A];
    data.rate = 1 / data.rate;
    
    [dom.amountA.value, dom.amountB.value] = [dom.amountB.value, dom.amountA.value];
    
    update();
    calcAtoB();
};

document.getElementById('swapBtn').onclick = () => {
    let a = parseFloat(dom.amountA.value) || 0;
    if (a <= 0) return alert('输入数量');
    if (a > data.balance.A) return alert(`余额不足`);
    
    data.balance.A -= a;
    data.balance.B += a * data.rate;
    
    dom.amountA.value = '';
    dom.amountB.value = '';
    
    update();
    alert(`✅ 兑换 ${a} ${data.token.A} → ${a * data.rate} ${data.token.B}`);
};

update();
