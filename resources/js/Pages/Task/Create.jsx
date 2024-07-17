import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import TextAreaInput from "@/Components/TextAreaInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import SelectInput from "@/Components/SelectInput";

const Create = ({ auth, projects, users }) => {
  const { data, setData, post, errors } = useForm({
    image: "",
    name: "",
    status: "",
    description: "",
    priority: "",
    assigned_user_id: "",
    project_id: "",
    due_date: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();

    post(route("task.store"));
  };

  return (
    <Authenticated
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Create New Task
        </h2>
      }
    >
      <Head title="Create Task" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
            <form
              onSubmit={onSubmit}
              className="p-4 bg-white shadow sm:p-8 dark:bg-gray-800 sm:rounded-lg"
            >
              <div>
                <InputLabel htmlFor="task_image_path" value="Task Image" />
                <TextInput
                  id="task_image_path"
                  type="file"
                  name="image"
                  className="block w-full mt-1"
                  onChange={(e) => setData("image", e.target.files[0])}
                />
                <InputError message={errors.image} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="task_name" value="Task Name" />
                <TextInput
                  id="task_name"
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
                <InputLabel
                  htmlFor="task_description"
                  value="Task Description"
                />
                <TextAreaInput
                  id="task_description"
                  name="description"
                  value={data.description}
                  className="block w-full mt-1"
                  onChange={(e) => setData("description", e.target.value)}
                />
                <InputError message={errors.description} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="task_status" value="Task Status" />
                <SelectInput
                  name="status"
                  id="task_status"
                  className="block w-full mt-1"
                  onChange={(e) => setData("status", e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </SelectInput>
                <InputError message={errors.status} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="task_priority" value="Task Priority" />
                <SelectInput
                  name="priority"
                  id="task_priority"
                  className="block w-full mt-1"
                  onChange={(e) => setData("priority", e.target.value)}
                >
                  <option value="">Select Priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </SelectInput>
                <InputError message={errors.priority} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="task_assigned_user" value="Assigned User" />
                <SelectInput
                  name="assigned_user_id"
                  id="task_assigned_user"
                  className="block w-full mt-1"
                  onChange={(e) => setData("assigned_user_id", e.target.value)}
                >
                  <option value="">Select User</option>
                  {users.data.map((user) => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                  ))}
                </SelectInput>
                <InputError message={errors.assigned_user_id} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="task_project_id" value="Task Project" />
                <SelectInput
                  name="project_id"
                  id="task_project_id"
                  className="block w-full mt-1"
                  onChange={(e) => setData("project_id", e.target.value)}
                >
                  <option value="">Select Project</option>
                  {projects.data.map(project => (
                    <option key={project.id} value={project.id}>{project.name}</option>
                  ))}
                </SelectInput>
                <InputError message={errors.project_id} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="task_due_date" value="Task Deadline" />
                <TextInput
                  id="task_due_date"
                  type="date"
                  name="due_date"
                  value={data.due_date}
                  className="block w-full mt-1"
                  onChange={(e) => setData("due_date", e.target.value)}
                />
                <InputError message={errors.due_date} className="mt-2" />
              </div>
              <div className="mt-4 text-right ">
                <button className="px-3 py-1 mr-2 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600">
                  Submit
                </button>
                <Link
                  href={route("task.index")}
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

export default Create;
