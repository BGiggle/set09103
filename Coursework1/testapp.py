import requests, sqlite3, json
from flask import Flask, abort, url_for, render_template, request, jsonify

app = Flask(__name__)


@app.route("/")
@app.route("/home")
def home():
    return render_template('index.html')

@app.route('/getCollection/', methods =['GET'])
def getCollection():

    start = int(request.args.get('start', ''))
    end = int(request.args.get('end', ''))
    filter = json.loads(request.args.get('filter', ''))

    limit = end - start
    return jsonify(getGames(start, limit, filter));
    


@app.route('/getGame/', methods =['GET'])
def getGame():
    gameId = request.args.get('id', '')
    return requests.get("http://www.giantbomb.com/api/game/" + gameId + "/?api_key=6ca5ed55e20277bf7ba7d998bac94b41c446e806&format=json&field_list=name,deck,id,original_release_date,description,image").content


tableHeadings = ["id", "name", "deck", "original_release_date", "platforms"]
def getGames(start, limit, filter):
    conn = sqlite3.connect('games.db')
    c = conn.cursor()
    
    search = ""

    if("search" in filter):
        search += " WHERE name LIKE '%"+ filter["search"] +"%'"

    q = " ORDER BY " + filter["orderBy"] + " " + filter["direction"] + " limit " + str(start) + ", " + str(limit)

    c.execute("select * from games" + search + q)  
    games = c.fetchall()

    count = c.execute("select count(*) from games" + search).fetchone()[0]

    conn.close()
    result = {"games" : [], "total" : count }
    for i in games:
        game = {}
        index = 0;
        for h in tableHeadings:
            game[h] = i[index]
            index += 1
        result["games"].append(game)
    
    return result

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)