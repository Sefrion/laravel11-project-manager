import {
  TASK_PRIORITY_CLASS_MAP,
  TASK_PRIORITY_TEXT_MAP,
  TASK_STATUS_CLASS_MAP,
  TASK_STATUS_TEXT_MAP,
} from "@/constants";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

const Show = ({ auth, task }) => {
  return (
    <Authenticated
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          {`Task "${task.data.name}"`}
        </h2>
      }
    >
      <Head title={`Task "${task.data.name}"`} />
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
            <div>
              <img
                src={task.data.image_path}
                alt="image"
                className="object-cover w-full h-64"
              />
            </div>
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="grid grid-cols-2 gap-1 mt-2">
                {/* Left Side */}
                <div>
                  <div>
                    <label className="text-lg font-bold">Task ID</label>
                    <p className="mt-1">{task.data.id}</p>
                  </div>
                  <div className="mt-4">
                    <label className="text-lg font-bold">Task Name</label>
                    <p className="mt-1">{task.data.name}</p>
                  </div>
                  <div className="mt-4">
                    <label className="text-lg font-bold">Task Status</label>
                    <p className="mt-1">
                      <span
                        className={
                          "px-2 py-1 rounded text-white " +
                          TASK_STATUS_CLASS_MAP[task.data.status]
                        }
                      >
                        {TASK_STATUS_TEXT_MAP[task.data.status]}
                      </span>
                    </p>
                  </div>
                  <div className="mt-4">
                    <label className="text-lg font-bold">Created By</label>
                    <p className="mt-1">{task.data.createdBy.name}</p>
                  </div>
                  <div className="mt-4">
                    <label className="text-lg font-bold">Project</label>
                    <p className="mt-1">
                      <Link
                        className="cursor-pointer hover:underline"
                        href={route("project.show", task.data.project.id)}
                      >
                        {task.data.project.name}
                      </Link>
                    </p>
                  </div>
                </div>
                {/* Right Side */}
                <div>
                  <div>
                    <label className="text-lg font-bold">Due Date</label>
                    <p className="mt-1">{task.data.due_date}</p>
                  </div>
                  <div className="mt-4">
                    <label className="text-lg font-bold">Create Date</label>
                    <p className="mt-1">{task.data.created_at}</p>
                  </div>
                  <div className="mt-4">
                    <label className="text-lg font-bold">Task Priority</label>
                    <p className="mt-1">
                      <span
                        className={
                          "px-2 py-1 rounded text-white " +
                          TASK_PRIORITY_CLASS_MAP[task.data.priority]
                        }
                      >
                        {TASK_PRIORITY_TEXT_MAP[task.data.priority]}
                      </span>
                    </p>
                  </div>
                  <div className="mt-4">
                    <label className="text-lg font-bold">Assigned To</label>
                    <p className="mt-1">{task.data.assignedUser.name}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <label className="text-lg font-bold">Task Description</label>
                <p className="mt-1">{task.data.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Authenticated>
  );
};

export default Show;
