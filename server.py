from flask import Flask, render_template
from flask_cors import CORS, cross_origin

# creates a Flask application, named app
app = Flask(__name__, static_url_path='', template_folder='./src/templates', static_folder='./src/static')
cors = CORS(app)

# a route where we will display a welcome message via an HTML template
@app.route("/")
@cross_origin()
def hello():
    return render_template('index.html')

# run the application
if __name__ == "__main__":
    app.run(port=os.environ.get('PORT'), debug=True)
