import requests
from flask import Flask, abort, url_for, render_template, request, jsonify

app = Flask(__name__)


@app.route("/")
@app.route("/home")
def home():
    return render_template('index.html')

@app.route('/getCollection/', methods =['GET'])
def about():
    start =  request.args.get('start', '')
    end =  request.args.get('end', '')
    result  = { "result": [1,2,3,4,5,6,7,8,9,10]}       
    return requests.get("http://www.giantbomb.com/api/games/?api_key=6ca5ed55e20277bf7ba7d998bac94b41c446e806&format=json&limit=10&field_list=name,deck,id,original_release_date,platforms").content

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)