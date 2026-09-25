import { useNavigate } from "react-router-dom";

function TeacherDashboard() {

  const navigate = useNavigate();

  return (

    <div>

      <h1>
        Teacher Dashboard
      </h1>

      <p>
        Welcome, Teacher!
      </p>

      <button>
        My Classes
      </button>

      <button>
        Attendance
      </button>

      <button>
        Reports
      </button>

      <button
        onClick={() =>
          navigate("/activities")
        }
      >
        Activities
      </button>

    </div>

  );

}

export default TeacherDashboard;