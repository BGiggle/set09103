
from flask import Flask
app = Flask(__name__)

@app.route("/")
def root():
  return "Hello World!"

@app.route("/hello/")
def hello():
  return "Hello Napier!!! :D"

@app.route("/goodbye/")
def goodbye():
  return "good by cruel world :("


if __name__ == "__main__":
  app.run(host="0.0.0.0", debug=True)
