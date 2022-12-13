import Task from "./Task"
import TasksHeader from "./TasksHeader"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const Tasks = ({ tasks, _updateTask, _deleteTask, _addTask, pb }) => {
    const navigate = useNavigate()
    useEffect(() => {
        if (!pb.authStore.isValid) {
            return navigate("/")
        }
    })

    if (!pb.authStore.isValid) return navigate("/")

    return (
        <>
            <TasksHeader _addTask={_addTask} />
            <div className="tasks">
                {tasks.map((task, index) => {
                    return <Task key={index} task={task} _updateTask={_updateTask} _deleteTask={_deleteTask} />
                })}
            </div>
        </>
    )
}

export default Tasks