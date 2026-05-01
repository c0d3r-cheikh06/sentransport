import './LigneBus.css';

function LigneBus({ numero, depart, arrivee, arrets }) {
  return (
    <div className="ligne-bus">
      <div className="ligne-numero">{numero}</div>

      <div className="ligne-info">
        <span className="ligne-trajet">
          {depart} → {arrivee}
        </span>

        <span className="ligne-arrets">
          {arrets} arrêts
        </span>
      </div>
    </div>
  );
}

export default LigneBus;
