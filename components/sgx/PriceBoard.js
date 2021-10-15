/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, useMemo } from 'react';
import { connect } from 'dva';
import styled from 'styled-components';
import { fxPrecision } from '../../utils/utils';
import { ALL_TICKERS, CURRENCY_NAME } from '../../utils/sgx/const';
import { tickerName, tickerToSymbols } from '../../utils/sgx/utils';

// const SPB = styled.div`
//   display: flex;
//   background-color: rgba(0, 0, 0, 0.5);
//   border-radius: 4px;
//   ul {
//     flex: 0 0 112px;
//     padding: 0;
//     li {
//       margin: 0;
//       padding: 8px 12px;
//       &:hover {
//         background-color: rgba(69, 42, 152, 0.8);
//       }
//       &.active-selection {
//         background-color: rgb(69, 42, 152);
//         color: #efb348;
//         font-weight: bolder;
//       }
//     }
//   }
//   & > div {
//     flex: 1;
//   }
//   & > div > div {
//     display: flex;
//     max-height: 490px;
//     overflow-y: scroll;
//     > b {
//       flex: 1;
//       text-align: center;
//       padding: 12px 0;
//     }
//   }
//   table {
//     width: 100%;
//     text-align: center;
//     td,
//     th {
//       padding: 8px;
//     }
//   }
// `;

const CURRENCY_LIST = [
  'all',
  'cny',
  'aud',
  'usd',
  'usdt',
  'pmgt',
  'btc',
  'eth',
  'gbp',
  'hkd',
  'cad',
  'nzd',
  'sgd',
  'eur',
];

const Selector = styled.li`
  > img {
    display: inline-block !important;
    width: 20px;
    max-height: 20px;
    margin-right: 1em;
  }
  cursor: pointer;
`;

const PriceBoard = ({
  dispatch,
  className,
  bolt: { rates },
  getDataBySelf = false,
  currencyList = CURRENCY_LIST,
}) => {
  // const [tickers, setTickers] = useState(ALL_TICKERS);
  const [selected, setSelected] = useState('cny');

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

  const list = useMemo(() => {
    if (selected === 'all') {
      return ALL_TICKERS;
    }
    const filtered = ALL_TICKERS.filter(t =>
      tickerToSymbols(t).includes(selected),
    );
    return filtered;
  }, [selected]);

  return (
    <>
      <ul>
        {currencyList.map(symbol => (
          <Selector
            className={symbol === selected ? 'active-selection' : ''}
            onClick={() => setSelected(symbol)}
            key={symbol}
          >
            <img src={`/icons/${symbol}.svg`} alt={symbol} />
            <span>{CURRENCY_NAME[symbol] || symbol.toUpperCase()}</span>
          </Selector>
        ))}
      </ul>
      <div>
        <div>
          <b>最新价格</b>
          <b>买入价(ASK)</b>
          <b>卖出价(BID)</b>
        </div>
        <div>
          <table className={className}>
            <tbody>
              {list.map(ticker => (
                <tr key={ticker}>
                  <th>{tickerName(ticker)}</th>
                  <td>{showPrice(ticker, 'sell')}</td>
                  <td>{showPrice(ticker, 'buy')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default connect(({ bolt }) => ({
  bolt,
}))(PriceBoard);
