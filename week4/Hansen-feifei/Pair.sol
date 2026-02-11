// SPDX-License-Identifier:MIT

pragma solidity ^0.8.20;

import "./IERC20.sol";
import "./ERC20.sol";

contract Pair is ERC20{
    address public token0;
    address public token1;
    uint256 public reserve0;
    uint256 public reserve1;


     uint256 public constant FEE_RATE = 3;
    uint256 public constant FEE_DENOMINATOR = 1000;  //手续费，按3/1000算
    event Swap(address indexed sender,uint256 amount0In,uint256 amount1Out,uint256 fee0);  //记录swap交易
    event AddLiquidity(address indexed sender,uint256 amount0,uint256 amount1,uint256 lpMinted);  //记录增加流动性

    constructor(address _token0,address _token1)ERC20("LP代币","LP","0"){
        require(_token != address(0) && _token1 != address(0),"代币地址不能为0");
        token0 = _token0;
        token1 = _token1;

    }
    function _update()private{
        reserve0 = IREC20(token0).balanceOf(address(this));
        reserve1 = IERC20(token1).balanceOf(address(this));

    }
    function addLiquidity(uint256 amount0,uint 256 amount1)external returns (uint256 lp){
        require(amount0 > 0 && amount > 0,"金额不能为零");
        IERC20(token0).transferFrom(msg.sender,address(this),amount0);
        IERC20(token1).transferFrom(msg.sender,address(this),amount1);
        _update();
        if(totalSupply == 0){
            lp = _sqrt(amount0 * amount1);
        }else{
            lp = _min((amount0 * totalSupply)/reserve0,(amount1 * totalSupply) / reserve1);

        }
        require(lp>0,"铸造LP代币为0");
        balanceOf[msg.sender] += lp;
        totalSupply += lp;
        emit AddLiquidity(msg.sender,amount0,amount1,lp);
    }
    function swap(uint256 amount0In)external returns (uint256 amount1Out){
        require(amount0In > 0,"入币金额不能为零");
        IERC20(token0).transferFrom(msg.sender,address(this).amount0In);
        uint256 fee0=(amount0In * FEE_RATE)/FEE_DENOMINATOR;
        uint256 amount0InAfterFee = amount0In - fee0;
        _update();
        amount1Out = (amount0InAfterFee * reserve1)/(reserve0 + amount0InAfterFee);
        require(amount1Out > 0,"出币金额为零");
        require(amount1Out <= reserve1,"交易池余额不足");
        IERC20(token1).transfer(msg.sender,amount1Out);
        _update();
        emit Swap(msg.sender,amount0In,amount1Out,fee0);
    }
    // 反向swap
    function swap1For0(uint256 amount1In) external returns (uint256 amount0Out) {
        require(amount1In > 0, "入币金额不能为0");
        IERC20(token1).transferFrom(msg.sender, address(this), amount1In);

        uint256 fee1 = (amount1In * FEE_RATE) / FEE_DENOMINATOR;
        uint256 amount1InAfterFee = amount1In - fee1;

        _update();
        amount0Out = (amount1InAfterFee * reserve0) / (reserve1 + amount1InAfterFee);
        require(amount0Out > 0, "出币金额为0");
        require(amount0Out <= reserve0, "交易池余额不足");

        IERC20(token0).transfer(msg.sender, amount0Out);
        _update();

        emit Swap(msg.sender, amount1In, amount0Out, fee1);
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

    // 查询交易池当前总储备
    function getReserves() external view returns (uint256, uint256) {
        return (reserve0, reserve1);
    }
}