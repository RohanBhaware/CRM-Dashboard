export default function Navbar() {
  return (
    <div className="bg-white shadow p-4 flex justify-between">
      <h2 className="font-bold text-xl">
        CRM Dashboard
      </h2>

      <button
        className="bg-red-500 text-white px-4 py-2 rounded"
        onClick={() => {
          localStorage.clear();
          window.location = "/";
        }}
      >
        Logout
      </button>
    </div>
  );
}