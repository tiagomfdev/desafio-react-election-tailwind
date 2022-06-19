import { getNewId } from "../services/idService";

function Select({
  labelDescription = "Descrição do label:",
  options = null,
  onSelectChange = null,
  id = getNewId(),
  autoFocus = false,
}) {
  function handleSelectChange({ currentTarget }) {
    if (onSelectChange) {
      onSelectChange(currentTarget.value);
    }
  }

  return (
    <div className="flex flex-col my-4">
      <label className="text-sm mb-2" htmlFor={id}>
        {labelDescription}
      </label>

      <select
        autoFocus={autoFocus}
        id={id}
        className="border p-1 max-w-sm"
        onChange={handleSelectChange}
      >
        {options &&
          options.map(({ id: cityId, name: cityName }) => (
            <option key={cityId} value={cityId}>
              {cityName}
            </option>
          ))}
      </select>
    </div>
  );
}

export { Select };
