import sqlite3, json


conn = sqlite3.connect('example.db')
c = conn.cursor()

c.execute("select id, name, deck, original_release_date, platforms from games")

items = c.fetchall()
conn.close()

connNew = sqlite3.connect('games.db')
cNew = connNew.cursor()
cNew.execute('''CREATE TABLE IF NOT EXISTS games (id integer primary key,
			  name text,
			  deck text,
			  original_release_date text,
			  platforms text)''')
			  


for i in items:
	s = ""
	for item in i:
		item = str(item).replace("'", "''")
		if(item == None):
			s += "'',"
		else:
			s += "'" + str(item) +"',"
	s = s[:-1]
	cNew.execute("INSERT INTO games ('id','name','deck','original_release_date','platforms') VALUES (" + s + ")")
connNew.commit()
connNew.close()