import sqlite3, json

connNew = sqlite3.connect('users.db')
cNew = connNew.cursor()
cNew.execute('''CREATE TABLE IF NOT EXISTS users (
			  email text,
			  password text,
			  salt text)''')

cNew.execute("select * from users")

print(cNew.fetchall())