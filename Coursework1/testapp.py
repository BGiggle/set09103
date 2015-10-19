import requests
from flask import Flask, abort, url_for, render_template, request, jsonify

app = Flask(__name__)


@app.route("/")
@app.route("/home")
def home():
    return render_template('index.html')

@app.route('/getCollection/', methods =['GET'])
def about():
    start =  int(request.args.get('start', '0'))
    end =  int(request.args.get('end', '0'))
    return requests.get(buildRequest(start,end)).content

def buildRequest(start, end):
    requestString = "http://www.giantbomb.com/api/games/?api_key=6ca5ed55e20277bf7ba7d998bac94b41c446e806&format=json&field_list=name,deck,id,original_release_date,platforms"  
    requestString += "&limit=" + str(end - start)
    requestString += "&offset=" + str(start)
    return requestString



if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
