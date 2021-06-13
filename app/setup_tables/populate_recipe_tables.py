"""
Script to Populate Recipe Database
"""
from mysql.connector import Connect, MySQLConnection,connect, Error
import json
from os import path
from utils import get_db_creds
import argparse

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument(
            "--table-type",
            type=str,
            default="sample",
            choices=["sample", "prod"],
            help="""Choose between creating
            Sample Tables or Production Tables.
            Defaults to Creating the Sample Tables.
            """
            )
    args = parser.parse_args()

    db_creds = get_db_creds()
    connection = connect(**db_creds)
    cursor = connection.cursor()

    with open(f'sql_scripts/populate_{args.table_type}_tables.sql', 'r') as sql_file:

        result_iterator = cursor.execute(sql_file.read(), multi=True)           
        for result in result_iterator:
            connection.commit()
            print("Running query: ", result)
            print(f"Affected {result.rowcount} rows")

    cursor.close()
    connection.close()