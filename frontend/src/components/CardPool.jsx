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
      <div style={{ flex: 1, borderRight: "1px solid gray", padding: "10px" }}>
        <h2>Card Pool</h2>
        {cards.map((card) => (
          <div key={card.cardID} className="cards" onClick={() => onSelect(card)}>
            <img src={`${card.imgURL}`} alt={card.name} width="100" />
          </div>
        ))}
      </div>
    );
  }
};

export default CardPool;
