import json

def test(str):
    return str

def ready(tag):
    return str(tag + " is online!")


def message(msg):
    msg = json.loads(msg)
    if msg["content"] == 'ping':
        return json.dumps([True, "Pong!"])
