from fastapi import FastAPI, Query
from typing import List, Optional
import requests

app = FastAPI()


API_URL = "https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=aV5bGA6mpU270lg6UvuX8FLDak4BhElS"

def fetch_data():
    response = requests.get(API_URL)
    if response.status_code == 200:
        return response.json()
    return []

def filter_data(data, start_year: Optional[int] = None, end_year: Optional[int] = None, 
                min_revenue: Optional[int] = None, max_revenue: Optional[int] = None, 
                min_net_income: Optional[int] = None, max_net_income: Optional[int] = None):
    filtered_data = data

    if start_year and end_year:
        filtered_data = [item for item in filtered_data if start_year <= int(item['date'][:4]) <= end_year]

    if min_revenue is not None and max_revenue is not None:
        filtered_data = [item for item in filtered_data if min_revenue <= item['revenue'] <= max_revenue]

    if min_net_income is not None and max_net_income is not None:
        filtered_data = [item for item in filtered_data if min_net_income <= item['netIncome'] <= max_net_income]

    return filtered_data


def sort_data(data, sort_by: Optional[str] = None, order: Optional[str] = "asc"):
    if sort_by:
        reverse_order = (order == "desc")
        if sort_by in ['date', 'revenue', 'netIncome']:
            data.sort(key=lambda x: x[sort_by], reverse=reverse_order)
    return data

@app.get("/income-statements")
def get_income_statements(
    start_year: Optional[int] = Query(None, description="Start year for filtering"),
    end_year: Optional[int] = Query(None, description="End year for filtering"),
    min_revenue: Optional[int] = Query(None, description="Minimum revenue for filtering"),
    max_revenue: Optional[int] = Query(None, description="Maximum revenue for filtering"),
    min_net_income: Optional[int] = Query(None, description="Minimum net income for filtering"),
    max_net_income: Optional[int] = Query(None, description="Maximum net income for filtering"),
    sort_by: Optional[str] = Query(None, description="Sort by 'date', 'revenue', or 'netIncome'"),
    order: Optional[str] = Query("asc", description="Order of sorting: 'asc' or 'desc'")
):
    
    data = fetch_data()

    filtered_data = filter_data(
        data, start_year, end_year, min_revenue, max_revenue, min_net_income, max_net_income
    )

    sorted_data = sort_data(filtered_data, sort_by, order)

    return sorted_data