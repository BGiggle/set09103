import requests, json
from flask import Flask, request, jsonify
app = Flask(__name__)

@app.route('/indexDocument/', methods =['POST'])
def indexDocument():
    print(request.args)
    
    docId = str(request.args.get('docId', ''))
    docType = str(request.args.get('docType', ''))
    
    resp = requests.put("http://localhost:9200/gamesIndex/" + docType + "/" + docId, data = request.data).content
    
    print(resp)
    
    return "True"
    

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)