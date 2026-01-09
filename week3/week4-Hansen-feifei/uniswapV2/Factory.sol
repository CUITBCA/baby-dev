// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Pair.sol";

contract Factory {
    mapping(address => mapping(address => address))public getPair;
    address[] public allPairs;
     
    function createPair(address tokenA,address tokenB)external returns(address pair){
        require(tokenA != tokenB,"代币不能相同");
        require(getPair[tokenA][tokenB] == address(0),"池子已存在");
        pair = address(new Pair(tokenA,tokenB));
        getPair[tokenA][tokenB] = pair;
        getPair[tokenB][tokenA] = pair;
        allPairs.push(pair);

    }
    function getPairCount()external view returns (uint256){
        return allPairs.length;
    }
}