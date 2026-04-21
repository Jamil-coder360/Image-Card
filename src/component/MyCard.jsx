import React, { useContext, useRef, useState } from "react";
import Button from "./Button";
import { CardContext } from "../context/CardContext";
import { toast } from "react-toastify";

const MyCard = () => {
  //   const { item, addCard } = useContext(CardContext);
  const fileRef = useRef();
  const { item, addCard } = useContext(CardContext);
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [card, setCard] = useState();
  const handleAdd = (e) => {
    e.preventDefault();
    addCard(text, title, image);
    setText("");
    setTitle("");
    setImage(null);
    fileRef.current.value = null;

    toast.success("Todo added successfully!");
  };
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };
  return (
    <section>
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center">
          <div>
            <h1 className="text-5xl text-black text-center font-bold">
              Add your Own Card Now
            </h1>
            <p className="text-3xl text-blue-300 font-semibold my-5">
              make card : <span>{item?.length || 0}</span>
            </p>

            <form action="" className="w-[500px] border p-5 rounded-2xl">
              <div className="w-full flex flex-col gap-4 pb-4">
                <input
                  ref={fileRef}
                  type="file"
                  className="w-full p-3 bg-gray-200 text-black rounded-xl outline-0"
                  accept="image/*"
                  onChange={handleImage}
                />
                <input
                  onChange={(e) => setText(e.target.value)}
                  type="text"
                  value={text}
                  placeholder="Add a new title..."
                  className="w-full p-3 bg-gray-200 text-black rounded-xl outline-0"
                />
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  value={title}
                  placeholder="Add a description..."
                  className="w-full p-3 bg-gray-200 text-black rounded-xl outline-0"
                />
              </div>
              <Button
                onClick={handleAdd}
                className="w-full text-center !bg-black text-white py-3 px-5 rounded-2xl"
              >
                Add Card
              </Button>
            </form>
          </div>
        </div>

        <div>
            
        </div>
      </div>
    </section>
  );
};

export default MyCard;
