export type Permission = {
    id: string;
    name: string;
    description: string;
    resource: string;
    action: 'create' | 'read' | 'update' | 'delete';
};

export type Role = {
    id: string;
    name: string;
    description: string;
    permissions: Permission[];
    createdAt: string;
    updatedAt: string;
};

export type User = {
    id: string;
    name: string;
    email: string;
    roles: Role[];
    status: 'active' | 'inactive';
    createdAt: string;
    updatedAt: string;
};

export type ApiResponse<T> = {
    data: T;
    message: string;
    success: boolean;
};
