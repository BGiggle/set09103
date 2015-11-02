from flask import Flask, redirect, url_for
app = Flask(__name__)

@app.route("/private")
def private():
  return redirect(url_for("login"))

@app.route("/login")
def login():
  return "Now we would get username and password"

@app.errorhandler(404)
def page_not_found(error):
  return "Couldnt find the page", 404

if __name__ == "__main__":
  app.run(host="0.0.0.0", debug=True)
