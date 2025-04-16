# mutual_fund

### 🚀 How to Run the UI Application

Step 1:
Navigate to the frontend directory and install dependencies:

cd mutual_fund_broker_ui

npm install

npm run dev

Step 2:
Go to the Register Page, and enter your email and password to create a new account.

Step 3:
Navigate to the Login Page, enter your credentials, and you'll be redirected to the Dashboard where a list of mutual funds is displayed.

Step 4:
Click on a fund card to view its detailed Portfolio page.

Step 5:
Enter the quantity and submit a Buy Order. The transaction will be reflected in your Investment History.

### 🛠 How to Run the Backend Application

Step 1:
Navigate to the backend directory, create a virtual environment, and install dependencies:

cd mutual_fund_broker_backend

python -m venv venv

source venv/bin/activate # Use `venv\Scripts\activate` on Windows

pip install -r requirements.txt

cd app

Step 2:
Create a table named mutualfunds in your PostgreSQL database.

Step 3:
Run the FastAPI server using:

uvicorn main:app --reload
