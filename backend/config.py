import psycopg2

def get_db_connection():
    conn = psycopg2.connect(
        host='localhost',
        database='houseing_db',
        user='postgres',
        password='Password'
    )
    return conn
