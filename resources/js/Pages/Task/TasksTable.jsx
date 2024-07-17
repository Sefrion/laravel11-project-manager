import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import { Link, router } from "@inertiajs/react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import {
  TASK_PRIORITY_CLASS_MAP,
  TASK_PRIORITY_TEXT_MAP,
  TASK_STATUS_CLASS_MAP,
  TASK_STATUS_TEXT_MAP,
} from "@/constants";

const TasksTable = ({ tasks, queryParams, hideProjectName = false, success }) => {
  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }
    router.get(route("task.index"), queryParams);
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
    router.get(route("task.index"), queryParams);
  };

  const deleteTask = (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }
    router.delete(route("task.destroy", taskId));
  }

  return (
    <>
      {success && (
        <div className="px-4 py-2 mb-3 ml-auto text-white rounded bg-emerald-500">
          {success}
        </div>
      )}
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
              <th className="px-3 py-3">Image</th>
              <th
                onClick={(e) => sortChanged("name")}
                className="px-3 py-3 cursor-pointer"
              >
                Name{" "}
                <ChevronUpDownIcon
                  className={`inline-block w-4 ${
                    queryParams.sort_field === "name" ? "text-white" : ""
                  }`}
                />
              </th>
              {!hideProjectName && (
                <th className="px-3 py-3 cursor-pointer">Project Name</th>
              )}
              <th
                onClick={(e) => sortChanged("status")}
                className="px-3 py-3 cursor-pointer"
              >
                Status{" "}
                <ChevronUpDownIcon
                  className={`inline-block w-4 ${
                    queryParams.sort_field === "status" ? "text-white" : ""
                  }`}
                />
              </th>
              <th
                onClick={(e) => sortChanged("priority")}
                className="px-3 py-3 cursor-pointer"
              >
                Priority{" "}
                <ChevronUpDownIcon
                  className={`inline-block w-4 ${
                    queryParams.sort_field === "created_at" ? "text-white" : ""
                  }`}
                />
              </th>
              <th
                onClick={(e) => sortChanged("due_date")}
                className="px-3 py-3 cursor-pointer"
              >
                Due Date{" "}
                <ChevronUpDownIcon
                  className={`inline-block w-4 ${
                    queryParams.sort_field === "due_date" ? "text-white" : ""
                  }`}
                />
              </th>
              <th className="px-3 py-3">Created By</th>
              <th className="px-3 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <thead className="text-xs text-gray-700 uppercase border-b-2 border-gray-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="text-nowrap">
              <th className="px-3 py-3"></th>
              <th className="px-3 py-3"></th>
              <th className="px-3 py-3">
                <TextInput
                  className="w-full"
                  defaultValue={queryParams.name}
                  placeholder="Task Name"
                  onBlur={(e) => searchFieldChanged("name", e.target.value)}
                  onKeyPress={(e) => onKeyPress("name", e)}
                />
              </th>
              {!hideProjectName && <th className="px-3 py-3"></th>}
              <th className="px-3 py-3">
                <SelectInput
                  className="w-full"
                  defaultValue={queryParams.status}
                  onChange={(e) => searchFieldChanged("status", e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </SelectInput>
              </th>
              <th className="px-3 py-3"></th>
              <th className="px-3 py-3"></th>
              <th className="px-3 py-3"></th>
              <th className="px-3 py-3"></th>
            </tr>
          </thead>

          <tbody>
            {tasks.data.map((task) => (
              <tr
                key={task.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th className="px-3 py-2">{task.id}</th>
                <td className="px-3 py-2">
                  <img
                    src={task.image_path}
                    alt="image"
                    style={{ width: 60 }}
                  />
                </td>
                <td className="px-3 py-2 text-gray-700 text-nowrap hover:underline">
                  <Link href={route('task.show', task.id)}>
                  {task.name}
                  </Link>
                </td>
                {!hideProjectName && (
                  <td className="px-3 py-2">{task.project.name}</td>
                )}
                <td className="px-3 py-2">
                  <span
                    className={
                      "px-2 py-1 rounded text-white " +
                      TASK_STATUS_CLASS_MAP[task.status]
                    }
                  >
                    {TASK_STATUS_TEXT_MAP[task.status]}
                  </span>
                </td>
                <td className="px-3 py-2 text-nowrap">
                  <span
                    className={
                      "px-2 py-1 rounded text-white " +
                      TASK_PRIORITY_CLASS_MAP[task.priority]
                    }
                  >
                    {TASK_PRIORITY_TEXT_MAP[task.priority]}
                  </span>
                </td>
                <td className="px-3 py-2 text-nowrap">{task.due_date}</td>
                <td className="px-3 py-2 text-center">{task.createdBy.name}</td>
                <td className="px-3 py-2">
                  <Link
                    href={route("task.edit", task.id)}
                    className="mx-1 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteTask(task.id)}
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
      <Pagination links={tasks.meta.links} />
    </>
  );
};

export default TasksTable;
