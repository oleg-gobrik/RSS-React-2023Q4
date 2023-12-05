import { NavLink, Outlet } from 'react-router-dom';

export default function Root() {
  return (
    <>
      <div>
        <h1>React Forms Task</h1>
        <nav>
          <NavLink to={`controlledForm`}>Controlled Form</NavLink>
          <NavLink to={`uncontrolledForm`}>Uncontrolled Form</NavLink>
        </nav>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
}
