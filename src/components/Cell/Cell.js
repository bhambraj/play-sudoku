import './Cell.css';

const Cell = ({
    rowNum,
    colNum,
    cellValue,
    cellClicked,
    disabled,
    }) => {
    return (
        <div className={`cell ${disabled ? 'disabled': ''}`}
            id={`cell-${rowNum}${colNum}`}
            onClick={cellClicked}
            >
           {`${cellValue === 0 ? '': cellValue}`}
        </div>
    );
};

export default Cell;