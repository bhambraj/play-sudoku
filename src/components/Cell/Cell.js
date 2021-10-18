import './Cell.css';

const Cell = ({rowNum, colNum, cellClicked}) => {
    return (
        <div className='cell'
            id={`cell-${rowNum}${colNum}`}
            onClick={cellClicked}
            >
           {`${rowNum}${colNum}`}
        </div>
    );
};

export default Cell;