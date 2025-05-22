import { useAuth } from "../contexts/AuthContext";

const Profile = () => {
  const { user, logout } = useAuth();

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-primary mb-6">
        Perfil
      </h2>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="username-display"
            className="block text-sm font-medium text-gray-500"
          >
            Nome de Usuário
          </label>
          <p id="username-display" className="mt-1 text-gray-900">
            {user?.username}
          </p>
        </div>

        <div>
          <label
            htmlFor="email-display"
            className="block text-sm font-medium text-gray-500"
          >
            Email
          </label>
          <p id="email-display" className="mt-1 text-gray-900">
            {user?.email}
          </p>
        </div>

        <button
          type="button"
          onClick={logout}
          className="btn-primary w-full mt-6"
        >
          Sair
        </button>
      </div>
    </div>
  );
};

export default Profile;
