# Forex API

## Description

This is a RESTful API for foreign exchange (forex) transactions. It provides endpoints to fetch live FX conversion rates, convert currencies, top up user accounts, and get account balances.

## API Endpoints

1. **Fetch FX rates**
   - **URL:** `/fx-rates`
   - **Method:** `GET`
   - **Description:** Fetches live FX conversion rates.
   - **Response:**
     ```
     {
       "quoteId": "string",
       "expiry_at": 1234567890,
       "rates": {
         "AED": 3.67,
         "ALL": 109.55,
         ...
       }
     }
     ```

2. **Convert FX**
   - **URL:** `/fx-rates/conversion`
   - **Method:** `POST`
   - **Description:** Converts the specified amount from one currency to another.
   - **Request:**
     ```
     {
       "quoteId": "string",
       "fromCurrency": "USD",
       "toCurrency": "EUR",
       "amount": 100
     }
     ```
   - **Response:**
     ```
     {
       "convertedAmount": 90.53,
       "currency": "EUR"
     }
     ```

3. **Top up account**
   - **URL:** `/accounts/topup`
   - **Method:** `POST`
   - **Description:** Adds funds to the user's account.
   - **Request:**
     ```
     {
       "currency": "USD",
       "amount": 100
     }
     ```
   - **Response:**
     ```
     {
       "message": "Successfully topped up 100 USD"
     }
     ```

4. **Get account balance**
   - **URL:** `/accounts/balance`
   - **Method:** `GET`
   - **Description:** Gets the balance of the user's account.
   - **Response:**
     ```
     {
       "balances": {
         "USD": 100,
         "EUR": 90.53,
         ...
       }
     }
     ```

## Setting up and running the application:

1. Clone this repository:
   ```bash
   git clone https://github.com/20ucs160/ForexTradingSystem

2. Navigate to the project directory:
   ```bash
   cd <project_directory>
3. Install dependencies:
   ```bash
   npm install
4. Start the application:
   ```bash
   npm run start:dev
5. Access the application at `http://localhost:3000`
   
