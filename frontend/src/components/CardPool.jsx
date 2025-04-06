import "./CardPool.css";

const CardPool = ({ cards, onSelect }) => {
  if (cards.length === 0) {
    return (
      <div style={{ flex: 1, borderRight: "1px solid gray", padding: "10px" }}>
        <h2>Card Pool</h2>
        <p>Loading Cards...</p>
      </div>
    );
  } else {
    return (
      <div className="card-pool-container">
        <h2>Card Pool</h2>
        <div className="cards-container">
          {cards.map((card) => (
            <div key={card.cardID} className="card" onClick={() => onSelect(card)}>
              <img src={card.imgURL} alt={card.name} width="100" className="img-pool" />
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default CardPool;
