document.addEventListener('DOMContentLoaded', function() {
    const tokenAInput = document.getElementById('tokenA');
    const tokenBInput = document.getElementById('tokenB');
    const tokenALabel = document.getElementById('tokenALabel');
    const tokenBLabel = document.getElementById('tokenBLabel');
    const switchBtn = document.getElementById('switchBtn');
    const exchange = 100;
    let isEthToUsdc = true;
    tokenAInput.addEventListener('input', function() {
        calculate();
    });
    function calculate() {
        const inputValue = parseFloat(tokenAInput.value) || 0;
        let outputValue;// // 标记当前方向：true = ETH → USDC
        if (isEthToUsdc) {
            outputValue = inputValue * exchange
    ;
        } else {
            outputValue = inputValue / exchange
    ;
        }
        tokenBInput.value = outputValue.toFixed(2);
    }
    switchBtn.addEventListener('click', function() {
        [tokenALabel.textContent, tokenBLabel.textContent] = [tokenBLabel.textContent, tokenALabel.textContent];
        isEthToUsdc = !isEthToUsdc;
        calculate();
    });
});