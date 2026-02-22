// Replace with deployed addresses after running deploy script
export const VAULT_ADDRESS = "0x0B306BF915C4d645ff596e518fAf3F9669b97016";
export const WDOT_ADDRESS = "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318";
export const USDC_ADDRESS = "0x610178dA211FEF7D417bC0e6FeD39F05609AD788";
export const SCORER_ADDRESS = "0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82";
export const FORWARDER_ADDRESS = "0x959922bE3CAee4b8Cd9a407cc3ac1C251C2007B1";
export const REBALANCE_EXECUTOR_ADDRESS = "0x9A676e781A523b5d0C0e43731313A708CB607508";
export const XCM_YIELD_READER_ADDRESS = "0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e";
export const DOT_PRICE_ORACLE_ADDRESS = "0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0";

export const VAULT_ABI = [
    "constructor(address _asset, string _name, string _symbol, address _scorer, address _rebalanceExecutor)",
    "error ERC20InsufficientAllowance(address spender, uint256 allowance, uint256 needed)",
    "error ERC20InsufficientBalance(address sender, uint256 balance, uint256 needed)",
    "error ERC20InvalidApprover(address approver)",
    "error ERC20InvalidReceiver(address receiver)",
    "error ERC20InvalidSender(address sender)",
    "error ERC20InvalidSpender(address spender)",
    "error ERC4626ExceededMaxDeposit(address receiver, uint256 assets, uint256 max)",
    "error ERC4626ExceededMaxMint(address receiver, uint256 shares, uint256 max)",
    "error ERC4626ExceededMaxRedeem(address owner, uint256 shares, uint256 max)",
    "error ERC4626ExceededMaxWithdraw(address owner, uint256 assets, uint256 max)",
    "error OwnableInvalidOwner(address owner)",
    "error OwnableUnauthorizedAccount(address account)",
    "error ReentrancyGuardReentrantCall()",
    "error SafeERC20FailedOperation(address token)",
    "event Approval(address indexed owner, address indexed spender, uint256 value)",
    "event Deposit(address indexed sender, address indexed owner, uint256 assets, uint256 shares)",
    "event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)",
    "event Rebalanced(uint8 indexed strategy, uint256 score, uint256 timestamp)",
    "event Transfer(address indexed from, address indexed to, uint256 value)",
    "event Withdraw(address indexed sender, address indexed receiver, address indexed owner, uint256 assets, uint256 shares)",
    "function REBALANCE_INTERVAL() view returns (uint256)",
    "function REBALANCE_THRESHOLD() view returns (uint256)",
    "function allowance(address owner, address spender) view returns (uint256)",
    "function approve(address spender, uint256 value) returns (bool)",
    "function asset() view returns (address)",
    "function balanceOf(address account) view returns (uint256)",
    "function convertToAssets(uint256 shares) view returns (uint256)",
    "function convertToShares(uint256 assets) view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function deposit(uint256 assets, address receiver) returns (uint256)",
    "function lastRebalance() view returns (uint256)",
    "function maxDeposit(address) view returns (uint256)",
    "function maxMint(address) view returns (uint256)",
    "function maxRedeem(address owner) view returns (uint256)",
    "function maxWithdraw(address owner) view returns (uint256)",
    "function mint(uint256 shares, address receiver) returns (uint256)",
    "function name() view returns (string)",
    "function owner() view returns (address)",
    "function previewDeposit(uint256 assets) view returns (uint256)",
    "function previewMint(uint256 shares) view returns (uint256)",
    "function previewRedeem(uint256 shares) view returns (uint256)",
    "function previewWithdraw(uint256 assets) view returns (uint256)",
    "function redeem(uint256 shares, address receiver, address owner) returns (uint256)",
    "function renounceOwnership()",
    "function scorer() view returns (address)",
    "function symbol() view returns (string)",
    "function totalAssets() view returns (uint256)",
    "function totalSupply() view returns (uint256)",
    "function transfer(address to, uint256 value) returns (bool)",
    "function transferFrom(address from, address to, uint256 value) returns (bool)",
    "function transferOwnership(address newOwner)",
    "function triggerRebalance()",
    "function withdraw(uint256 assets, address receiver, address owner) returns (uint256)"
];

export const AISCORER_ABI = [
    "constructor(address _xcmReader, address _dotPriceOracle)",
    "event WeightsUpdated(uint256 wVdot, uint256 wDot, uint256 wUsdc)",
    "function dotPriceOracle() view returns (address)",
    "function getBestStrategy() view returns (uint8 strategy, uint256 score)",
    "function governance() view returns (address)",
    "function liquidityRiskCoeff() view returns (uint256)",
    "function setGovernance(address _newGov)",
    "function setWeights(uint256 _wVdot, uint256 _wDot, uint256 _wUsdc)",
    "function volatilityPenaltyCoeff() view returns (uint256)",
    "function w_dot() view returns (uint256)",
    "function w_usdc() view returns (uint256)",
    "function w_vdot() view returns (uint256)",
    "function xcmReader() view returns (address)"
];

export const ERC20_ABI = [
    "event Approval(address indexed owner, address indexed spender, uint256 value)",
    "event Transfer(address indexed from, address indexed to, uint256 value)",
    "function allowance(address owner, address spender) view returns (uint256)",
    "function approve(address spender, uint256 value) returns (bool)",
    "function balanceOf(address account) view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function transfer(address to, uint256 value) returns (bool)",
    "function transferFrom(address from, address to, uint256 value) returns (bool)"
];