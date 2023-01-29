import {GrFormClose} from 'react-icons/gr';
import {useDispatch} from "react-redux";
import {deleteGoal} from '../features/goals/goalSlice';

function GoalItem({goal}) {
    const dispatch = useDispatch();

    return <div className='goal'>
        <div>{ new Date(goal.createdAt).toLocaleDateString('ru-RU') }</div>
        <h2>{goal.text}</h2>
        <button onClick={() => dispatch(deleteGoal(goal._id))} className="close">
            <GrFormClose />
        </button>
    </div>
}

export default GoalItem;