import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { fxPrecision } from '../../utils/utils';
import { ALL_TICKERS } from '../../utils/sgx/const';
import { tickerToSymbols } from '../../utils/sgx/utils';
import { updatedTime } from '../../utils/timeUtils';
import TickerWithLogo from '../TickerWithLogo';
import { Thead, Table, TRow, Expand, StyledBoard, Time } from './styles';

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

const List = ({ list = [], showPrice }) => {
  const ref = useRef(null);
  const showExpandButton = useMemo(() => list.length > 8, [list]);
  const [expanded, setExpanded] = useState(false);
  // console.o(ref.current ? ref.current.scrollHeight : 0, 'ref');
  return (
    <div>
      <Thead>
        <div>最新价格</div>
        <div>买入价(ASK)</div>
        <div>卖出价(BID)</div>
      </Thead>
      <Table ref={ref} length={list.length} expanded={expanded}>
        {list.map(ticker => (
          <TRow key={ticker}>
            <div>
              <b>
                <TickerWithLogo showExplanation ticker={ticker} />
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

const PriceBoard = ({
  dispatch,
  bolt: { rates },
  getDataBySelf = false,
  interval = 60, // ? frequency of fetching data in seconds
}) => {
  const isSmallScreen = useMediaQuery({ query: '(max-width: 700px)' });
  // const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });
  // const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' });

  // console.log(`%creact-responsive `, 'background: #FF9800; color: #FFFDE7', {
  //   isSmallScreen,
  // });

  const [updatedAt, setUpdatedAt] = useState(new Date());
  const showPrice = (ticker, side) => {
    const sidePrice = `${side}Price`;
    return ticker in rates
      ? rates[ticker].quote[sidePrice].price.toFixed(fxPrecision(ticker))
      : '--';
  };

  useEffect(() => {
    const getRates = ticker => {
      const payload = {
        queryParams: { ticker },
      };

      dispatch({
        type: 'bolt/getBoltRate',
        payload,
      });
    };

    let timer;
    if (getDataBySelf) {
      ALL_TICKERS.forEach(getRates);
      timer = setInterval(() => {
        // 重载汇率数据
        ALL_TICKERS.forEach(getRates);
        setUpdatedAt(new Date());
      }, interval * 1000);
    }

    return () => {
      if (getDataBySelf) {
        clearInterval(timer);
      }
    };
  }, [dispatch, getDataBySelf, interval]);

  return (
    <>
      <Time>{updatedTime(updatedAt)}</Time>
      <StyledBoard>
        {isSmallScreen ? (
          <List showPrice={showPrice} list={fiatList} />
        ) : (
          <>
            <List showPrice={showPrice} list={fiatList} />
          </>
        )}
      </StyledBoard>
    </>
  );
};

export default connect(({ bolt }) => ({
  bolt,
}))(PriceBoard);
