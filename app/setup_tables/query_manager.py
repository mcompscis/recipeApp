from mysql.connector import Connect, MySQLConnection,connect, Error
import json
from os import path
from .utils import get_db_creds
from django.http import JsonResponse

def exec_query(query, params = {}, multi = False):
    db_creds = get_db_creds()
    connection = connect(**db_creds)
    cursor = connection.cursor()
    data = None
    if len(params):
        data = cursor.execute(query, params, multi)
    else:
        data = cursor.execute(query, None, multi)

    if data == 0:
        connection.close()
        return None

    columns = [desc[0] for desc in cursor.description]
    result = []

    for row in cursor.fetchall():
        row = dict(zip(columns, row))
        result.append(row)

    connection.commit()
    connection.close()
    return result
