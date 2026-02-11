// SPDX-License-Identifier:MIT //许可，防止报错

pragma solidity ^0.8.20;
interface IERC20{
    event Transfer(address from,address to,uint256 value);
    event Approval(address owner,address spender,uint256 value);
   
    function totalSupply()external view returns(uint256);
    function balanceOf(address account)external view returns(uint256); //查询余额
    function transfer(address to,uint256 value)external returns(bool); //转账函数
    function allowance(address owner,address spender)external returns(uint256); //查询授权剩余额度
    function approve(address spender,uint256 value)external returns(bool); //授权函数
    function transFrom(address from,address to,uint256 value)external returns(bool); //代付转账


}