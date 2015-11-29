import requests, json

doc = {
	"field1" : "val1",
	"field2" : "val2",
	"field3" : "val3",
	"field4" : "val4",
	"field5" : "val5"
}

docType = "game"
docId = "1"

requests.post("http://set09103cw.cloudapp.net:5000/indexDocument/?docType=" + docType +"&docId=" + docId ,  data = json.dumps(doc))