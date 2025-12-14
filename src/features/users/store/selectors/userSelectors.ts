import { createSelector } from "@reduxjs/toolkit";

const selectUserSession = createSelector(
  (state) => state.user,
  (user) => user.session
);

const selectUserUUID = createSelector(
  (state) => state.user,
  (user) => user.id
);

const selectUserDisplayName = createSelector(
  (state) => state.user,
  (user) => user.user_metadata.displayName
);

export { selectUserSession, selectUserUUID, selectUserDisplayName };