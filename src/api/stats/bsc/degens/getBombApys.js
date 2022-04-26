const { bscWeb3: web3 } = require('../../../../utils/web3');
const BigNumber = require('bignumber.js');

const RewardPool = require('../../../../abis/fantom/TombRewardPool.json');
const pools = require('../../../../data/degens/bombLpPools.json');
const fetchPrice = require('../../../../utils/fetchPrice');
const { getTotalLpStakedInUsd } = require('../../../../utils/getTotalStakedInUsd');
const { getTradingFeeApr } = require('../../../../utils/getTradingFeeApr');
const { cakeClient } = require('../../../../apollo/client');
import { PCS_LPF } from '../../../../constants';
import { getContractWithProvider } from '../../../../utils/contractHelper';
import getApyBreakdown from '../../common/getApyBreakdown';

const rewardPool = '0x1083926054069AaD75d7238E9B809b0eF9d94e5B';
const oracleId = 'BSHARE';
const oracle = 'tokens';
const DECIMALS = '1e18';

const getBombLpApys = async () => {
  let promises = [];
  pools.forEach(pool => promises.push(getPoolApy(rewardPool, pool)));
  const farmAprs = await Promise.all(promises);

  const pairAddresses = pools.map(pool => pool.address);

  const tradingAprs = await getTradingFeeApr(cakeClient, pairAddresses, PCS_LPF);

  return getApyBreakdown(pools, tradingAprs, farmAprs, PCS_LPF);
};

const getPoolApy = async (rewardPool, pool) => {
  const [yearlyRewardsInUsd, totalStakedInUsd] = await Promise.all([
    getYearlyRewardsInUsd(rewardPool, pool.poolId),
    getTotalLpStakedInUsd(rewardPool, pool, pool.chainId),
  ]);

  return yearlyRewardsInUsd.dividedBy(totalStakedInUsd);
};

const getYearlyRewardsInUsd = async (rewardPool, poolId) => {
  const rewardPoolContract = getContractWithProvider(RewardPool, rewardPool, web3);

  let { allocPoint } = await rewardPoolContract.methods.poolInfo(poolId).call();
  allocPoint = new BigNumber(allocPoint);

  const fromTime = Math.floor(Date.now() / 1000);
  let [secondRewards, totalAllocPoint] = await Promise.all([
    rewardPoolContract.methods.getGeneratedReward(fromTime, fromTime + 1).call(),
    rewardPoolContract.methods.totalAllocPoint().call(),
  ]);

  secondRewards = new BigNumber(secondRewards);
  totalAllocPoint = new BigNumber(totalAllocPoint);

  const secondsPerYear = 31536000;
  const yearlyRewards = secondRewards
    .times(secondsPerYear)
    .times(allocPoint)
    .dividedBy(totalAllocPoint);

  const price = await fetchPrice({ oracle: oracle, id: oracleId });
  const yearlyRewardsInUsd = yearlyRewards.times(price).dividedBy(DECIMALS);

  return yearlyRewardsInUsd;
};

module.exports = getBombLpApys;
