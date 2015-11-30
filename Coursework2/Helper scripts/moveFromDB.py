import sqlite3, json


conn = sqlite3.connect('example.db')
c = conn.cursor()

c.execute("select abbreviation, api_detail_url, company, date_added, deck, description, id, image, install_base, name, online_support, original_price, release_date, site_detail_url from platforms")

items = c.fetchall()
conn.close()

connNew = sqlite3.connect('games.db')
cNew = connNew.cursor()
cNew.execute('''CREATE TABLE platforms (abbreviation text,
			api_detail_url text,
			company text, 
			date_added text, 
			deck text, 
			description text, 
			id integer primary key, 
			image text, 
			install_base text, 
			name text, 
			online_support text, 
			original_price text, 
			release_date text, 
			site_detail_url text)''')
			  


for i in items:
	s = ""
	for item in i:
		item = str(item).replace("'", "''")
		if(item == None):
			s += "'',"
		else:
			s += "'" + str(item) +"',"
	s = s[:-1]
	cNew.execute("INSERT INTO platforms ('abbreviation', 'api_detail_url', 'company', 'date_added', 'deck', 'description', 'id', 'image', 'install_base', 'name', 'online_support', 'original_price', 'release_date', 'site_detail_url') VALUES (" + s + ")")
connNew.commit()
connNew.close()