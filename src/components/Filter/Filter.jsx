export const Filter = ({ filter, handleChange }) => {
  return (
    <div>
      <h3>Find contacts by name</h3>
      <input
        type="filter"
        name="filter"
        value={filter}
        onChange={handleChange}
      />
    </div>
  );
};
