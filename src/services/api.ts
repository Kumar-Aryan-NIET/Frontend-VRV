import { User, Role, Permission, ApiResponse } from '../types';

// Mock data
const permissions: Permission[] = [
    {
        id: '1',
        name: 'Read Users',
        description: 'Can view user list and details',
        resource: 'users',
        action: 'read',
    },
    {
        id: '2',
        name: 'Create Users',
        description: 'Can create new users',
        resource: 'users',
        action: 'create',
    },
    {
        id: '3',
        name: 'Update Users',
        description: 'Can modify user details',
        resource: 'users',
        action: 'update',
    },
    {
        id: '4',
        name: 'Delete Users',
        description: 'Can remove users from the system',
        resource: 'users',
        action: 'delete',
    },
];

const roles: Role[] = [
    {
        id: '1',
        name: 'Admin',
        description: 'Full system access',
        permissions: permissions,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: '2',
        name: 'User Manager',
        description: 'Can manage users',
        permissions: permissions.filter(p => p.resource === 'users'),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

const users: User[] = [
    {
        id: '1',
        name: 'John Admin',
        email: 'john@example.com',
        roles: [roles[0]],
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: '2',
        name: 'Jane Manager',
        email: 'jane@example.com',
        roles: [roles[1]],
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API functions
export const api = {
    // Users
    async getUsers(): Promise<ApiResponse<User[]>> {
        await delay(500);
        return {
            data: users,
            message: 'Users retrieved successfully',
            success: true,
        };
    },

    async createUser(userData: Partial<User>): Promise<ApiResponse<User>> {
        await delay(500);
        const newUser: User = {
            id: (users.length + 1).toString(),
            name: userData.name || '',
            email: userData.email || '',
            roles: userData.roles || [],
            status: userData.status || 'active',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        users.push(newUser);
        return {
            data: newUser,
            message: 'User created successfully',
            success: true,
        };
    },

    async updateUser(id: string, userData: Partial<User>): Promise<ApiResponse<User>> {
        await delay(500);
        const userIndex = users.findIndex(u => u.id === id);
        if (userIndex === -1) {
            throw new Error('User not found');
        }
        users[userIndex] = {
            ...users[userIndex],
            ...userData,
            updatedAt: new Date().toISOString(),
        };
        return {
            data: users[userIndex],
            message: 'User updated successfully',
            success: true,
        };
    },

    // Roles
    async getRoles(): Promise<ApiResponse<Role[]>> {
        await delay(500);
        return {
            data: roles,
            message: 'Roles retrieved successfully',
            success: true,
        };
    },

    async createRole(roleData: Partial<Role>): Promise<ApiResponse<Role>> {
        await delay(500);
        const newRole: Role = {
            id: (roles.length + 1).toString(),
            name: roleData.name || '',
            description: roleData.description || '',
            permissions: roleData.permissions || [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        roles.push(newRole);
        return {
            data: newRole,
            message: 'Role created successfully',
            success: true,
        };
    },

    // Permissions
    async getPermissions(): Promise<ApiResponse<Permission[]>> {
        await delay(500);
        return {
            data: permissions,
            message: 'Permissions retrieved successfully',
            success: true,
        };
    },
};
