/// simple solution for now
const pools = require('../../../data/arbitrum/zyberLpPools.json');

const ZYBER_ETHERNAL_FARMING_APR =
  'https://apiv3.zyberswap.io/api/APR/eternalFarmings/?network=zyberswap_arbitrum';
const ZYBER_POOL_APR = 'https://apiv3.zyberswap.io/api/APR/pools/?network=zyberswap_arbitrum';

const getZyberArbitrumApys = async () => {
  const farmApr = await (await fetch(ZYBER_ETHERNAL_FARMING_APR)).json();
  const poolApr = await (await fetch(ZYBER_POOL_APR)).json();
  const result = [];
  console.log('farmApr', poolApr);
  pools.map(pool => {
    result.push({
      name: pool.name,
      poolApr: poolApr[pool.address],
      farmApr: farmApr[pool.poolId],
    });
  });

  return result;
};

module.exports = { getZyberArbitrumApys };
