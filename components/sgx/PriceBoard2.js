import React, { useEffect, useState, useMemo } from 'react';
import { connect } from 'dva';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import { fxPrecision } from '../../utils/utils';
import { ALL_TICKERS } from '../../utils/sgx/const';
import { tickerToSymbols } from '../../utils/sgx/utils';
import TickerWithLogo from '../TickerWithLogo';

const CRYPTO_LIST = ['usdt', 'pmgt', 'btc', 'eth'];

// const FIAT_LIST = [
//   'cny',
//   'aud',
//   'usd',
//   'gbp',
//   'hkd',
//   'cad',
//   'nzd',
//   'sgd',
//   'eur',
// ];

const Expand = styled.button`
  width: 8em;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0);
  border: none;
  cursor: pointer;
  outline: none;
  color: #efb348;
  padding: 8px;
  display: flex;
  align-items: color-interpolation-filters;
  > svg {
    display: inline !important;
    width: 1em;
    margin-top: 0.3em;
    margin-right: 0.6em;
    transform: rotate(${props => (props.expanded ? 180 : 0)}deg);
    transition: transform 0.3s ease-in-out;
  }
`;

const List = ({ list = [], showPrice }) => {
  const showExpandButton = useMemo(() => list.length > 8, [list]);
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <Thead>
        <div>最新价格</div>
        <div>买入价(ASK)</div>
        <div>卖出价(BID)</div>
      </Thead>
      <Table length={list.length} expanded={expanded}>
        {list.map(ticker => (
          <TRow key={ticker}>
            <div>
              <b>
                <TickerWithLogo ticker={ticker} />
              </b>
            </div>
            <div>{showPrice(ticker, 'sell')}</div>
            <div>{showPrice(ticker, 'buy')}</div>
          </TRow>
        ))}
      </Table>
      {showExpandButton && (
        <Expand
          expanded={expanded}
          onClick={() => setExpanded(prev => !prev)}
          type="button"
        >
          <svg x="0px" y="0px" viewBox="0 0 256 256">
            <polygon
              fill="#efb348"
              points="225.813,48.907 128,146.72 30.187,48.907 0,79.093 128,207.093 256,79.093"
            />
          </svg>
          {expanded ? '收起' : '展开全部'}
        </Expand>
      )}
    </div>
  );
};

const SPB = styled.div`
  display: flex;
  & > div {
    flex: 1;
    margin: 0 1em;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 4px;
  }
`;

const Table = styled.section`
  width: 100%;
  height: ${props =>
    props.expanded ? `${props.length * 38.25}px` : `${38.25 * 8}px`};
  transition: ${props => `height ${0.01 * props.length}s ease-in-out`};
  overflow-y: scroll;
`;

const TRow = styled.section`
  display: flex;
  width: 100%;
  > div {
    flex: 1;
    padding: 8px;
    color: #fff;
    text-align: center;
    &:first-of-type {
      flex: 0 0 160px;
    }
  }
`;

const Thead = styled(TRow)`
  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #efb348;
    font-weight: bolder;
  }
`;

const cryptoList = [];
const fiatList = [];

// const StyledTicker

ALL_TICKERS.forEach(ticker => {
  const [currency1, currency2] = tickerToSymbols(ticker);
  if (CRYPTO_LIST.includes(currency1) || CRYPTO_LIST.includes(currency2)) {
    cryptoList.push(ticker);
  } else {
    fiatList.push(ticker);
  }
});

const PriceBoard = ({ dispatch, bolt: { rates }, getDataBySelf = false }) => {
  const isSmallScreen = useMediaQuery({ query: '(max-width: 700px)' });
  // const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });
  // const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' });

  const showPrice = (ticker, side) =>
    ticker in rates
      ? +rates[ticker].quote[`${side}Price`].price.toFixed(fxPrecision(ticker))
      : '--';

  useEffect(() => {
    const getRates = ticker => {
      dispatch({
        type: 'bolt/getBoltRate',
        ticker,
      });
    };
    let timer;
    if (getDataBySelf) {
      ALL_TICKERS.forEach(getRates);
      timer = setInterval(() => {
        // 重载汇率数据
        ALL_TICKERS.forEach(getRates);
      }, 60000);
    }

    return () => {
      if (getDataBySelf) {
        clearInterval(timer);
      }
    };
  }, [dispatch, getDataBySelf]);

  return (
    <SPB>
      {isSmallScreen ? (
        <List showPrice={showPrice} list={ALL_TICKERS} />
      ) : (
        <>
          <List showPrice={showPrice} list={fiatList} />
          <List showPrice={showPrice} list={cryptoList} />
        </>
      )}
    </SPB>
  );
};

export default connect(({ bolt }) => ({
  bolt,
}))(PriceBoard);
