import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

const Edit = ({ auth, user }) => {
  const { data, setData, post, errors } = useForm({
    name: user.data.name || "",
    email: user.data.email || "",
    password: "",
    password_confirmation: "",
    _method: "PUT",
  });

  const onSubmit = (e) => {
    e.preventDefault();

    post(route("user.update", user.data.id));
  };

  return (
    <Authenticated
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Edit User "{user.data.name}"
        </h2>
      }
    >
      <Head title="Edit User" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
            <form
              onSubmit={onSubmit}
              className="p-4 bg-white shadow sm:p-8 dark:bg-gray-800 sm:rounded-lg"
            >
              <div className="mt-4">
                <InputLabel htmlFor="user_name" value="User Name" />
                <TextInput
                  id="user_name"
                  type="text"
                  name="name"
                  value={data.name}
                  className="block w-full mt-1"
                  isFocused={true}
                  onChange={(e) => setData("name", e.target.value)}
                />
                <InputError message={errors.name} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="user_email" value="User Email" />
                <TextInput
                  id="user_email"
                  type="email"
                  name="email"
                  value={data.email}
                  className="block w-full mt-1"
                  onChange={(e) => setData("email", e.target.value)}
                />
                <InputError message={errors.email} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="user_password" value="User Password" />
                <TextInput
                  id="user_password"
                  type="password"
                  name="password"
                  value={data.password}
                  className="block w-full mt-1"
                  onChange={(e) => setData("password", e.target.value)}
                />
                <InputError message={errors.password} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="user_password_confirmation"
                  value="Confirm Password"
                />
                <TextInput
                  id="user_password_confirmation"
                  type="password"
                  name="password_confirmation"
                  value={data.password_confirmation}
                  className="block w-full mt-1"
                  onChange={(e) =>
                    setData("password_confirmation", e.target.value)
                  }
                />
                <InputError
                  message={errors.password_confirmation}
                  className="mt-2"
                />
              </div>
              <div className="mt-4 text-right ">
                <button className="px-3 py-1 mr-2 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600">
                  Submit
                </button>
                <Link
                  href={route("user.index")}
                  className="inline-block px-3 py-1 text-gray-800 transition-all bg-gray-100 rounded shadow hover:bg-gray-200"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Authenticated>
  );
};

export default Edit;
