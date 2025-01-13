
# 📊 Financial Data Filtering App

A responsive web application built with **React** and **TailwindCSS** that allows users to fetch, filter, and analyze Apple Inc.'s annual income statements. The app fetches financial data from the **Financial Modeling Prep API** and presents key financial metrics such as revenue, net income, gross profit, and earnings per share (EPS). Users can easily filter data based on date range, revenue, and net income, and sort the table to view data in ascending or descending order.

## 🔑 Features:
- **Data Fetching**: Retrieve annual income statements for AAPL (Apple Inc.) via API.
- **Interactive Filtering**:
  - Filter data by date range (e.g., 2020–2024).
  - Filter data by revenue and net income range.
- **Sorting**:
  - Sort data by date, revenue, and net income (ascending/descending).
- **Responsive Design**: The app is mobile-friendly and looks great on both desktop and mobile devices.
- **Optional Backend (Flask/FastAPI)**: Support for server-side filtering and sorting.

## 🛠️ Technologies Used:
- **Frontend**: React (JavaScript), TailwindCSS
- **Backend (Optional)**: Flask or FastAPI (for server-side filtering)
- **Deployment**: Easily deployable to Vercel, Netlify, or AWS.

## 🚀 Demo:
Check out the deployed version here: [Deployed App Link](https://financial-data-filtering-app-eight.vercel.app/).

## 💻 Getting Started

### Prerequisites:
- Node.js installed on your local machine.
- API key from Financial Modeling Prep. [Get a free API key here](https://financialmodelingprep.com).

### Installation:

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/financial-data-app.git
   cd financial-data-app
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Add your **Financial Modeling Prep API Key**:
   - Create a `.env` file in the root directory and add:
     \`\`\`bash
     REACT_APP_API_KEY=your_api_key
     \`\`\`

4. Run the app locally:
   \`\`\`bash
   npm start
   \`\`\`

The app will be available at `http://localhost:3000`.

### Backend (Optional):

To use a Flask/FastAPI backend for filtering and sorting:

1. Navigate to the `backend/` directory:
   \`\`\`bash
   cd backend
   \`\`\`

2. Install Python dependencies:
   \`\`\`bash
   pip install -r requirements.txt
   \`\`\`

3. Run the backend server:
   \`\`\`bash
   flask run   # For Flask
   uvicorn app:app --reload   # For FastAPI
   \`\`\`

## 📝 License:
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
