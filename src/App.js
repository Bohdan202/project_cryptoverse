import {useState, useEffect} from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';

import { Exchanges, Homepage, News, Cryptocurrencies, CryptoDetails, Navbar } from './components';
import './App.css';


const App = () => {

  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(1);
  const [currency1, setCurrency1] = useState('USD');
  const [currency2, setCurrency2] = useState('EUR');

  useEffect(() => {
    console.log("test1");
    var myHeaders = new Headers();
    myHeaders.append("apikey", "Dd4b0NdT0aP8hf9NW0fGyZREr5Kudapz");

    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders
    };

    fetch("https://api.apilayer.com/exchangerates_data/latest?base=USD", requestOptions)
    .then(response => response.text())
    .then(result =>  console.log((JSON.parse(result).rates)))
    .catch(error => console.log('error', error))

  }, []);

  


  useEffect(() => {
    
    if (!!rates) {
      function init() {
        handleAmount1Change(1);
      }
      init();
    }
  }, [rates]);


  function format(number) {
    return number.toFixed(4);
  }

  function handleAmount1Change(amount1) {
    setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
    setAmount1(amount1);
  }

  function handleCurrency1Change(currency1) {
    setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
    setCurrency1(currency1);
  }

  function handleAmount2Change(amount2) {
    setAmount1(format(amount2 * rates[currency1] / rates[currency2]));
    setAmount2(amount2);
  }

  function handleCurrency2Change(currency2) {
    setAmount1(format(amount2 * rates[currency1] / rates[currency2]));
    setCurrency2(currency2);
  }
  
  return(
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Switch>
              <Route exact path="/">
                <Homepage />
              </Route>
              <Route exact path="/exchanges">
                <div className="exchanges-section">
                  <h1 className="exchanges-title">Currency exchanges</h1>
                  <h2 className="exchanges-subtitle">*Currency updates twice a day</h2>
                  <div className="exchanges-elements">
                    <div className="currency-table">
                      <table className="content-table">
                        <thead>
                          <tr>
                            <th>Currency value</th>
                            <th></th>
                            <th></th>
                            <th className="table-currentDate">29/06/2022</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th>Currency</th>
                            <th></th>
                            <th>Buy</th>
                            <th>Sell</th>
                          </tr>
                          <tr className="USD">
                            <td>
                              <img src="http://www.geonames.org/flags/l/us.gif" />USD
                            </td>
                            <td></td>
                            <td className="center">29.50</td>
                            <td className="center">29.75</td>
                          </tr>
                          <tr className="EUR">
                            <td>
                              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg" />EUR
                            </td>
                            <td></td>
                            <td className="center">31.04</td>
                            <td className="center">31.35</td>
                          </tr>
                          <tr className="PLN">
                            <td>
                              <img src="http://www.geonames.org/flags/l/pl.gif"/>PLN
                            </td>
                            <td></td>
                            <td className="center">6.62</td>
                            <td className="center">6.85</td>
                          </tr>
                          <tr className="RUB">
                            <td>
                              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg/640px-Flag_of_the_United_Kingdom_%283-5%29.svg.png"/>GBP
                            </td>
                            <td></td>
                            <td className="center">35.88</td>
                            <td className="center">35.96</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="currency-converter">
                      <h2 className="currency-converter_title">CURRENCY CONVERTER</h2>
                      <hr className="converter-hr"/>
                      <h3 className="currency-equivalent">{amount1}{currency1} is equivalent to</h3>
                      <h1 className="currency-equivalent_value">{amount2}{currency2}</h1>
                      <h5 className="currency-date">As of 2021-06-29</h5>
                      <div className="exchanges-group">
                        <Exchanges 
                          onAmountChange={handleAmount1Change}
                          onCurrencyChange={handleCurrency1Change}
                          currencies={Object.keys(rates)}
                          amount={amount1}
                          currency={currency1}
                        />
                        <Exchanges 
                          onAmountChange={handleAmount2Change}
                          onCurrencyChange={handleCurrency2Change}
                          currencies={Object.keys(rates)}
                          amount={amount2}
                          currency={currency2}
                        />
                      </div>
                    </div>
                  </div>
                  <p className="exchange-descriptions">
                    Currency converter online in Ukraine from Currencyverse is offered to the attention of site visitors. The site team has developed a convenient and simple currency calculator that will help you quickly and correctly convert any currency. Moreover, thanks to the base exchange rates of all banks, you can calculate the value of the currency in a particular bank. To do this, enter the amount, select the bank name and currency. Our converter allows you to calculate the cost of buying and selling the US dollar, euro, Russian or Belarusian ruble, Danish krone, Turkish lira, Japanese yen and other world currencies.
                    Information on bank exchange rates is updated daily after 10 o'clock. Therefore, all calculations on the converter are relevant. With the help of our service you can easily transfer one currency to another, find out how many hryvnias you need to buy a certain amount of currency and vice versa. Therefore, analyze your costs for buying / selling national or foreign currencies, choose the most favorable bank rates.
                  </p>
                </div>
              </Route>
              <Route exact path="/cryptocurrencies">
                <Cryptocurrencies />
              </Route>
              <Route exact path="/crypto/:coinId">
                <CryptoDetails />
              </Route>
              <Route exact path="/news">
                <News />
              </Route>
            </Switch>
          </div>
        </Layout>
        <div className="footer">
          <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>Created by Nikitchuk © 2022
            <Link to="/">
              Currencyverse Inc.
            </Link> <br />
            All Rights Reserved.
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/news">News</Link>
          </Space>
        </div>
      </div>
    </div>
  )
};

export default App;
