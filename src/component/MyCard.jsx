import React, { useContext, useRef, useState } from "react";
import Button from "./Button";
import { CardContext } from "../context/CardContext";
import { toast } from "react-toastify";

const MyCard = () => {
  const fileRef = useRef();
  const { item, addCard } = useContext(CardContext);
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");

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
    <section className="py-25">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center ">
          <div className="">
            <h1 className="text-5xl text-white text-center font-bold">
              Add your Own Card Now
            </h1>
            <p className="text-3xl text-yellow-300 font-semibold my-5">
              make card : <span>{item?.length || 0}</span>
            </p>

            <form className="w-[500px] border p-5 rounded-2xl bg-white/20 backdrop-blur-2xl">
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

        {/* Cards Grid */}
        <div className="flex flex-col flex-wrap gap-6 justify-center mt-20">
            <div className="flex items-center justify-between">
                <h3 className="text-white text-3xl font-bold">total card : {item?.length || 0}</h3>
                <Button>
                    Delete All
                </Button>
            </div>
            <div className="grid grid-cols-4 gap-6">

          {item?.map((card, i) => (
            <div
              key={i}
              className="w-72 rounded-2xl bg-white border border-gray-100 overflow-hidden cursor-pointer hover:-translate-y-2 transition-transform duration-200"
            >
              {/* Image */}
              <div className="relative w-full h-48 bg-gradient-to-br from-blue-200 to-blue-400 overflow-hidden">
                {card.image ? (
                  <img
                    src={card.image}
                    alt={card.text}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-200 to-blue-400" />
                )}
              </div>

              {/* Body */}
              <div className="px-5 py-5">
                {/* Title */}
                <h3 className="font-serif text-lg font-medium text-gray-900 leading-snug mb-2">
                  {card.text || "Untitled"}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                  {card.title || "No description provided."}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <Button className="text-xs  px-4 py-1.5 rounded-full hover:bg-gray-100 hover:text-black hover:border transition-colors">
                    Edit
                  </Button>
                  <Button className="text-xs bg-red-400 text-white px-4 py-1.5 rounded-full hover:bg-red-600 transition-colors">
                    delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default MyCard;