// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./IERC20.sol"; 

contract ERC20 is IERC20 {
    string public name;    
    string public symbol;  
    uint8 public decimals = 18; 
    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf; 
    mapping(address => mapping(address => uint256)) public allowance;

    constructor(string memory _name,string memory _symbol,uint256 _totalSupply){
        name = _name;
        symbol = _symbol;
        totalSupply = _totalSupply*(10**uint256(decimals));
        balanceOf[msg.sender]=totalSupply;
    }
    function transfer(address to,uint256 value)external returns(bool){
        require(balanceOf[msg.sender] >= value,"余额不够");
        require(to != address(0),"不能转给0地址");
        balanceOf[msg.sender]-=value;
        balanceOf[to] += value;
        emit Transfer(msg.sender,to,value);
        return true;
    }
    function approve(address spender,uint256 value)external returns(bool){
        allowance[msg.sender][spender]=value;
        emit Approval(msg.sender,spender,value);
        return true;
    }
    function transferFrom(address from,address to,uint256 value)external returns(bool){
        require(allowance[from][msg.sender]>=value,"授权不够");
        require(balanceOf[from] >= value,"from 余额不够");
        balanceOf[from] -= value;
        balanceOf[to] += value;
        allowance[from][msg.sender] -= value;
        emit Transfer(from,to,value);
        return true;
    }
}
