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
    
    if cursor.lastrowid:
        connection.commit()
        connection.close()
        return cursor.lastrowid
        
    if cursor.description is not None:
        columns = [desc[0] for desc in cursor.description]
        result = []

        for row in cursor.fetchall():
            row = dict(zip(columns, row))
            result.append(row)
        return result[0] if len(result) == 1 else result

    connection.commit()
    connection.close()
