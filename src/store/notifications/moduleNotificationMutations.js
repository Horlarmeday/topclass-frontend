/*=========================================================================================
  File Name: moduleNotificationMutations.js
  Description: Notification Module Mutations
==========================================================================================*/


export default {
    SET_NOTIFICATIONS (state, notifications) {
      state.notifications = notifications
    },

    SET_NOTIFICATIONS_TOTAL (state, total) {
      state.total = total
    },

    SET_NEW_TOTAL (state, total) {
      state.total -= total
    },

    SET_NUMB_PAGES (state, pages) {
      state.pages = pages
    },

    SET_NOTIFICATION (state, notification) {
      state.notification = notification
    },

    UPDATE_NOTIFICATION (state, notification) {
      const notificationIndex = state.notifications.findIndex((p) => p.nid === notification.nid)
      Object.assign(state.notifications[notificationIndex], notification)
    }
}
  