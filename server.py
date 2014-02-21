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
            "name": "sam",
            "miles": 1
        },
        {
            "name": "dean",
            "miles": 32
        },
        {
            "name": "steve",
            "miles": 0
        }
    ]
}


@app.route("/")
def index():
    return render('index.html')


@app.route('/users/', methods=['PUT'])
def users():
    if request.method == 'PUT':
        print 'REQUEST DATA', request.data
        req_data = json.loads(request.data)
        for user in app.team['users']:
            if user['name'] == req_data['name']:
                user['miles'] += req_data['miles']
                return Response(json.dumps(user))

        app.team['users'].append(req_data)
        return Response(json.dumps(req_data))


@app.route('/teams/')
def teams():
    print app.team
    return Response(json.dumps(app.team))


if __name__ == "__main__":
    app.run()