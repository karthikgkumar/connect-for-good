export default function Input({ name, value, readonly, onchange }) {
  return (
    <div>
      <label className="mb-2 block text-xl font-medium text-gray-700 dark:text-white">
        {name}
      </label>
      <input
        type="text"
        value={value}
        readOnly={readonly}
        className={`${
          readonly ? "pointer-events-none" : ""
        } block w-full rounded-md border-transparent bg-gray-100 px-4 py-2 text-xl focus:border-gray-500 focus:ring-0 dark:bg-gray-800`}
        onChange={readonly ? undefined : onchange} // Omit onChange when readonly is true
      />
    </div>
  );
}
