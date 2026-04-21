import React, { useContext, useRef, useState } from "react";
import Button from "./Button";
import { CardContext } from "../context/CardContext";
import { toast } from "react-toastify";

const MyCard = () => {
  const fileRef = useRef();
  const editFileRef = useRef();
  const { item, addCard, deleteCard, deleteAll, updateCard } =
    useContext(CardContext);
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [updateText, setUpdateText] = useState("");
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateImage, setUpdateImage] = useState("");

  const [edit, isEdit] = useState(false);

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
  const handleEditImage = (e) => {
    const file = e.target.files[0];
    if (file) setUpdateImage(URL.createObjectURL(file));
  };

  const handleEdit = (id) => {
    isEdit(id);
    setText(item.find((item) => item.id === id).text);
    setTitle(item.find((item) => item.id === id).title);
    setImage(item.find((item) => item.id === id).image);
  };
  const handleSave = (id) => {
    isEdit(false);
    setUpdateText(text);
    setUpdateTitle(title);
    setUpdateImage(image);
    updateCard(id, {
      id,
      text: updateText,
      title: updateTitle,
      image: updateImage,
    });
    toast.success("Todo updated successfully!");
  };

  return (
    <section className="py-16 lg:py-24 px-4">
      <div className="container mx-auto">
        {/* TITLE SECTION */}
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-5xl text-white font-bold">
            Add your Own Card Now
          </h1>

          <p className="text-base sm:text-lg lg:text-3xl text-yellow-300 font-semibold my-4 sm:my-6">
            make card :
          </p>

          {/* FORM */}
          <form className="w-full max-w-md lg:max-w-lg border p-4 sm:p-6 rounded-2xl bg-white/20 backdrop-blur-2xl">
            <div className="flex flex-col gap-4 pb-4">
              <input
                ref={fileRef}
                type="file"
                className="w-full p-3 bg-gray-200 text-black rounded-xl outline-none text-sm sm:text-base"
                accept="image/*"
                onChange={handleImage}
              />

              <input
                onChange={(e) => setText(e.target.value)}
                type="text"
                value={text}
                placeholder="Add a new title..."
                className="w-full p-3 bg-gray-200 text-black rounded-xl outline-none text-sm sm:text-base"
              />

              <input
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                value={title}
                placeholder="Add a description..."
                className="w-full p-3 bg-gray-200 text-black rounded-xl outline-none text-sm sm:text-base"
              />
            </div>

            <Button
              onClick={handleAdd}
              className="w-full !bg-black text-white py-3 rounded-2xl"
            >
              Add Card
            </Button>
          </form>
        </div>

        {/* HEADER ROW */}
        <div className="flex flex-row items-center justify-between gap-4 mt-16 sm:mt-20 text-center sm:text-left">
          <h3 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold">
            total card : {item?.length || 0}
          </h3>

          <Button onClick={deleteAll}>Delete All</Button>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10 sm:mt-14">
          {item?.map((item, i) => (
            <div
              key={i}
              className="w-full  mx-auto rounded-2xl bg-white border border-gray-100 overflow-hidden cursor-pointer hover:-translate-y-2 transition-transform duration-200"
            >
              {/* IMAGE */}
              {edit === item.id ? (
                <input
                  ref={editFileRef}
                  type="file"
                  className="w-full p-3 bg-gray-200 text-black rounded-xl outline-none"
                  accept="image/*"
                  onChange={handleEditImage}
                />
              ) : (
                <div className="relative w-full h-40 sm:h-48 overflow-hidden bg-gradient-to-br from-blue-200 to-blue-400">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.text}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-200 to-blue-400" />
                  )}
                </div>
              )}

              {/* BODY */}
              <div className="flex flex-col gap-3 sm:gap-4 px-4 sm:px-5 py-4 sm:py-5">
                {/* TITLE */}
                {edit === item.id ? (
                  <input
                    onChange={(e) => setUpdateText(e.target.value)}
                    type="text"
                    value={updateText}
                    className="w-full p-3 bg-gray-200 text-black rounded-xl outline-none text-sm sm:text-base"
                  />
                ) : (
                  <h3 className="text-base sm:text-lg font-medium text-gray-900">
                    {item.text || "Untitled"}
                  </h3>
                )}

                {/* DESCRIPTION */}
                {edit === item.id ? (
                  <input
                    onChange={(e) => setUpdateTitle(e.target.value)}
                    type="text"
                    value={updateTitle}
                    className="w-full p-3 bg-gray-200 text-black rounded-xl outline-none text-sm sm:text-base"
                  />
                ) : (
                  <p className="text-xs sm:text-sm text-gray-500">
                    {item.title || "No description provided."}
                  </p>
                )}

                {/* BUTTONS */}
                <div className="flex items-center justify-between gap-2">
                  {edit === item.id ? (
                    <Button onClick={() => handleSave(item.id)}>Save</Button>
                  ) : (
                    <Button onClick={() => handleEdit(item.id)}>Edit</Button>
                  )}

                  <Button
                    onClick={() => deleteCard(item.id)}
                    className="bg-red-400 text-white hover:bg-red-600"
                  >
                    delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyCard;
