# 姓名：郑骞欢
英文名：Seren

## 部署信息
- **合约地址**:0xf66bE1F52E522151891d5a7bA64456Ac5Ad191A3
- **交易哈希**:0xaaa4988705346a41310412e5bb13d94c93723308374a86cee6f7b7ca07d190dc
- **代币名称**: Kexi
- **代币符号**: ZHENG
- **发行总量**: 1,000,000

## 学习笔记

### 完成的任务
- ✅ 创建EVM地址并安全保存助记词
- ✅ 学习使用 Remix IDE
- ✅ 理解 ERC20 和 ERC721 的区别
- ✅ 获取 Sepolia 测试币
- ✅ 部署 ERC20 合约到 Sepolia 测试网

### 遇到的问题及解决方案
1. **Gas estimation failed**
   - 原因：网络选择错误，误用了主网
   - 解决：切换到 Sepolia 测试网络并获取测试 ETH

2. **合约编译错误**  
   - 原因：OpenZeppelin导入路径和版本兼容问题
   - 解决：使用 GitHub 直接导入 URL 并修正编译器版本

3.**免费测试币领取失败**
  - 原因：Alchemy Sepolia Faucet 需要有少量 ETH；Infura Sepolia 水龙头注册失败
  - 解决：1r在tb买了一个（超级方便快速）

4.**deploy失败**
  - 原因：网络选择错误，误用了主网；勾选了 Verify 
  - 解决：切换测试网络；去掉 Verify

5.**找不到对应的 EVIOMENMENT**
  - 原因：目前不知道真正造成错误的原因，猜测是 remix 和小狐狸不在一个浏览器上
  - 解决：在 Google 上重新开了一个 remix
### 学习收获
- 掌握了智能合约从编写到部署的完整流程
- 理解了测试网络与主网的区别
- 学会了排查常见的合约部署错误
- 学会在 web3.okx 查看余额和交易记录和交易哈希（小狐狸好像对测试网的交易不更新）
- 编译器版本选择

## 合约代码
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// 使用 GitHub 直接导入
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v4.9/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor() ERC20("Kexi", "ZHENG") {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }
}
```

## 致谢
感谢在本次学习过程中提供的指导和帮助！

---感谢 deepseek 和tb店老板
---感谢 0xWeakSheep kizy March 

**作业提交完成时间**：2025年11月
