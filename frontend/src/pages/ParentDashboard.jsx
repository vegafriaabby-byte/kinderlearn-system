import { useNavigate } from "react-router-dom";

function ParentDashboard() {

  const navigate = useNavigate();

  return (

    <div>

      <h1>
        Parent Dashboard
      </h1>

      <p>
        Welcome, Parent!
      </p>

      <h2>
        Child: Maria Santos
      </h2>

      <button
        onClick={() =>
          navigate("/activities")
        }
      >
        Activities
      </button>

      <button>
        Learning Materials
      </button>

      <button>
        Attendance
      </button>

      <button>
        Progress
      </button>

    </div>

  );

}

export default ParentDashboard;