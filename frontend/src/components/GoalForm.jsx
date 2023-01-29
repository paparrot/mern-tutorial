import {useDispatch} from "react-redux";
import {createGoal} from '../features/goals/goalSlice';
import {useState} from "react";

function GoalForm() {
    const dispatch = useDispatch();
    const [text, setText] = useState('');

    const onSubmitGoal = (e) => {
        e.preventDefault();

        dispatch(createGoal({text}))
        setText('');
    }

    return (
        <section className='form'>
            <form onSubmit={onSubmitGoal}>
                <div className="form-group">
                    <label htmlFor="text">Goal</label>
                    <input type="text" name='text' value={text} onChange={(e) => setText(e.target.value)}/>
                </div>
                <div className="form-group">
                    <button className='btn btn-block' type='submit'>
                        Add goal
                    </button>
                </div>
            </form>
        </section>
    );
}

export default GoalForm;