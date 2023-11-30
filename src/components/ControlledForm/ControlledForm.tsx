export default function ControlledForm() {
  const submit = () => {
    alert('Submitted!');
  };
  return (
    <>
      <form onSubmit={submit}>
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

        <fieldset>
          <legend>Gender</legend>
          <label htmlFor="male">
            <input type="radio" id="male" name="gender" value="male" />
            Male
          </label>
          <label htmlFor="female">
            <input type="radio" id="female" name="gender" value="female" />
            Female
          </label>
        </fieldset>

        <div>
          <label htmlFor="image">Picture</label>
          <input type="text" id="image" name="image" />
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input type="text" id="country" name="country" />
        </div>
        <div>
          <label htmlFor="T&C">
            <input type="checkbox" id="T&C" name="T&C" />
            “Agree to Terms and Conditions”
          </label>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
}
