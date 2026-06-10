import json
from flask import Flask, jsonify
from flask_cors import CORS
from flask import Flask, jsonify, request

app = Flask(__name__)
CORS(app)
# Charger les données depuis les fichiers JSON
with open("lignes_ddd.json", "r", encoding="utf-8") as f:
    lignes = json.load(f)

with open("arrets.json", "r", encoding="utf-8") as f:
    arrets = json.load(f)


@app.route("/")
def accueil():
    return jsonify({
        "message": "Bienvenue sur l'API SenTransport !",
        "endpoints": ["/lignes", "/lignes/<id>", "/arrets"]
    })


@app.route("/lignes")
def get_lignes():
    return jsonify(lignes)


@app.route("/lignes/<int:ligne_id>")
def get_ligne(ligne_id):

    ligne = next(
        (l for l in lignes if l["id"] == ligne_id),
        None
    )

    if ligne is None:
        return jsonify({
            "erreur": "Ligne non trouvée"
        }), 404

    return jsonify(ligne)

@app.route("/arrets")
def get_arrets():
    return jsonify(arrets)

incidents = []

@app.route("/incidents", methods=["GET"])
def get_incidents():
    return jsonify(incidents)


@app.route("/incidents", methods=["POST"])
def post_incident():

    data = request.get_json()

    if (
        not data
        or "ligne" not in data
        or "description" not in data
    ):
        return jsonify({
            "erreur": "Champs requis manquants"
        }), 400

    incident = {
        "id": len(incidents) + 1,
        "ligne": data["ligne"],
        "description": data["description"],
        "lieu": data.get("lieu", "Non precise"),
    }

    incidents.append(incident)

    return jsonify(incident), 201

if __name__ == "__main__":
    app.run(debug=True, port=5000)