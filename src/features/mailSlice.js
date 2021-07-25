import { createSlice } from "@reduxjs/toolkit";
export const mailSlice = createSlice({
  name: "mail",
  initialState: {
    sendNewMail: false,
    minimized: true,
    selectedMail: null,
    showSidebar: true,
    checkedAllMails: false,
    searchMail: "",
  },
  reducers: {
    selectMail: (state, action) => {
      state.selectedMail = action.payload;
    },
    openSendNewMail: (state) => {
      state.sendNewMail = true;
    },
    closeSendNewMail: (state) => {
      state.sendNewMail = false;
    },
    minimizedWindow: (state) => {
      state.minimized = !state.minimized;
    },
    handleShowSidebar: (state) => {
      state.showSidebar = !state.showSidebar;
    },
    handleCheckedAllMails: (state) => {
      state.checkedAllMails = !state.checkedAllMails;
    },
    handleFilterData: (state, action) => {
      state.searchMail = action.payload;
    }
  },
});
export const {
  openSendNewMail,
  closeSendNewMail,
  selectMail,
  minimizedWindow,
  handleShowSidebar,
  handleCheckedAllMails,
  handleFilterData,
} = mailSlice.actions;
export const selectSendNewMail = (state) => state.mail.sendNewMail;
export const minimized = (state) => state.mail.minimized;
export const selectedMail = (state) => state.mail.selectedMail;
export const selectShowSidebar = (state) => state.mail.showSidebar;
export const selectCheckedAllMails = (state) => state.mail.checkedAllMails;
export const selectSearchMail = (state) => state.mail.searchMail;
export default mailSlice.reducer;
