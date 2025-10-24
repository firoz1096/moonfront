import  { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Select from "react-select";
import { IoSwapHorizontal } from "react-icons/io5";
import { currencyToCountry } from '../data/CurrencyCountryCode';
import { currencyToCountryName } from '../data/currencyToCountryName';
import { currencySymbols } from '../data/currencySymbols';

// Flag URL
const getFlagUrl = (currency) => {
  const countryCode = currencyToCountry[currency];
  if (!countryCode) return null;
  return `https://flagcdn.com/24x18/${countryCode.toLowerCase()}.png`;
};

// Custom option component with cursor
const Option = ({ innerProps, data }) => (
  <div
    {...innerProps}
    style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "5px 10px",
      cursor: "pointer",
    }}
  >
    {data.flag && <img src={data.flag} alt={data.label} style={{ width: "24px", height: "18px" }} />}
    <span>{data.label} - {data.countryName}</span>
  </div>
);

export default function CurrencyExchange() {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState(null);
  const [toCurrency, setToCurrency] = useState(null);
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(null);
  const [loadingCurrencies, setLoadingCurrencies] = useState(true);
  const [loadingConversion, setLoadingConversion] = useState(false);
  const [animate, setAnimate] = useState(false);

  // Fetch currency list
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const res = await axios.get("https://open.er-api.com/v6/latest/USD");
        if (res.data && res.data.rates) {
          const keys = Object.keys(res.data.rates).sort();
          const options = keys.map((cur) => ({
            value: cur,
            label: cur,
            flag: getFlagUrl(cur),
            countryName: currencyToCountryName[cur] || "",
          }));
          setCurrencies(options);
          setFromCurrency(options.find((o) => o.value === "USD"));
          setToCurrency(options.find((o) => o.value === "INR"));
        } else {
          console.error("⚠️ No rates found in API response");
        }
      } catch (err) {
        console.error("❌ Error fetching currencies:", err);
      } finally {
        setLoadingCurrencies(false);
      }
    };
    fetchCurrencies();
  }, []);

  // Conversion function
  const convert = useCallback(
    async (base = fromCurrency?.value, target = toCurrency?.value, amt = amount) => {
      if (!base || !target || amt <= 0) return;
      setLoadingConversion(true);
      try {
        const res = await axios.get(`https://open.er-api.com/v6/latest/${base}`);
        if (res.data && res.data.rates) {
          const rate = res.data.rates[target];
          setResult((amt * rate).toFixed(2));
        }
      } catch (err) {
        console.error("❌ Conversion error:", err);
        setResult(null);
      } finally {
        setLoadingConversion(false);
      }
    },
    [fromCurrency, toCurrency, amount]
  );

  // Animate result on change
  useEffect(() => {
    if (result) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 300);
      return () => clearTimeout(timer);
    }
  }, [result]);

  // Auto-convert when currencies or amount change
  useEffect(() => {
    convert();
  }, [fromCurrency, toCurrency, amount, convert]);

  // Swap currencies
  const handleSwap = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
    convert(toCurrency.value, fromCurrency.value, amount);
  };

  // Custom search by code or country name
  const filterOption = (option, inputValue) => {
    const { label, countryName } = option.data;
    return (
      label.toLowerCase().includes(inputValue.toLowerCase()) ||
      (countryName && countryName.toLowerCase().includes(inputValue.toLowerCase()))
    );
  };

  return (
   <> 
      <h3 className="text-center">Currency Converter</h3>
      <p className="text-center text-muted">Check live foreign currency exchange rates</p>

      <div className="row align-items-end mb-3">

        
        {/* Amount with currency symbol */}

        
        {/* From */}
        <div className="col-md-5 mb-3">
          <label className="form-label">From</label>
          <Select
            options={currencies}
            value={fromCurrency}
            onChange={setFromCurrency}
            isLoading={loadingCurrencies}
            components={{ Option }}
            filterOption={filterOption}
            placeholder="Select currency..."
          />
        </div>

        {/* Swap Button */}
        <div className="col-md-2 mb-3 text-center">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={handleSwap}
            disabled={loadingCurrencies}
            title="Swap currencies"
            style={{ fontSize: "20px" }}
          >
           <IoSwapHorizontal/>
          </button>
        </div>

        {/* To */}
        <div className="col-md-5 mb-3">
          <label className="form-label">To</label>
          <Select
            options={currencies}
            value={toCurrency}
            onChange={setToCurrency}
            isLoading={loadingCurrencies}
            components={{ Option }}
            filterOption={filterOption}
            placeholder="Select currency..."
          />
        </div>

          <div className="col-md-12 mb-3">
          <label className="form-label">Amount</label>
          <div className="input-group">
            <span className="input-group-text">
              {fromCurrency ? currencySymbols[fromCurrency.value] || "" : ""}
            </span>
            <input
              type="number"
              className="form-control"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>

      </div>

      {/* Result with flags and animation */}
      <div className="text-center mt-3">
        {loadingConversion ? (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Converting...</span>
          </div>
        ) : result ? (
          <div className="alert alert-success d-flex justify-content-center align-items-center gap-2 flex-wrap">
            <span className={`converted-amount ${animate ? "change" : ""}`} key={result}>
              {amount}{" "}
              {fromCurrency?.flag && <img src={fromCurrency.flag} alt={fromCurrency.label} style={{ width: "24px", height: "18px" }} />}{" "}
              {fromCurrency?.label} = {result}{" "}
              {toCurrency?.flag && <img src={toCurrency.flag} alt={toCurrency.label} style={{ width: "24px", height: "18px" }} />}{" "}
              {toCurrency?.label}
            </span>
          </div>
        ) : null}
      </div>
   </>
  );
}
