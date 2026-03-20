export function hasPermission(user, permission){
    return permission.includes(user.role)
}