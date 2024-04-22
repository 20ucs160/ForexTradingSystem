# Forex API

API for fetching live FX conversion rates, performing currency conversion, and managing user accounts.

## Installation

1. Clone this repository: 

   ```bash
   git clone https://github.com/20ucs160/ForexTradingSystem.git
   
2. Install dependencies:
   cd forex-api
   npm install

3. Set up environment variables:Create a .env file in the root directory of the project with the following content:
   # Forex API configuration
   API_KEY=your_tradermade_api_key

   # Server configuration
   PORT=3000
   Replace your_tradermade_api_key with your TraderMade API key.

4. Running the application
   npm start
   The application will start on http://localhost:3000 by default.

API Endpoints

1. Fetch FX rates
URL: /fx-rates
Method: GET
Description: Fetches live FX conversion rates.
Response: {
  "quoteId": "string",
  "expiry_at": 1234567890,
  "rates": {
    "AED": 3.67,
    "ALL": 109.55,
    ...
  }
}

2. Convert FX
URL: /fx-rates/conversion
Method: POST
Description: Converts the specified amount from one currency to another.
Request: {
  "quoteId": "string",
  "fromCurrency": "USD",
  "toCurrency": "EUR",
  "amount": 100
}
Response: {
  "convertedAmount": 90.53,
  "currency": "EUR"
}

3. Top up account & Get account balance
URL: /accounts/topup
Method: POST
Description: Adds funds to the user's account.
Request: {
  "currency": "USD",
  "amount": 100
}
Response: {
  "message": "Successfully topped up 100 USD"
}
URL: /accounts/balance
Method: GET
Description: Gets the balance of the user's account.
Response: {
  "balances": {
    "USD": 100,
    "EUR": 90.53,
    ...
  }
}
URL: /accounts/balance
Method: GET
Description: Gets the balance of the user's account.
Response: {
  "balances": {
    "USD": 100,
    "EUR": 90.53,
    ...
  }
}

#Technologies Used
NestJS
Axios
NestJS Schedule
Swagger
