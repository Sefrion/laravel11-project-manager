import {
  TASK_PRIORITY_CLASS_MAP,
  TASK_PRIORITY_TEXT_MAP,
  TASK_STATUS_CLASS_MAP,
  TASK_STATUS_TEXT_MAP,
} from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({
  auth,
  totalPendingTasks,
  myPendingTasks,
  totalInProgressTasks,
  myInProgressTasks,
  totalCompletedTasks,
  myCompletedTasks,
  activeTasks,
}) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="grid grid-cols-3 gap-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h3 className="text-2xl font-semibold text-amber-500">
                Pending Tasks
              </h3>
              <p className="text-lg">
                {myPendingTasks} / {totalPendingTasks}
              </p>
            </div>
          </div>
          <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h3 className="text-2xl font-semibold text-blue-500">
                In Progress Tasks
              </h3>
              <p className="text-lg">
                {myInProgressTasks} / {totalInProgressTasks}
              </p>
            </div>
          </div>
          <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h3 className="text-2xl font-semibold text-green-500">
                Completed Tasks
              </h3>
              <p className="text-lg">
                {myCompletedTasks} / {totalCompletedTasks}
              </p>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-4 max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h3 className="mb-4 text-2xl font-semibold">My Active Tasks</h3>
              <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase border-b-2 border-gray-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr className="text-nowrap">
                    <th className="px-3 py-3">ID</th>
                    <th className="px-3 py-3">Project Name</th>
                    <th className="px-3 py-3">Name</th>
                    <th className="px-3 py-3">Status</th>
                    <th className="px-3 py-3">Priority</th>
                    <th className="px-3 py-3">Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {activeTasks.data.map((task) => (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      key={task.id}
                    >
                      <td className="px-3 py-2">{task.id}</td>
                      <td className="px-3 py-2">
                        <Link
                          href={route("project.show", task.project.id)}
                          className="hover:underline"
                        >
                          {task.project.name}
                        </Link>
                      </td>
                      <td className="px-3 py-2">
                        <Link
                          href={route("task.show", task.id)}
                          className="hover:underline"
                        >
                          {task.name}
                        </Link>
                      </td>
                      <td className="px-3 py-2 text-nowrap">
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
