export const queryKeys = {
  backend: {
    health: () => ["backend", "health"],
  },
  users: {
    all: () => ["users"],
    list: () => [...queryKeys.users.all(), "list"],
  },
};
