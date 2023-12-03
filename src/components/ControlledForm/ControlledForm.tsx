import { useNavigate } from 'react-router-dom';
import { AutoComplete } from '../AutoComplete/AutoComplete';

export default function ControlledForm() {
  const navigate = useNavigate();

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    navigate('/');
    alert('Submitted!');
  };
  return (
    <form onSubmit={(event) => submitHandler(event)}>
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" />
      </div>
      <div>
        <label htmlFor="age">Age</label>
        <input type="number" id="age" name="age" />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
      </div>
      <div>
        <label htmlFor="firstPassword">Password</label>
        <input type="password" id="firstPassword" name="Password" />
      </div>
      <div>
        <label htmlFor="secondPassword">Confirm Password</label>
        <input type="password" id="secondPassword" name="Password" />
      </div>

      <label htmlFor="gender">
        Select gender
        <select id="gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </label>

      <div>
        <label htmlFor="image">Picture</label>
        <input type="file" id="image" name="file" />
      </div>
      <div>
        <label htmlFor="country">Country</label>
        <AutoComplete id="country" />
      </div>
      <div>
        <label htmlFor="T&C">
          <input type="checkbox" id="T&C" name="T&C" />
          “Agree to Terms & Conditions”
        </label>
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
