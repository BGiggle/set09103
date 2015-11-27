import requests
import json
import sqlite3
import time
conn = sqlite3.connect('example.db')

gameFields = ["id", "aliases", "api_detail_url", "date_added", "date_last_updated", "deck", "description", "expected_release_month", "expected_release_quarter", 
 "expected_release_year",  "image", "name", "number_of_user_reviews", "original_game_rating", "original_release_date", "platforms", "site_detail_url"]

c = conn.cursor()

def getCollection(start):

	again = True
	while(again):
		print("getting " + str(start))
		time.sleep(3)

	
		r = requests.get("http://www.giantbomb.com/api/games/?api_key=6ca5ed55e20277bf7ba7d998bac94b41c446e806&format=json&offset=" + str(start))
		d = r.json()
		
		if(d["status_code"] != 1):
			time.sleep(15)
			continue
		
		games = d["results"]
		for i in games:
			saveString = "";
			cols = ""
			for x in gameFields:
				cols += x +","
				val = json.dumps(i[x])
				val = val.replace("'", "''")
				if(val[0] == "\""):
					val = val[1:-1]					
					val = "'" + val + "'"
				
				if(val[0] == '{' or val[0] == '['):
					val = "'" + val + "'"
				
				saveString +=  val + ","
			
			saveString = saveString[:-1]
			cols = cols[:-1]
			
			
			insertstring = "INSERT INTO games ("+cols+") VALUES (" + saveString + ")"

			# # Insert a row of data
			try:
				c.execute(insertstring)
			except sqlite3.IntegrityError as err:
				print("Oops! couldnt insert " +  str(i["id"]))
				
			
		
		
		# # Save (commit) the changes
		conn.commit()

		# # We can also close the connection if we are done with it.
		# # Just be sure any changes have been committed or they will be lost.

		
		if(len(games) == 0):
			again = False
			
		start += 100

# def createTable():
	 # # Create table

	 # c.execute('''CREATE TABLE games (id integer primary key,
										 # aliases text, 
										 # api_detail_url text, 
										 # date_added text, 
										 # date_last_updated text, 
										 # deck text, 
										 # description text, 
										 # expected_release_month text, 
										 # expected_release_quarter text, 
										 # expected_release_year text,  
										 # image text, 
										 # name text, 
										 # number_of_user_reviews text, 
										 # original_game_rating text, 
										 # original_release_date text, 
										 # platforms text, 
										 # site_detail_url text)''')

# createTable()


getCollection(16900)
conn.close()


