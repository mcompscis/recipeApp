from mysql.connector import Connect, MySQLConnection,connect, Error
import json
from os import path
from .utils import get_db_creds
from django.http import JsonResponse

def exec_query(query, params = []):
    db_creds = get_db_creds()
    connection = connect(**db_creds)
    cursor = connection.cursor()

    if len(params):
        cursor.execute(query, params)
    else:
        cursor.execute(query)

    columns = [desc[0] for desc in cursor.description]
    result = []

    for row in cursor.fetchall():
        row = dict(zip(columns, row))
        result.append(row)

    connection.commit()
    connection.close()
    return result
