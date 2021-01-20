from flask import Flask, render_template
from flask_cors import CORS, cross_origin
import os, json

# creates a Flask application, named app
app = Flask(__name__, static_url_path='', template_folder='./src/templates', static_folder='./src/static')
cors = CORS(app)

# a route where we will display a welcome message via an HTML template
@app.route("/", methods=['GET'])
@cross_origin()
def hello():
    return render_template('index.html')

@app.route("/bets", methods=['GET'])
@cross_origin()
def server_bets_json():
    SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
    json_url = os.path.join(SITE_ROOT, "src/static/javascript/app", "bets.json")
    data = json.load(open(json_url))
    return json.dumps(data);

# run the application
if __name__ == "__main__":
    app.run(host=os.environ.get('HOST'), port=os.environ.get('PORT'), debug=True)
    #app.run(debug=True)
