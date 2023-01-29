import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import GoalForm from "../components/GoalForm";
import GoalItem from "../components/GoalItem";
import Spinner from "../components/Spinner";
import {getGoals, reset} from "../features/goals/goalSlice";


function Dashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user} = useSelector(state => state.auth);
    const {goals, isLoading, isError, message} = useSelector(state => state.goals);

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }

        if (isError || message) {
            console.log(message);
        }

        dispatch(getGoals());

        return () => {
            dispatch(reset());
        }

    }, [user, navigate, isError, dispatch, message])

    if (isLoading) {
        return <Spinner />
    }

    return <>
        <section className="heading">
            <h1>Welcome {user && user.name}</h1>
            <p>Goals dashboard</p>
        </section>
        <GoalForm/>

        <section className='content'>
            {
                goals.length > 0 ?
                    (<div className='goals'>
                        {goals.map(goal => <GoalItem key={goal._id} goal={goal} />)}
                    </div>) : (<h3>You have no set goals yet.</h3>)
            }
        </section>
    </>
}

export default Dashboard;