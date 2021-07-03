from mysql.connector import connect
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

    with open(f'test-sample.sql', 'r') as sql_file:
        result_iterator = cursor.execute(sql_file.read(), multi=True)
        for i, result in enumerate(result_iterator):
            print(f"Running query: {i+1}")
            print(f"Affected {result.rowcount} rows")
            try:
                result = []

                columns = [desc[0] for desc in cursor.description]

                for row in cursor.fetchall():
                    result.append({col: row for col, row in zip(columns, row)})
                print(result)
            except TypeError as E:
                continue

    cursor.close()
    connection.close()


