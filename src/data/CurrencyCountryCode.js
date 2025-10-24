// data/CurrencyCountryCode.js

/**
 * Mapping: ISO 4217 currency code → “primary” ISO 3166-1 alpha-2 country code
 * Note: For currencies used in multiple countries (like EUR, XAF, XOF, XCD, etc.),
 * this uses a representative country. You may want special logic for those.
 */
export const currencyToCountry = {
  AED: "AE",
  AFN: "AF",
  ALL: "AL",
  AMD: "AM",
  ANG: "NL",   // Netherlands Antilles (historic), but many use “AW” or similar
  AOA: "AO",
  ARS: "AR",
  AUD: "AU",
  AWG: "AW",
  AZN: "AZ",

  BAM: "BA",
  BBD: "BB",
  BDT: "BD",
  BGN: "BG",
  BHD: "BH",
  BIF: "BI",
  BMD: "BM",
  BND: "BN",
  BOB: "BO",
  BRL: "BR",
  BSD: "BS",
  BTN: "BT",
  BWP: "BW",
  BYN: "BY",
  BZD: "BZ",

  CAD: "CA",
  CDF: "CD",
  CHF: "CH",
  CLP: "CL",
  CNY: "CN",
  COP: "CO",
  CRC: "CR",
  CUP: "CU",
  CVE: "CV",
  CZK: "CZ",

  DJF: "DJ",
  DKK: "DK",
  DOP: "DO",
  DZD: "DZ",

  EGP: "EG",
  ERN: "ER",
  ETB: "ET",
  EUR: "EU",    // Representative (Eurozone / European Union)

  FJD: "FJ",
  FKP: "FK",

  GBP: "GB",
  GEL: "GE",
  GHS: "GH",
  GIP: "GI",
  GMD: "GM",
  GNF: "GN",
  GTQ: "GT",
  GYD: "GY",

  HKD: "HK",
  HNL: "HN",
  HRK: "HR",
  HTG: "HT",
  HUF: "HU",

  IDR: "ID",
  ILS: "IL",
  INR: "IN",
  IQD: "IQ",
  IRR: "IR",
  ISK: "IS",

  JMD: "JM",
  JOD: "JO",
  JPY: "JP",

  KES: "KE",
  KGS: "KG",
  KHR: "KH",
  KMF: "KM",
  KRW: "KR",
  KWD: "KW",
  KYD: "KY",
  KZT: "KZ",

  LAK: "LA",
  LBP: "LB",
  LKR: "LK",
  LRD: "LR",
  LSL: "LS",
  LYD: "LY",

  MAD: "MA",
  MDL: "MD",
  MGA: "MG",
  MKD: "MK",
  MMK: "MM",
  MNT: "MN",
  MOP: "MO",
  MRU: "MR",
  MUR: "MU",
  MVR: "MV",
  MWK: "MW",
  MXN: "MX",
  MYR: "MY",
  MZN: "MZ",

  NAD: "NA",
  NGN: "NG",
  NIO: "NI",
  NOK: "NO",
  NPR: "NP",
  NZD: "NZ",

  OMR: "OM",

  PAB: "PA",
  PEN: "PE",
  PGK: "PG",
  PHP: "PH",
  PKR: "PK",
  PLN: "PL",
  PYG: "PY",

  QAR: "QA",

  RON: "RO",
  RSD: "RS",
  RUB: "RU",
  RWF: "RW",

  SAR: "SA",
  SBD: "SB",
  SCR: "SC",
  SDG: "SD",
  SEK: "SE",
  SGD: "SG",
  SHP: "SH",
  SLL: "SL",
  SOS: "SO",
  SRD: "SR",
  SSP: "SS",
  STN: "ST",
  SVC: "SV",
  SYP: "SY",
  SZL: "SZ",

  THB: "TH",
  TJS: "TJ",
  TMT: "TM",
  TND: "TN",
  TOP: "TO",
  TRY: "TR",
  TTD: "TT",
  TWD: "TW",
  TZS: "TZ",

  UAH: "UA",
  UGX: "UG",
  USD: "US",
  UYU: "UY",
  UZS: "UZ",

  VES: "VE",
  VND: "VN",
  VUV: "VU",

  WST: "WS",

  XAF: "CM",   // Central African CFA — used in multiple countries (e.g., Cameroon etc.)
  XCD: "AG",   // East Caribbean dollar — used by many (Antigua & Barbuda as representative)
  XOF: "SN",   // West African CFA — used by multiple countries (Senegal as representative)
  XPF: "PF",   // CFP franc — used in French Pacific territories

  YER: "YE",
  ZAR: "ZA",
  ZMW: "ZM",
  ZWL: "ZW",

  // Special / non-country currencies or funds — you may want to handle these specially
  XAU: "X",    // Gold
  XAG: "X",    // Silver
  XPD: "X",
  XPT: "X",
  XDR: "X",    // IMF special drawing rights
  XXX: "X",    // No currency
  XTS: "X"     // Testing code
};
