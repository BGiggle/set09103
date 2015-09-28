from flask import Flask, abort, url_for, render_template

app = Flask(__name__)

@app.route("/")
def root():
    return render_template('home.html')

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)