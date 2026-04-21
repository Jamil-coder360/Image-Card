import { createContext, useState } from 'react';
const CardContext = createContext();

const CardProvider = ({ children }) => {
    const [item ,setItem] = useState([]);
    const addCard = (text,title,image) => {
        // Logic to add a card to the context
        setItem([...item, {text ,title, image}]);
        console.log(item);
    };
    const deleteCard =(id) =>{
        setItem(item.filter((_, i) => i !== id));
    }
    const deleteAll = ()=>{
        setItem([]);
    }
    return (<CardContext.Provider value={{ item ,addCard, deleteCard , deleteAll}}>
        {children}
    </CardContext.Provider>
    );
;}
export { CardContext };
export default CardProvider;