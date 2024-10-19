import { TypeAnimation } from "react-type-animation";

const Heading = () => {
  return (
    <TypeAnimation
      sequence={[
        "Welcome to Employee Management System",
        2000,
        "Manage Employees Efficiently With Our Comprehensive System",
        2000,
      ]}
      wrapper="span"
      speed={15}
      style={{ fontSize: "1em", display: "inline-block" }}
      repeat={Infinity}
    />
  );
};

export default Heading;
