import json

file_path = 'app/constants/Latest_NAV_Data.txt'

def read_fund_data():
    try:
        with open(file_path, 'r') as file:
            fund_data = json.load(file)
            return fund_data
    except FileNotFoundError:
        print(f"Error: The file {file_path} was not found.")
        return None
    except json.JSONDecodeError:
        print("Error: Failed to decode JSON from the file.")
        return None

# Specify the path to your text file




