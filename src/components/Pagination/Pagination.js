import { useEffect, useState } from "react";
import "./styles.css";

function Pagination() {
  const [masterData, setMasterData] = useState([]);
  const [data, setData] = useState([]);
  const [allPages, setAllPages] = useState([]);
  const [numberOfRecordsPerPage, setNumberOfRecordsPerPage] = useState(10);
  const [activePage, setActivePage] = useState(0);

  async function fetchData() {
    const data = await fetch("https://jsonplaceholder.typicode.com/todos");
    const json = await data.json();
    return json;
  }

  useEffect(() => {
    fetchData().then((res) => { 
      setAllPages(generatePaginationArray(res));
      setMasterData(res);
      setData(res);
    });
  }, []);

  function generatePaginationArray(res) {
    let numOfPageToGenerate = Math.floor(res.length / numberOfRecordsPerPage);
    const extraPage = res.length % numberOfRecordsPerPage;
    numOfPageToGenerate =
      extraPage > 0 ? ++numOfPageToGenerate : numOfPageToGenerate;
    const pageArray = Array.from(Array(numOfPageToGenerate).keys()).map(
      (t) => t + 1
    );
    return pageArray;
  }

  useEffect(() => {
    const startingIndex = activePage * numberOfRecordsPerPage;
    const endingIndex = startingIndex + numberOfRecordsPerPage;
    const data = masterData.filter((item) => {
      return item.id >= startingIndex && item.id <= endingIndex;
    });
    const paginationArray = generatePaginationArray(masterData);
    setAllPages(paginationArray);
    setData(data);
  }, [activePage, numberOfRecordsPerPage]);

  const changePage = (e) => {
    setActivePage(e.target.innerHTML - 1);
  };

  const chageItemsPerPage = (e) => {
    setActivePage(0);
    setNumberOfRecordsPerPage(Number(e.target.value));
  };

  const handlePrevious = () => {
    setActivePage((prev) => prev - 1);
  };

  const handleNext = () => {
    setActivePage((prev) => prev + 1);
  };

  return (
    <div>
      <div className={`paginationContainer`}>
        <span
          className={`${activePage === 0 ? "hide" : "show"}`}
          onClick={handlePrevious}
        >
          prev
        </span>
        {allPages.length > 0 &&
          allPages.map((page) => {
            return (
              <span
                className={`page cursor ${
                  activePage + 1 === page ? "active" : "inactive"
                }`}
                onClick={changePage}
              >
                {page}
              </span>
            );
          })}
        <span
          className={`${activePage === allPages.length - 1 ? "hide" : "show"}`}
          onClick={handleNext}
        >
          next
        </span>
      </div>
      <select onChange={chageItemsPerPage}>
        <option value="10">10</option>
        <option value="30">30</option>
        <option value="50">50</option>
      </select>
      <table>
        <thead>
          <th>id</th>
          <th>desc</th>
          <th>decision</th>
        </thead>
        <tbody>
          {data.length > 0 &&
            data.map((rec) => (
              <tr>
                <td>{rec.id}</td>
                <td>{rec.title}</td>
                <td>{rec.completed.toString()}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Pagination;
