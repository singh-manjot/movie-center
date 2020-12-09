import "./FilterRow.css";
const FilterRow = (props) => {
  return (
    <div className="row">
      {props.filters.map((filter) => {
        let placeholder = `Search By ${filter}`;
        return (
          <span key={filter}>
            <label htmlFor={filter}>{filter}</label>
            <input onChange={(event)=>{props.onChange(filter, event.target.value)}} name={filter} placeholder={placeholder}></input>
          </span>
        );
      })}
    </div>
  );
};

export default FilterRow;
