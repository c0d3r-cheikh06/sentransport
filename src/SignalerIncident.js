import { useState } from 'react';
import './SignalerIncident.css';

function SignalerIncident() {
  const [ligne, setLigne] = useState("");
  const [description, setDescription] = useState("");
  const [lieu, setLieu] = useState("");
  const [message, setMessage] = useState(null);
  const [enCours, setEnCours] = useState(false);

  function handleSubmit() {
    if (!ligne || !description) {
      setMessage({
        type: "erreur",
        texte: "Remplissez la ligne et la description."
      });
      return;
    }

    setEnCours(true);

    fetch("http://localhost:5000/incidents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ligne,
        description,
        lieu: lieu || "Non precise"
      }),
    })
      .then((r) => {
        if (!r.ok) {
          throw new Error("Erreur serveur");
        }
        return r.json();
      })
      .then((data) => {
        setMessage({
          type: "succes",
          texte:
            "Incident #" +
            data.id +
            " signalé. Merci !"
        });

        setLigne("");
        setDescription("");
        setLieu("");
        setEnCours(false);
      })
      .catch((err) => {
        setMessage({
          type: "erreur",
          texte: err.message
        });

        setEnCours(false);
      });
  }

  return (
    <div className="signaler">
      <h2 className="signaler-titre">
        Signaler un incident
      </h2>

      <div className="signaler-form">
        <input
          type="text"
          placeholder="Numéro de ligne (ex: 15)"
          value={ligne}
          onChange={(e) => setLigne(e.target.value)}
          className="signaler-input"
        />

        <input
          type="text"
          placeholder="Lieu (ex: Colobane)"
          value={lieu}
          onChange={(e) => setLieu(e.target.value)}
          className="signaler-input"
        />

        <textarea
          placeholder="Description de l'incident..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="signaler-textarea"
          rows={3}
        />

        <button
          onClick={handleSubmit}
          disabled={enCours}
          className="signaler-btn"
        >
          {enCours
            ? "Envoi en cours..."
            : "Signaler"}
        </button>
      </div>

      {message && (
        <div
          className={`signaler-message signaler-${message.type}`}
        >
          {message.texte}
        </div>
      )}
    </div>
  );
}

export default SignalerIncident;