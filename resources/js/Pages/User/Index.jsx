import Authenticated from "@/Layouts/AuthenticatedLayout";
import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { Head, Link, router } from "@inertiajs/react";

export default function Index({ auth, users, queryParams = null, success }) {
  queryParams = queryParams || {};

  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }
    router.get(route("user.index"), queryParams);
  };

  const onKeyPress = (name, e) => {
    if (e.key !== "Enter") return;
    searchFieldChanged(name, e.target.value);
  };
  const sortChanged = (name) => {
    if (name === queryParams.sort_field) {
      if (queryParams.sort_direction === "asc") {
        queryParams.sort_direction = "desc";
      } else {
        queryParams.sort_direction = "asc";
      }
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = "asc";
    }
    router.get(route("user.index"), queryParams);
  };

  const deleteUser = (user) => {
    if (!window.confirm("Are you sure you want to delete the user?")) {
      return;
    }
    router.delete(route("user.destroy", user.id));
  };

  return (
    <Authenticated
      user={auth.user}
      header={
        <div className="flex items-center justify-between ">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Users
          </h2>
          <Link
            href={route("user.create")}
            className="px-3 py-1 text-white transition-all rounded shadow cursor-pointer bg-emerald-500 hover:bg-emerald-600 "
          >
            Add new
          </Link>
        </div>
      }
    >
      <Head title="Users" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          {success && (
            <div className="px-4 py-2 mb-3 ml-auto text-white rounded bg-emerald-500">
              {success}
            </div>
          )}
          <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="overflow-auto">
                <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase border-b-2 border-gray-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className="text-nowrap">
                      <th
                        onClick={(e) => sortChanged("id")}
                        className="px-3 py-3 cursor-pointer"
                      >
                        ID{" "}
                        <ChevronUpDownIcon
                          className={`inline-block w-4 ${
                            queryParams.sort_field === "id" ? "text-white" : ""
                          }`}
                        />
                      </th>
                      <th
                        onClick={(e) => sortChanged("name")}
                        className="px-3 py-3 cursor-pointer"
                      >
                        Name{" "}
                        <ChevronUpDownIcon
                          className={`inline-block w-4 ${
                            queryParams.sort_field === "name"
                              ? "text-white"
                              : ""
                          }`}
                        />
                      </th>
                      <th
                        onClick={(e) => sortChanged("email")}
                        className="px-3 py-3 cursor-pointer"
                      >
                        Email{" "}
                        <ChevronUpDownIcon
                          className={`inline-block w-4 ${
                            queryParams.sort_field === "status"
                              ? "text-white"
                              : ""
                          }`}
                        />
                      </th>
                      <th
                        onClick={(e) => sortChanged("created_at")}
                        className="px-3 py-3 cursor-pointer"
                      >
                        Create Date{" "}
                        <ChevronUpDownIcon
                          className={`inline-block w-4 ${
                            queryParams.sort_field === "created_at"
                              ? "text-white"
                              : ""
                          }`}
                        />
                      </th>
                      <th className="px-3 py-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <thead className="text-xs text-gray-700 uppercase border-b-2 border-gray-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className="text-nowrap">
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3">
                        <TextInput
                          className="w-full"
                          defaultValue={queryParams.name}
                          placeholder="User Name"
                          onBlur={(e) =>
                            searchFieldChanged("name", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("name", e)}
                        />
                      </th>
                      <th className="px-3 py-3">
                        <TextInput
                          className="w-full"
                          defaultValue={queryParams.name}
                          placeholder="User Email"
                          onBlur={(e) =>
                            searchFieldChanged("email", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("email", e)}
                        />
                      </th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                    </tr>
                  </thead>

                  <tbody>
                    {users.data.map((user) => (
                      <tr
                        key={user.id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <th className="px-3 py-2">{user.id}</th>
                        <th className="px-3 py-2 text-gray-300">{user.name}</th>
                        <td className="px-3 py-2">{user.email}</td>
                        <td className="px-3 py-2 text-nowrap">
                          {user.created_at}
                        </td>
                        <td className="px-3 py-2 text-right">
                          <Link
                            href={route("user.edit", user.id)}
                            className="mx-1 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => deleteUser(user)}
                            className="mx-1 font-medium text-red-600 dark:text-red-500 hover:underline"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination links={users.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </Authenticated>
  );
}
