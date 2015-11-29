import requests, json
import ast
from flask import Flask, request, jsonify
app = Flask(__name__)

@app.route('/indexDocument/', methods =['POST'])
def indexDocument():
    print(request.args)
    
    docId = str(request.args.get('docId', ''))
    docType = str(request.args.get('docType', ''))
    
    resp = requests.put("http://localhost:9200/gamesindex/" + docType + "/" + docId, data = request.data).content
    
    print(resp)
    
    return "True"
    
@app.route('/indexMultipleDocuments/', methods =['POST'])
def indexMultipleDocuments():
   

    docType = str(request.args.get('docType', ''))
    docs = ast.literal_eval(request.data)
    
    for doc in docs:
        requests.put("http://localhost:9200/gamesindex/" + docType + "/" + docId, data = doc).content

    
    #resp = requests.put("http://localhost:9200/gamesindex/" + docType + "/" + docId, data = request.data).content
    
    #print(resp)
    
    return "True"



# @app.route('/getDocument/', methods =['POST'])
# def getDocument():
#     print(request.args)
#     
#     docId = str(request.args.get('docId', ''))
#     docType = str(request.args.get('docType', ''))
#     
#     resp = requests.get("http://localhost:9200/gamesindex/" + docType + "/" + docId).content
#     
#     return resp

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)