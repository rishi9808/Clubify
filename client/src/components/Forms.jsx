import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Forms = ({ inputs, onSubmit, children }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(() => {
    const defaultValues = {};
    inputs.forEach((input) => {
      const val = input.defaultValue || input.value;
      if (val) defaultValues[input.name] = val;
    });
    return defaultValues;
  });

  const handleChange = (e) => {
    const { target } = e;
    const key = target.name;
    const value =
      target.type === "number"
        ? target.valueAsNumber
        : target.type === "date"
        ? target.valueAsDate
        : target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="form flex flex-col" onSubmit={handleSubmit}>
      {inputs.map((item, index) => {
        const value =
          formData[item.name] && item.type === "date"
            ? new Date(formData[item.name]).toISOString().split("T")[0]
            : formData[item.name];

        return (
          <div key={index} className="form__group flex flex-col mb-2">
            {item.label && <label htmlFor={item.name}>{item.label}</label>}

            <input
              className="form__input m-1 p-1 border-2 rounded-sm"
              id={item.name}
              {...item}
              value={value}
              onChange={handleChange}
            />
          </div>
        );
      })}
      {children}
      <button
        className="form__submit m-2 p-1 border-2 rounded-lg uppercase bg-gray-300"
        type="submit"
      >
        Submit
      </button>
      <button
        type="submit"
        className=" m-2 py-2 px-1 border-2 rounded-lg uppercase bg-gray-300"
        onClick={() => navigate(-1)} // go back
      >
        Cancel
      </button>
    </form>
  );
};

export default Forms;
