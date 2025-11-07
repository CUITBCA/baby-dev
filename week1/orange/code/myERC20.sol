// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract orange is ERC20 {
    // 100 万枚 * 10^18 精度
    constructor() ERC20("orange", "OR") {
        _mint(msg.sender, 1_000_000 * 10 ** decimals());
    }
}