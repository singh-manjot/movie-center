import "./PageSwitch.css";

const PageSwitch = (props) => {
  let optionsToShow = generateVisiblePageNumbers(
    props.currentPage,
    props.totalPages
  );

  return (
    <div className="pageOptions">
      <button
        style={{ borderRight: "1px solid white" }}
        className="changePage"
        disabled={props.currentPage === 1}
        onClick={() => props.pageSwitch(props.currentPage - 1)}
      >
        Previous
      </button>
      {optionsToShow.map((option) => {
        return (
          <>
            <button
              id={option === props.currentPage ? "selectedPageOption" : ""}
              className="pageOption"
              onClick={() => {
                props.pageSwitch(option);
              }}
            >
              {option}
            </button>
          </>
        );
      })}
      <button
        style={{ borderLeft: "1px solid white" }}
        className="changePage"
        disabled={props.currentPage === props.totalPages}
        onClick={() => props.pageSwitch(props.currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

// Narrow down the pages shown to 5 pages
const generateVisiblePageNumbers = (currentPage, lastPageNumber) => {
  let numbers = [];

  while (lastPageNumber > 0) {
    numbers.push(lastPageNumber);
    lastPageNumber--;
  }

  return numbers.sort();
};

export default PageSwitch;
