import { Link } from "react-router-dom";

const Header1 = () => {
  return (
    <header className="_nav px-2 sm:px-0 bg-yellow-50">
      <div className="_header sm:flex h-full">
        <div className="hidden sm:flex max-w-[150px] md:max-w-[178px] w-full cursor-pointer sm:hover:bg-gray-50 items-center justify-center border-r _border-light">
          <Link to={"/"}>
            <span className="font-black text-[32px] md:text-[38px] text-yellow-400 tracking-tight">
              bring<strong className="text-green-600">It</strong>
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header1;
