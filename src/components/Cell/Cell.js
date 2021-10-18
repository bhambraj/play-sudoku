import './Cell.css';

const Cell = ({rowNum, colNum, cellValue, cellClicked}) => {
    return (
        <div className='cell'
            id={`cell-${rowNum}${colNum}`}
            onClick={cellClicked}
            >
           {`${cellValue}`}
        </div>
    );
};

export default Cell;