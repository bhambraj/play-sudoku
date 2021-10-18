import './Cell.css';

const Cell = ({
    rowNum,
    colNum,
    cellValue,
    cellClicked,
    disabled,
    sudokuIdx
    }) => {
    return (
        <div className={`cell idx#${sudokuIdx} ${disabled ? 'disabled': ''}`}
            id={`cell-${rowNum}${colNum}`}
            onClick={cellClicked}
            >
           {`${cellValue === 0 ? '': cellValue}`}
        </div>
    );
};

export default Cell;