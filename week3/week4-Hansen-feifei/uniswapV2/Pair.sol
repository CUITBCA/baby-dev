// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./IERC20.sol";
import "./ERC20.sol";

contract Pair is ERC20 {
    address public token0;
    address public token1;
    uint256 public reserve0;
    uint256 public reserve1;

    constructor(address _token0, address _token1) ERC20("LP代币", "LP", 0) {
        token0 = _token0;
        token1 = _token1;
    }

    function _update() private {
        reserve0 = IERC20(token0).balanceOf(address(this));
        reserve1 = IERC20(token1).balanceOf(address(this));
    }

    function addLiquidity(uint256 amount0, uint256 amount1) external returns (uint256 lp) {
        IERC20(token0).transferFrom(msg.sender, address(this), amount0);
        IERC20(token1).transferFrom(msg.sender, address(this), amount1);

        _update(); 
        if (totalSupply == 0) {
            lp = _sqrt(amount0 * amount1);
        } else {
            lp = _min((amount0 * totalSupply) / reserve0, (amount1 * totalSupply) / reserve1);
        }
        balanceOf[msg.sender] += lp;
        totalSupply += lp;
    }

    function swap(uint256 amount0In) external returns (uint256 amount1Out) {
        IERC20(token0).transferFrom(msg.sender, address(this), amount0In);
        _update();
        amount1Out = (amount0In * reserve1) / (reserve0 + amount0In);
        IERC20(token1).transfer(msg.sender, amount1Out);
        _update();
    }

    function _sqrt(uint256 y) private pure returns (uint256 z) {
        if (y > 3) {
            z = y;
            uint256 x = y / 2 + 1;
            while (x < z) {
                z = x;
                x = (y / x + x) / 2;
            }
        } else if (y != 0) {
            z = 1;
        }
    } 

    function _min(uint256 a, uint256 b) private pure returns (uint256) {
        return a < b ? a : b;
    }
} 