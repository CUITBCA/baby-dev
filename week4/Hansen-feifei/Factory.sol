// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Pair.sol";

contract Factory {
    mapping(address => mapping(address => address))public getPair; //储所有已创建的交易池地址，方便遍历查询
    address[] public allPairs;
     
    function createPair(address tokenA,address tokenB)external returns(address pair){
        require(tokenA != tokenB,"代币不能相同"); //两个代币地址不能相同（避免创建无效交易对）
        require(tokenA != address(0) && tokenB != address(0), "代币地址不能为0");
        require(getPair[tokenA][tokenB] == address(0),"池子已存在");
        pair = address(new Pair(tokenA,tokenB));
        getPair[tokenA][tokenB] = pair;
        getPair[tokenB][tokenA] = pair; //存储交易池地址：双向映射（A->B 和 B->A 都指向同一个池）
        allPairs.push(pair);
    }

    function getPairCount()external view returns (uint256){
        return allPairs.length;
    }
    
}