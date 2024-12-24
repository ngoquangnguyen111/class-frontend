import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-white p-4 text-black border border-1 border-black mb-16">
      <div className="container mx-auto flex justify-between">
        <Link href="/">
          <div className="text-xl font-bold">Student Management</div>
        </Link>
        <div className="flex flex-row">
          <Link href="/students">
            <div className="mr-4">Students</div>
          </Link>
          <Link href="/classes">
            <div>Classes</div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;