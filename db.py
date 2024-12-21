import sqlite3
#create db connection
conn = sqlite3.connect("students.sqlite")
#create the db cursor object
cursor = conn.cursor()
#create sql table creation query
sql_query = """ CREATE TABLE students (
	id INTEGER PRIMARY KEY,
	firstname TEXT NOT NULL,
	lastname TEXT NOT NULL,
	gender TEXT NOT NULL,
	age TEXT 
)"""

cursor.execute(sql_query)
