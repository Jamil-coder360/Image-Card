import { createContext, useState } from 'react';
const CardContext = createContext();

const CardProvider = ({ children }) => {
    const [item ,setItem] = useState([]);
    const addCard = (text,title,image) => {
        // Logic to add a card to the context
        setItem([...item, {text ,title, image}]);
        console.log(item);
    };
    return (<CardContext.Provider value={{ item ,addCard }}>
        {children}
    </CardContext.Provider>
    );
;}
export { CardContext };
export default CardProvider;