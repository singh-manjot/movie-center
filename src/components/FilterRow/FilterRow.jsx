import "./FilterRow.css";
const FilterRow = (props) => {
  const yearOptions = generateArrayForLast10Years();

  const allowedMediaTypes = ["", "movie", "series", "episode"];

  return (
    <div className="row">
      <input
        onChange={(event) => {
          props.onChange("Title", event.target.value);
        }}
        name="titleSearch"
        placeholder="Search By Title"
      ></input>
      <select
        className="filter"
        name="releaseYear"
        id="releaseYear"
        onChange={(event) => {
          props.onChange("Release Year", event.target.value);
        }}
      >
        {yearOptions.map((year) => (
          <option key={year} value={year}>
            {year === "" ? "Select Release Year" : year}
          </option>
        ))}
      </select>

      <select
        className="filter"
        name="mediaType"
        id="mediaType"
        onChange={(event) => {
          props.onChange("Media Type", event.target.value);
        }}
      >
        {allowedMediaTypes.map((mediaType) => (
          <option key={mediaType} value={mediaType}>
            {mediaType === "" ? "Select Media Type" : mediaType}
          </option>
        ))}
      </select>
    </div>
  );
};

function generateArrayForLast10Years() {
  const presentYear = new Date().getFullYear();
  let yearOptions = ["", presentYear];
  for (let i = 1; i <= 10; i++) {
    yearOptions.push(presentYear - i);
  }
  return yearOptions;
}

export default FilterRow;
