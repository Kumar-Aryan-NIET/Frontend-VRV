import React, { useState, useEffect, Fragment } from "react";
import { Role, Permission } from "../types";
import { api } from "../services/api";
import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";

const Roles = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [newRole, setNewRole] = useState({
    name: "",
    description: "",
    permissions: [] as Permission[],
  });

  useEffect(() => {
    fetchRoles();
    fetchPermissions();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await api.getRoles();
      setRoles(response.data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const fetchPermissions = async () => {
    try {
      const response = await api.getPermissions();
      setPermissions(response.data);
    } catch (error) {
      console.error("Error fetching permissions:", error);
    }
  };

  const handleCreateRole = async () => {
    try {
      await api.createRole(newRole);
      setIsOpen(false);
      setNewRole({
        name: "",
        description: "",
        permissions: [],
      });
      fetchRoles();
    } catch (error) {
      console.error("Error creating role:", error);
    }
  };

  const groupPermissionsByResource = (perms: Permission[]) => {
    return perms.reduce((acc, curr) => {
      const resource = curr.resource;
      if (!acc[resource]) {
        acc[resource] = [];
      }
      acc[resource].push(curr);
      return acc;
    }, {} as Record<string, Permission[]>);
  };

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Roles</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage roles and their associated permissions in the system.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="btn btn-primary inline-flex items-center"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Add Role
          </button>
        </div>
      </div>

      {/* Roles List */}
      <div className="mt-8 space-y-8">
        {roles.map((role) => (
          <div key={role.id} className="card">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {role.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{role.description}</p>
              </div>
              <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-0.5 text-sm font-medium text-blue-800">
                {role.permissions.length} permissions
              </span>
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-900">Permissions</h4>
              <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Object.entries(
                  groupPermissionsByResource(role.permissions)
                ).map(([resource, perms]) => (
                  <div key={resource} className="relative flex items-start">
                    <div className="min-w-0 flex-1 text-sm">
                      <p className="font-medium text-gray-700">{resource}</p>
                      <ul className="mt-1 space-y-1">
                        {perms.map((permission) => (
                          <li key={permission.id} className="text-gray-500">
                            {permission.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Role Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Create New Role
                  </Dialog.Title>
                  <div className="mt-4">
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="input mt-1"
                          value={newRole.name}
                          onChange={(e) =>
                            setNewRole({ ...newRole, name: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="description"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Description
                        </label>
                        <textarea
                          id="description"
                          rows={3}
                          className="input mt-1"
                          value={newRole.description}
                          onChange={(e) =>
                            setNewRole({
                              ...newRole,
                              description: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Permissions
                        </label>
                        <div className="mt-2 space-y-4">
                          {Object.entries(
                            groupPermissionsByResource(permissions)
                          ).map(([resource, perms]) => (
                            <div key={resource} className="space-y-2">
                              <h4 className="text-sm font-medium text-gray-700">
                                {resource}
                              </h4>
                              {perms.map((permission) => (
                                <div
                                  key={permission.id}
                                  className="relative flex items-start"
                                >
                                  <div className="flex h-5 items-center">
                                    <input
                                      type="checkbox"
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                      checked={newRole.permissions.some(
                                        (p) => p.id === permission.id
                                      )}
                                      onChange={(e) => {
                                        if (e.target.checked) {
                                          setNewRole({
                                            ...newRole,
                                            permissions: [
                                              ...newRole.permissions,
                                              permission,
                                            ],
                                          });
                                        } else {
                                          setNewRole({
                                            ...newRole,
                                            permissions:
                                              newRole.permissions.filter(
                                                (p) => p.id !== permission.id
                                              ),
                                          });
                                        }
                                      }}
                                    />
                                  </div>
                                  <div className="ml-3 text-sm">
                                    <label className="font-medium text-gray-700">
                                      {permission.name}
                                    </label>
                                    <p className="text-gray-500">
                                      {permission.description}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setIsOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleCreateRole}
                    >
                      Create
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Roles;
