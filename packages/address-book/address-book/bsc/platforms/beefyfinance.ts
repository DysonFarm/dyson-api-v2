const devMultisig = '0x44b74ED902e6423B51Bd9e44B6e5646749376943';
const treasuryMultisig = '0x7C780b8A63eE9B7d0F985E8a922Be38a1F7B2141';

export const beefyfinance = {
  devMultisig,
  treasuryMultisig,
  strategyOwner: '0x65CF7E8C0d431f59787D07Fa1A9f8725bbC33F7E',
  vaultOwner: '0xA2E6391486670D2f1519461bcc915E4818aD1c9a',
  keeper: '0x4fED5491693007f0CD49f4614FFC38Ab6A04B619',
  treasurer: treasuryMultisig,
  launchpoolOwner: devMultisig,
  rewardPool: '0x0d5761D9181C7745855FC985f646a842EB254eB9',
  treasury: '0x4A32De8c248533C28904b24B4cFCFE18E9F2ad01',
  beefyFeeRecipient: '0xAb4e8665E7b0E6D83B65b8FF6521E347ca93E4F8',
  multicall: '0xB94858b0bB5437498F5453A16039337e5Fdc269C',
  bifiMaxiStrategy: '0xbCF1e02ac0c45729dC85F290C4A6AB35c4801cB1',
  gasPrice: '0x16cD932c494Ac1B3452d6C8453fB7665aB49EC6b',
  oldBifiMaxiStrategy: '0x87056F5E8Dce0fD71605E6E291C6a3B53cbc3818',
  oldBeefyFeeRecipient: '0xEB41298BA4Ea3865c33bDE8f60eC414421050d53',
  oldRewardPool: '0x453D4Ba9a2D594314DF88564248497F7D74d6b2C',
  oldTimelock: '0x8f0fFc8C7FC3157697Bdbf94B328F7141d6B41de',
  voter: '0x5e1caC103F943Cd84A1E92dAde4145664ebf692A',
  beefyFeeConfig: '0x97F86f2dC863D98e423E288938dF257D1b6e1553',
  vaultFactory: '0xe596eC590DE52C09c8D1C7A1294B32F957A7c94e',
  wrapperFactory: '0x85B792C67cEe281064eb7A3AF0Fe2A76E9a7849e',
} as const;
