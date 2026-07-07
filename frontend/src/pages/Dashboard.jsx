import { useEffect, useState } from "react";
import api from "../api/axios";

function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [editingId, setEditingId] = useState(null);
  const [stats, setStats] = useState({
    total_tasks: 0,
    completed_tasks: 0,
    pending_tasks: 0,
  });
  const [status, setStatus] = useState("pending");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/tasks", {
        params: {
          status: filterStatus || undefined,
          priority: filterPriority || undefined,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load tasks");
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/tasks/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStats(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/tasks",
        {
          title,
          description,
          priority,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setTitle("");
      setDescription("");
      setPriority("medium");

      fetchTasks();
      fetchStats();
    } catch (error) {
      console.log(error);
      alert("Failed to create task");
    }
  };

  const deleteTask = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchTasks();
      fetchStats();
    } catch (error) {
      console.log(error);
      alert("Failed to delete task");
    }
  };

  const updateTask = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/tasks/${editingId}`,
        {
          title,
          description,
          status,
          priority,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setEditingId(null);
      setTitle("");
      setDescription("");
      setPriority("medium");

      fetchTasks();
      fetchStats();
    } catch (error) {
      console.log(error);
      alert("Failed to update task");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  useEffect(() => {
    fetchTasks();
    fetchStats();
  }, [filterStatus, filterPriority]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #dbeafe, #e9d5ff)",
        padding: "40px",
      }}
    >
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="mb-4">
            <h1>📋 TaskFlow Pro</h1>
            <p className="text-muted">
              Organize your work, track progress, and complete tasks
              efficiently.
            </p>
          </div>

          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        </div>

        <hr />
        <div className="row mb-4">
          <div className="col-md-4">
            <div className="card text-center p-3">
              <h5>📋Total Tasks</h5>
              <h2>{stats.total_tasks}</h2>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card text-center p-3">
              <h5>✅ Completed</h5>
              <h2>{stats.completed_tasks}</h2>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card text-center p-3">
              <h5>⏳ Pending</h5>
              <h2>{stats.pending_tasks}</h2>
            </div>
          </div>
        </div>

        <div className="card p-3 mb-4">
          <h3>Create Task</h3>

          <input
            className="form-control mb-2"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="form-control mb-2"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <select
            className="form-select mb-2"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <select
            className="form-select mb-2"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>

          <button
            className="btn btn-primary"
            onClick={editingId ? updateTask : createTask}
          >
            {editingId ? "Update Task" : "Create Task"}
          </button>
        </div>

        <div className="card p-3 mb-4">
          <input
            className="form-control"
            placeholder="🔍 Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="row mb-4">
          <div className="col-md-6">
            <select
              className="form-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="col-md-6">
            <select
              className="form-select"
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="">All Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        {tasks.length === 0 ? (
          <div className="text-center mt-5">
            <h3>📋 No Tasks Yet</h3>
            <p className="text-muted">Create your first task to get started.</p>
          </div>
        ) : (
          tasks
            .filter((task) =>
              task.title.toLowerCase().includes(search.toLowerCase()),
            )
            .map((task) => (
              <div className="card mb-3" key={task.id}>
                <div className="card-body">
                  <h4>{task.title}</h4>

                  <p>{task.description}</p>

                  <div className="d-flex gap-2 mb-3">
                    <span
                      className={`badge ${
                        task.status === "completed"
                          ? "bg-success"
                          : "bg-warning text-dark"
                      }`}
                    >
                      {task.status}
                    </span>

                    <span
                      className={`badge ${
                        task.priority === "high"
                          ? "bg-danger"
                          : task.priority === "medium"
                            ? "bg-warning text-dark"
                            : "bg-primary"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>

                  <button
                    className="btn btn-warning me-2"
                    onClick={() => {
                      setEditingId(task.id);
                      setTitle(task.title);
                      setDescription(task.description || "");
                      setPriority(task.priority);
                      setStatus(task.status);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;
