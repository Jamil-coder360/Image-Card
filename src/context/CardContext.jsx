import { createContext, useState } from 'react';

const CardContext = createContext();

const CardProvider = ({ children }) => {
  const [item, setItem] = useState([]);

  const addCard = (text, title, image) => {
    const newCard = {
      id: Date.now(), // ✅ unique id
      text,
      title,
      image,
    };
    setItem((prev) => [...prev, newCard]); // ✅ prev state ব্যবহার করো
  };

  const updateCard = (id, updatedItem) => {
    setItem((prev) =>
      prev.map((card) => (card.id === id ? updatedItem : card))
    );
  };

  const deleteCard = (id) => {
    setItem((prev) => prev.filter((card) => card.id !== id));
  };

  const deleteAll = () => {
    setItem([]);
  };

  return (
    <CardContext.Provider value={{ item, addCard, deleteCard, deleteAll, updateCard }}>
      {children}
    </CardContext.Provider>
  );
};

export { CardContext };
export default CardProvider;