from flask import Flask, request, Response
from config.jinjacfg import render
import json


app = Flask(__name__)


from config.dev import config
app.config.update(config)

app.team = {
    "id": 1,
    "name": "Startup Weekend",
    "goal_miles": 1200,
    "users": [
        {
            "id": 1,
            "name": "sam",
            "distance": 1
        },
        {
            "id": 2,
            "name": "dean",
            "distance": 32
        },
        {
            "id": 3,
            "name": "steve",
            "distance": 0
        }
    ]
}


@app.route("/")
def index():
    return render('jason-index.html')


@app.route('/users/', methods=['PUT'])
def users():
    if request.method == 'PUT':
        req_data = json.loads(request.data)
        print request.data
        # normal distance to a float
        req_data['distance'] = float(req_data['distance'])
        for user in app.team['users']:
            if user['name'] == req_data['name']:
                user['distance'] += float(req_data['distance'])
                return Response(json.dumps(user), status=201)

        app.team['users'].append(req_data)
        return Response(json.dumps(req_data), status=201)


@app.route('/teams/', methods=['GET'])
def teams():
    if request.method == 'GET':
        print app.team
        return Response(json.dumps(app.team))


if __name__ == "__main__":
    app.run()