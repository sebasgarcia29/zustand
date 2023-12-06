import { JiraTasks } from '../../components';
import { useTaskStore } from '../../stores';

export const JiraPage = () => {

  const openTask = useTaskStore(state => state.getTaskByStatus('OPEN'))
  const inProgressTask = useTaskStore(state => state.getTaskByStatus('IN_PROGRESS'))
  const doneTask = useTaskStore(state => state.getTaskByStatus('DONE'))


  return (
    <>
      <h1>Tareas</h1>
      <p>Manejo de estado con objectos de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <JiraTasks title='Pendientes' value='OPEN' tasks={openTask} />

        <JiraTasks title='Avanzando' value='IN_PROGRESS' tasks={inProgressTask} />

        <JiraTasks title='Terminadas' value='DONE' tasks={doneTask} />

      </div>





    </>
  );
};