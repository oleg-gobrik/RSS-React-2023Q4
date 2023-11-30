import { NavLink, Outlet } from 'react-router-dom';

// export async function loader() {
//   //const contacts = await getContacts();
//   return {};
// }

export default function Root() {
  return (
    <>
      <div>
        <h1>React Forms Task</h1>
        <nav>
          <NavLink to={`/`}>Main</NavLink>
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
