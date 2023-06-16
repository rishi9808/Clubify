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
    <div className="flex flex-col mt-5">
      {inputs.map((item, index) => {
        const value =
          formData[item.name] && item.type === "date"
            ? new Date(formData[item.name]).toISOString().split("T")[0]
            : formData[item.name];

        return (
          <div key={index} className="flex flex-col mb-5">
            {item.label && (
              <label
                className="mb-1 text-xs tracking-wide text-gray-600"
                htmlFor={item.name}
              >
                {item.label}
              </label>
            )}
          

            <input
              className="text-sm placeholder-gray-400 border-2 rounded-lg p-1"
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
        className="flex mt-2 items-center justify-center focus:outline-none bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in"
        type="submit"
        onClick={handleSubmit}
      >
        Submit
      </button>
      <button
        type="submit"
        className="flex mt-2 items-center justify-center focus:outline-none bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in"
        onClick={() => navigate(-1)} // go back
      >
        Cancel
      </button>
    </div>
  );
};

export default Forms;
