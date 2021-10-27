import './ActionRow.css';

const ActionRow = ({onBtnClicked}) => {
    const validChoices = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
        <div className="actionRowContainer">
            <div className="actionRow">
                {
                    validChoices.map((elm) => {
                        return (
                            <div key={elm}
                                id={`val-${elm}`} 
                                className='valBtn'
                                onClick={onBtnClicked}>
                                {elm === 10 ? 'CLR' : elm}
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
};

export default ActionRow;