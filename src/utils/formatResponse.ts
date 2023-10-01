export function excludeFieldsFromUser<User, Key extends keyof User>({
  user,
  keys,
}: {
  user: User
  keys: Key[]
}): Omit<User, Key> {
  for (let key of keys) {
    delete user[key]
  }
  return user
}
