import { useState } from 'react'
import './App.css'

const initialTasks = [
  { id: 1, title: 'Inspect the component tree', completed: true },
  { id: 2, title: 'Trace state and props', completed: false },
  { id: 3, title: 'Verify the task filters', completed: false },
]

const filters = ['all', 'active', 'completed']

function TaskItem({ task, onToggle }) {
  return (
    <li className={`task${task.completed ? ' task--completed' : ''}`}>
      <label>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span>{task.title}</span>
      </label>
      <span className="task__status">
        {task.completed ? 'Complete' : 'In progress'}
      </span>
    </li>
  )
}

function TaskList({ tasks, filter, onToggle }) {
  const visibleTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  if (visibleTasks.length === 0) {
    return <p className="empty-state">No {filter} tasks right now.</p>
  }

  return (
    <ul className="task-list">
      {visibleTasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} />
      ))}
    </ul>
  )
}

function TaskDashboard({ tasks, filter, onFilterChange, onToggleTask }) {
  const completedCount = tasks.filter((task) => task.completed).length
  const progress = Math.round((completedCount / tasks.length) * 100)

  return (
    <section className="dashboard" aria-labelledby="tasks-heading">
      <div className="dashboard__header">
        <div>
          <p className="eyebrow">Debugging exercise</p>
          <h2 id="tasks-heading">Task list</h2>
        </div>
        <div className="progress" aria-label={`${progress}% complete`}>
          <strong>{completedCount}</strong>
          <span>of {tasks.length} complete</span>
        </div>
      </div>

      <div
        className="progress-track"
        role="progressbar"
        aria-label="Task completion"
        aria-valuenow={progress}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <span style={{ width: `${progress}%` }} />
      </div>

      <div className="task-controls" aria-label="Filter tasks">
        {filters.map((option) => (
          <button
            key={option}
            type="button"
            className={filter === option ? 'filter filter--selected' : 'filter'}
            aria-pressed={filter === option}
            onClick={() => onFilterChange(option)}
          >
            {option[0].toUpperCase() + option.slice(1)}
          </button>
        ))}
      </div>

      <TaskList tasks={tasks} filter={filter} onToggle={onToggleTask} />
    </section>
  )
}

function App() {
  const [tasks, setTasks] = useState(initialTasks)
  const [filter, setFilter] = useState('all')

  function toggleTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  return (
    <main className="app">
      <header className="intro">
        <span className="intro__tag">React Developer Tools</span>
        <h1>Component debugging lab</h1>
        <p>
          Follow state from the app root through the dashboard to each task.
          Toggle a task or change the filter and watch the props update.
        </p>
      </header>

      <TaskDashboard
        tasks={tasks}
        filter={filter}
        onFilterChange={setFilter}
        onToggleTask={toggleTask}
      />

      <footer className="debug-hint">
        <strong>DevTools tip</strong>
        <span>
          Select <code>App</code>, <code>TaskDashboard</code>,{' '}
          <code>TaskList</code>, or <code>TaskItem</code> in the Components tab
          to inspect state and props.
        </span>
      </footer>
    </main>
  )
}

export default App
