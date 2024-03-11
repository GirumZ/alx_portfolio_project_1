#!/usr/bin/python3
""" A python program to migrate data from a csv file to a mysql database"""


import csv
import mysql.connector

def csv_to_mysql(csv_file, host, database, user, password, table_name):
    # Connect to MySQL database
    conn = mysql.connector.connect(
        host=host,
        user=user,
        password=password,
        database=database
    )

    # Create a MySQL cursor
    cursor = conn.cursor()

    # Read from CSV and insert into MySQL
    with open(csv_file, 'r') as file:
        reader = csv.reader(file)
        header = next(reader)  # Skip the header if it exists

        for row in reader:
            # Construct the SQL INSERT statement dynamically
            insert_query = f"INSERT INTO {table_name} ({', '.join(header)}) VALUES ({', '.join(['%s'] * len(header))})"
            
            # Execute the INSERT statement with the current row data
            cursor.execute(insert_query, row)

    # Commit changes and close the connection
    conn.commit()
    conn.close()

if __name__ == "__main__":
    # Replace placeholders with your actual CSV file, MySQL connection details, and table name
    csv_file = 'OBD2.csv'
    host = 'localhost'
    database = 'e_mechanic'
    user = 'girum'
    password = '2315'
    table_name = 'obd'

    # Call the function to transfer data
    csv_to_mysql(csv_file, host, database, user, password, table_name)

    print(f"Data from {csv_file} successfully transferred to MySQL table {table_name}.")

