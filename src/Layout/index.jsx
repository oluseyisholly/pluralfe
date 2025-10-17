import PluralSvg from "../assets/Plural.Svg";
import BellSvg from "../assets/bell.Svg";
import UserSvg from "../assets/user.Svg";

export default function Layout({ children }) {
  const data = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
    {
      id: 3,
      name: "Michael Lee",
      email: "michael@example.com",
      role: "Manager",
    },
  ];

  return (
    <div className="w-full bg-[#DFE2E9] bg-gray-50 w-screen h-screen px-[32px]">
      {/* Header */}
      <header className=" flex justify-between py-6">
        <div>
          <img src={PluralSvg} />
        </div>
        <div className="flex items-center gap-[16px]">
          <span className="font-bold text-[18px] leading-[22px] tracking-[0]">
            {" "}
            22 Semptember
          </span>
          <span>09:34 AM</span>
        </div>
        <div className="flex items-center gap-[32px]">
          <span className="font-bold text-[18px] leading-[22px] tracking-[0]">
            Hi Mr Daniel
          </span>
          <img src={BellSvg} />
          <img src={UserSvg} />
        </div>
      </header>
      {children}
    </div>
  );
}
